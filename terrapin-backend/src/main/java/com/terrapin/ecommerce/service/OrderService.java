package com.terrapin.ecommerce.service;

import com.terrapin.ecommerce.dto.CartItemDTO;
import com.terrapin.ecommerce.dto.CheckoutRequestDTO;
import com.terrapin.ecommerce.dto.OrderDTO;
import com.terrapin.ecommerce.dto.PagedResponseDTO;
import com.terrapin.ecommerce.exception.InvalidOrderException;
import com.terrapin.ecommerce.exception.ResourceNotFoundException;
import com.terrapin.ecommerce.model.CartItem;
import com.terrapin.ecommerce.model.Order;
import com.terrapin.ecommerce.model.OrderStatus;
import com.terrapin.ecommerce.model.Product;
import com.terrapin.ecommerce.repository.CartItemRepository;
import com.terrapin.ecommerce.repository.OrderRepository;
import com.terrapin.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;
    private final StripeService stripeService;

    @Transactional(readOnly = true)
    public PagedResponseDTO<OrderDTO> getAllOrders(Pageable pageable) {
        Page<Order> orderPage = orderRepository.findAll(pageable);
        Page<OrderDTO> dtoPage = orderPage.map(order -> modelMapper.map(order, OrderDTO.class));
        return PagedResponseDTO.from(dtoPage);
    }

    @Transactional(readOnly = true)
    public OrderDTO getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        return modelMapper.map(order, OrderDTO.class);
    }

    @Transactional(readOnly = true)
    public PagedResponseDTO<OrderDTO> getOrdersByCustomerEmail(String email, Pageable pageable) {
        Page<Order> orderPage = orderRepository.findByCustomerEmail(email, pageable);
        Page<OrderDTO> dtoPage = orderPage.map(order -> modelMapper.map(order, OrderDTO.class));
        return PagedResponseDTO.from(dtoPage);
    }

    @Transactional(readOnly = true)
    public PagedResponseDTO<OrderDTO> getOrdersByStatus(OrderStatus status, Pageable pageable) {
        Page<Order> orderPage = orderRepository.findByStatus(status, pageable);
        Page<OrderDTO> dtoPage = orderPage.map(order -> modelMapper.map(order, OrderDTO.class));
        return PagedResponseDTO.from(dtoPage);
    }

    @Transactional
    public OrderDTO createOrder(CheckoutRequestDTO checkoutRequest) {
        validateCheckoutRequest(checkoutRequest);
        
        // Calculate order total
        BigDecimal calculatedTotal = calculateOrderTotal(checkoutRequest);
        
        // Check if calculated total matches the provided total
        if (calculatedTotal.compareTo(checkoutRequest.getTotal()) != 0) {
            throw new InvalidOrderException("Calculated total does not match the provided total");
        }
        
        // Create order entity
        Order order = Order.builder()
                .customerEmail(checkoutRequest.getCustomerEmail())
                .customerName(checkoutRequest.getCustomerName())
                .shippingAddress(checkoutRequest.getShippingAddress())
                .total(calculatedTotal)
                .status(OrderStatus.PENDING)
                .items(new ArrayList<>())
                .build();
        
        // Save order first to get the ID
        Order savedOrder = orderRepository.save(order);
        
        // Process cart items
        List<CartItem> cartItems = processCartItems(checkoutRequest.getItems(), savedOrder);
        savedOrder.setItems(cartItems);
        
        // Create payment intent
        String paymentIntentId = stripeService.createPaymentIntent(calculatedTotal, "usd", savedOrder.getId().toString());
        savedOrder.setStripePaymentIntentId(paymentIntentId);
        
        // Update order with payment intent
        Order finalOrder = orderRepository.save(savedOrder);
        
        return modelMapper.map(finalOrder, OrderDTO.class);
    }

    @Transactional
    public OrderDTO updateOrderStatus(Long id, OrderStatus status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        
        order.setStatus(status);
        Order updatedOrder = orderRepository.save(order);
        return modelMapper.map(updatedOrder, OrderDTO.class);
    }

    @Transactional
    public OrderDTO processPayment(String paymentIntentId, boolean success) {
        Order order = orderRepository.findByStripePaymentIntentId(paymentIntentId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with payment intent: " + paymentIntentId));
        
        if (success) {
            order.setStatus(OrderStatus.PROCESSING);
            
            // Update product inventory
            for (CartItem item : order.getItems()) {
                Product product = item.getProduct();
                int newInventory = product.getInventory() - item.getQuantity();
                if (newInventory < 0) {
                    throw new InvalidOrderException("Not enough inventory for product: " + product.getName());
                }
                product.setInventory(newInventory);
                productRepository.save(product);
            }
        } else {
            order.setStatus(OrderStatus.CANCELLED);
        }
        
        Order updatedOrder = orderRepository.save(order);
        return modelMapper.map(updatedOrder, OrderDTO.class);
    }

    private void validateCheckoutRequest(CheckoutRequestDTO request) {
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new InvalidOrderException("Order must contain at least one item");
        }
        
        // Validate items
        for (CartItemDTO item : request.getItems()) {
            if (item.getProductId() == null) {
                throw new InvalidOrderException("Product ID is required for cart item");
            }
            
            if (item.getQuantity() == null || item.getQuantity() <= 0) {
                throw new InvalidOrderException("Quantity must be greater than zero");
            }
            
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + item.getProductId()));
            
            if (product.getInventory() < item.getQuantity()) {
                throw new InvalidOrderException("Not enough inventory for product: " + product.getName());
            }
        }
    }

    private BigDecimal calculateOrderTotal(CheckoutRequestDTO request) {
        BigDecimal subtotal = BigDecimal.ZERO;
        
        for (CartItemDTO item : request.getItems()) {
            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + item.getProductId()));
            
            BigDecimal itemTotal = product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
            subtotal = subtotal.add(itemTotal);
        }
        
        BigDecimal tax = request.getTax() != null ? request.getTax() : BigDecimal.ZERO;
        BigDecimal shipping = request.getShipping() != null ? request.getShipping() : BigDecimal.ZERO;
        
        return subtotal.add(tax).add(shipping);
    }

    private List<CartItem> processCartItems(List<CartItemDTO> cartItemDTOs, Order order) {
        return cartItemDTOs.stream()
                .map(itemDTO -> {
                    Product product = productRepository.findById(itemDTO.getProductId())
                            .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + itemDTO.getProductId()));
                    
                    CartItem cartItem = CartItem.builder()
                            .product(product)
                            .quantity(itemDTO.getQuantity())
                            .order(order)
                            .build();
                    
                    return cartItemRepository.save(cartItem);
                })
                .collect(Collectors.toList());
    }
}