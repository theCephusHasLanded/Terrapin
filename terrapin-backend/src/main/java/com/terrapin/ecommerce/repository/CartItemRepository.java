package com.terrapin.ecommerce.repository;

import com.terrapin.ecommerce.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    
    // Find items for a specific order
    List<CartItem> findByOrderId(Long orderId);
    
    // Find items for a specific product
    List<CartItem> findByProductId(Long productId);
    
    // Count items by product ID
    long countByProductId(Long productId);
    
    // Find top selling products (most ordered items)
    @Query("SELECT ci.product.id, SUM(ci.quantity) as totalQuantity " +
           "FROM CartItem ci " +
           "WHERE ci.order IS NOT NULL " +
           "GROUP BY ci.product.id " +
           "ORDER BY totalQuantity DESC")
    List<Object[]> findTopSellingProducts(Pageable pageable);
    
    // Find cart items for a specific session (for implementing shopping cart)
    @Query("SELECT ci FROM CartItem ci WHERE ci.order IS NULL AND ci.sessionId = :sessionId")
    List<CartItem> findCartItemsBySessionId(@Param("sessionId") String sessionId);
}