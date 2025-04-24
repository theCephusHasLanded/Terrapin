package com.terrapin.ecommerce.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CheckoutRequestDTO {
    
    @NotEmpty(message = "Cart items are required")
    private List<CartItemDTO> items;
    
    @NotBlank(message = "Customer email is required")
    @Email(message = "Invalid email format")
    private String customerEmail;
    
    @NotBlank(message = "Customer name is required")
    private String customerName;
    
    @NotBlank(message = "Shipping address is required")
    private String shippingAddress;
    
    private BigDecimal subtotal;
    private BigDecimal shipping;
    private BigDecimal tax;
    private BigDecimal total;
}