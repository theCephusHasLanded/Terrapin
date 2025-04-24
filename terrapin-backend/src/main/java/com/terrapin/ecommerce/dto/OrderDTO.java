package com.terrapin.ecommerce.dto;

import com.terrapin.ecommerce.model.OrderStatus;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    
    private Long id;
    
    private BigDecimal total;
    
    private OrderStatus status;
    
    @NotBlank(message = "Customer email is required")
    @Email(message = "Invalid email format")
    private String customerEmail;
    
    @NotBlank(message = "Customer name is required")
    private String customerName;
    
    @NotBlank(message = "Shipping address is required")
    private String shippingAddress;
    
    private List<CartItemDTO> items;
    
    private String stripePaymentIntentId;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
}