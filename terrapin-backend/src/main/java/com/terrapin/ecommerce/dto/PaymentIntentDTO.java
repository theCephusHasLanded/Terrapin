package com.terrapin.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentIntentDTO {
    
    private String id;
    private String clientSecret;
    private Long amount;
    private String currency;
    private String status;
    private String paymentMethod;
}