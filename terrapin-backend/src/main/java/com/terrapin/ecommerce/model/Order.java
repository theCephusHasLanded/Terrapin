package com.terrapin.ecommerce.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(precision = 10, scale = 2)
    private BigDecimal total;

    @NotNull
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @NotBlank
    @Email
    @Column(name = "customer_email")
    private String customerEmail;

    @NotBlank
    @Column(name = "customer_name")
    private String customerName;

    @NotBlank
    @Column(name = "shipping_address", columnDefinition = "TEXT")
    private String shippingAddress;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> items = new ArrayList<>();

    @Column(name = "stripe_payment_intent_id")
    private String stripePaymentIntentId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Helper method to add items to order
    public void addItem(CartItem item) {
        items.add(item);
        item.setOrder(this);
    }

    // Helper method to remove items from order
    public void removeItem(CartItem item) {
        items.remove(item);
        item.setOrder(null);
    }
}