package com.terrapin.ecommerce.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class StripeService {

    @Value("${stripe.api-key}")
    private String apiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = apiKey;
    }

    public String createPaymentIntent(BigDecimal amount, String currency, String orderId) {
        try {
            long amountInCents = amount.multiply(new BigDecimal(100)).longValue();
            
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(amountInCents)
                    .setCurrency(currency)
                    .putMetadata("order_id", orderId)
                    .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                            .setEnabled(true)
                            .build()
                    )
                    .build();
            
            PaymentIntent paymentIntent = PaymentIntent.create(params);
            return paymentIntent.getId();
        } catch (StripeException e) {
            log.error("Error creating payment intent", e);
            throw new RuntimeException("Failed to create payment intent", e);
        }
    }

    public PaymentIntent retrievePaymentIntent(String paymentIntentId) {
        try {
            return PaymentIntent.retrieve(paymentIntentId);
        } catch (StripeException e) {
            log.error("Error retrieving payment intent", e);
            throw new RuntimeException("Failed to retrieve payment intent", e);
        }
    }

    public PaymentIntent confirmPaymentIntent(String paymentIntentId) {
        try {
            PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);
            Map<String, Object> params = new HashMap<>();
            PaymentIntent confirmedIntent = intent.confirm(params);
            return confirmedIntent;
        } catch (StripeException e) {
            log.error("Error confirming payment intent", e);
            throw new RuntimeException("Failed to confirm payment intent", e);
        }
    }

    public PaymentIntent cancelPaymentIntent(String paymentIntentId) {
        try {
            PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);
            Map<String, Object> params = new HashMap<>();
            PaymentIntent canceledIntent = intent.cancel(params);
            return canceledIntent;
        } catch (StripeException e) {
            log.error("Error canceling payment intent", e);
            throw new RuntimeException("Failed to cancel payment intent", e);
        }
    }
}