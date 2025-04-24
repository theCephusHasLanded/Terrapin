package com.terrapin.ecommerce.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    
    private Long id;
    
    @NotBlank(message = "Product name is required")
    private String name;
    
    @NotBlank(message = "Product description is required")
    private String description;
    
    @NotNull(message = "Product price is required")
    @Positive(message = "Price must be greater than zero")
    private BigDecimal price;
    
    private String image;
    
    @NotBlank(message = "Product category is required")
    private String category;
    
    @NotNull(message = "Product inventory is required")
    @PositiveOrZero(message = "Inventory must be zero or greater")
    private Integer inventory;
}