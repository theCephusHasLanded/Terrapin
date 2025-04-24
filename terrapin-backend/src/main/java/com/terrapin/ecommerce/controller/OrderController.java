package com.terrapin.ecommerce.controller;

import com.terrapin.ecommerce.dto.CheckoutRequestDTO;
import com.terrapin.ecommerce.dto.OrderDTO;
import com.terrapin.ecommerce.dto.PagedResponseDTO;
import com.terrapin.ecommerce.model.OrderStatus;
import com.terrapin.ecommerce.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<PagedResponseDTO<OrderDTO>> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort.Direction direction = Sort.Direction.fromString(sortDir);
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        
        PagedResponseDTO<OrderDTO> response = orderService.getAllOrders(pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
        OrderDTO order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/customer/{email}")
    public ResponseEntity<PagedResponseDTO<OrderDTO>> getOrdersByCustomerEmail(
            @PathVariable String email,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        PagedResponseDTO<OrderDTO> response = orderService.getOrdersByCustomerEmail(email, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<PagedResponseDTO<OrderDTO>> getOrdersByStatus(
            @PathVariable OrderStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        PagedResponseDTO<OrderDTO> response = orderService.getOrdersByStatus(status, pageable);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/checkout")
    public ResponseEntity<OrderDTO> checkout(@Valid @RequestBody CheckoutRequestDTO checkoutRequest) {
        OrderDTO createdOrder = orderService.createOrder(checkoutRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdOrder);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<OrderDTO> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status) {
        
        OrderDTO updatedOrder = orderService.updateOrderStatus(id, status);
        return ResponseEntity.ok(updatedOrder);
    }

    @PostMapping("/payment/{paymentIntentId}")
    public ResponseEntity<OrderDTO> processPayment(
            @PathVariable String paymentIntentId,
            @RequestParam boolean success) {
        
        OrderDTO processedOrder = orderService.processPayment(paymentIntentId, success);
        return ResponseEntity.ok(processedOrder);
    }
}