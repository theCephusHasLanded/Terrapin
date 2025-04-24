package com.terrapin.ecommerce.util;

import com.terrapin.ecommerce.model.Product;
import com.terrapin.ecommerce.repository.ProductRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
@Profile({"dev", "test"})  // Load only in dev and test profiles
public class DataLoader {
    
    private final ProductRepository productRepository;
    
    @PostConstruct
    public void loadData() {
        if (productRepository.count() == 0) {
            log.info("Loading sample products...");
            createSampleProducts();
            log.info("Sample products loaded successfully");
        }
    }
    
    private void createSampleProducts() {
        List<Product> products = Arrays.asList(
            Product.builder()
                .name("Tortoise Shell Sunglasses")
                .description("Elegant tortoise shell sunglasses with premium craftsmanship and UV protection. These timeless frames offer both style and functionality.")
                .price(new BigDecimal("129.99"))
                .image("https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80")
                .category("Accessories")
                .inventory(15)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build(),
                
            Product.builder()
                .name("Art Deco Pendant Light")
                .description("Beautiful art deco inspired pendant light that elevates any space with its geometric patterns and warm glow. Perfect for dining areas and entryways.")
                .price(new BigDecimal("249.99"))
                .image("https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
                .category("Home")
                .inventory(8)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build(),
                
            Product.builder()
                .name("Leather Wallet")
                .description("Handcrafted leather wallet with beautiful detailing and multiple card slots. Made from genuine leather that develops a beautiful patina over time.")
                .price(new BigDecimal("79.99"))
                .image("https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
                .category("Accessories")
                .inventory(20)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build(),
                
            Product.builder()
                .name("Tortoise Shell Bracelet")
                .description("Elegant bracelet with tortoise shell pattern, perfect for adding a touch of sophistication to any outfit. Adjustable size for a comfortable fit.")
                .price(new BigDecimal("59.99"))
                .image("https://images.unsplash.com/photo-1611591437268-9b88585a9c9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")
                .category("Jewelry")
                .inventory(12)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build(),
                
            Product.builder()
                .name("Art Deco Picture Frame")
                .description("Stunning art deco style picture frame with geometric patterns and a luxurious finish. Available in multiple sizes to showcase your favorite memories.")
                .price(new BigDecimal("89.99"))
                .image("https://images.unsplash.com/photo-1581783154601-9d1137dd97cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80")
                .category("Home")
                .inventory(10)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build(),
                
            Product.builder()
                .name("Leather Desk Pad")
                .description("Premium leather desk pad that protects your desk while adding a touch of elegance to your workspace. Features smooth, water-resistant surface.")
                .price(new BigDecimal("69.99"))
                .image("https://images.unsplash.com/photo-1587930604853-b4e99e5bfab7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")
                .category("Office")
                .inventory(15)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build(),
                
            Product.builder()
                .name("Tortoise Shell Hair Clips")
                .description("Set of elegant tortoise shell hair clips in various sizes. These versatile accessories add a touch of sophistication to any hairstyle.")
                .price(new BigDecimal("29.99"))
                .image("https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
                .category("Accessories")
                .inventory(25)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build(),
                
            Product.builder()
                .name("Art Deco Wall Mirror")
                .description("Stunning art deco wall mirror with geometric design and golden accents. Makes a statement piece in any room while adding light and dimension.")
                .price(new BigDecimal("179.99"))
                .image("https://images.unsplash.com/photo-1616486701797-0f33f61038df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
                .category("Home")
                .inventory(5)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build(),
                
            Product.builder()
                .name("Italian Leather Belt")
                .description("Handcrafted Italian leather belt with a vintage-inspired buckle. A timeless accessory that elevates any outfit with its quality and elegance.")
                .price(new BigDecimal("89.99"))
                .image("https://images.unsplash.com/photo-1611703372231-02ffab7e3965?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
                .category("Accessories")
                .inventory(18)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build(),
                
            Product.builder()
                .name("Art Deco Cocktail Set")
                .description("Elegant art deco inspired cocktail set including shaker, jigger, strainer, and mixing spoon. Perfect for entertaining guests with style.")
                .price(new BigDecimal("129.99"))
                .image("https://images.unsplash.com/photo-1594797394943-a1c72c8714fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=706&q=80")
                .category("Home")
                .inventory(7)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build(),
                
            Product.builder()
                .name("Leather Notebook Cover")
                .description("Premium leather notebook cover that gets better with age. Designed to fit standard A5 notebooks, with pockets for cards and a pen holder.")
                .price(new BigDecimal("49.99"))
                .image("https://images.unsplash.com/photo-1544816155-12df9a7de7a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
                .category("Office")
                .inventory(22)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build(),
                
            Product.builder()
                .name("Tortoise Shell Comb Set")
                .description("Luxurious set of tortoise shell combs in various sizes. These durable combs are gentle on hair and scalp, preventing breakage and static.")
                .price(new BigDecimal("39.99"))
                .image("https://images.unsplash.com/photo-1630113741077-91df1e4758dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80")
                .category("Accessories")
                .inventory(14)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build()
        );
        
        productRepository.saveAll(products);
    }
}