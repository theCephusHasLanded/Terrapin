package com.terrapin.ecommerce.controller;

import com.stripe.model.PaymentIntent;
import com.terrapin.ecommerce.dto.PaymentIntentDTO;
import com.terrapin.ecommerce.service.StripeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final StripeService stripeService;

    @GetMapping("/{paymentIntentId}")
    public ResponseEntity<Map<String, Object>> getPaymentIntent(@PathVariable String paymentIntentId) {
        PaymentIntent paymentIntent = stripeService.retrievePaymentIntent(paymentIntentId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", paymentIntent.getId());
        response.put("amount", paymentIntent.getAmount());
        response.put("currency", paymentIntent.getCurrency());
        response.put("status", paymentIntent.getStatus());
        response.put("client_secret", paymentIntent.getClientSecret());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{paymentIntentId}/confirm")
    public ResponseEntity<Map<String, Object>> confirmPayment(@PathVariable String paymentIntentId) {
        PaymentIntent paymentIntent = stripeService.confirmPaymentIntent(paymentIntentId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", paymentIntent.getId());
        response.put("status", paymentIntent.getStatus());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{paymentIntentId}/cancel")
    public ResponseEntity<Map<String, Object>> cancelPayment(@PathVariable String paymentIntentId) {
        PaymentIntent paymentIntent = stripeService.cancelPaymentIntent(paymentIntentId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("id", paymentIntent.getId());
        response.put("status", paymentIntent.getStatus());
        
        return ResponseEntity.ok(response);
    }
}