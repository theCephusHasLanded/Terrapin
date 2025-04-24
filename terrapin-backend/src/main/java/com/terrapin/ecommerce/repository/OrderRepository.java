package com.terrapin.ecommerce.repository;

import com.terrapin.ecommerce.model.Order;
import com.terrapin.ecommerce.model.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    // Find orders by customer email
    Page<Order> findByCustomerEmail(String email, Pageable pageable);
    
    // Find orders by status
    Page<Order> findByStatus(OrderStatus status, Pageable pageable);
    
    // Find orders created between the given dates
    Page<Order> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
    
    // Find order by Stripe payment intent ID
    Optional<Order> findByStripePaymentIntentId(String paymentIntentId);
    
    // Find recent orders
    List<Order> findTop10ByOrderByCreatedAtDesc();
}