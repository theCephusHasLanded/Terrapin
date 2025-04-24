package com.terrapin.ecommerce.repository;

import com.terrapin.ecommerce.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Find products by category
    Page<Product> findByCategory(String category, Pageable pageable);
    
    // Find products by name containing the given keyword
    Page<Product> findByNameContainingIgnoreCase(String keyword, Pageable pageable);
    
    // Find products with inventory greater than zero
    Page<Product> findByInventoryGreaterThan(Integer inventory, Pageable pageable);
    
    // Find related products in the same category, excluding the given product ID
    List<Product> findByCategoryAndIdNot(String category, Long id, Pageable pageable);
}