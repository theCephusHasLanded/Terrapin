package com.terrapin.ecommerce.service;

import com.terrapin.ecommerce.dto.PagedResponseDTO;
import com.terrapin.ecommerce.dto.ProductDTO;
import com.terrapin.ecommerce.exception.ResourceNotFoundException;
import com.terrapin.ecommerce.model.Product;
import com.terrapin.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Transactional(readOnly = true)
    public PagedResponseDTO<ProductDTO> getAllProducts(Pageable pageable) {
        Page<Product> productPage = productRepository.findAll(pageable);
        Page<ProductDTO> dtoPage = productPage.map(product -> modelMapper.map(product, ProductDTO.class));
        return PagedResponseDTO.from(dtoPage);
    }

    @Transactional(readOnly = true)
    public PagedResponseDTO<ProductDTO> getProductsByCategory(String category, Pageable pageable) {
        Page<Product> productPage = productRepository.findByCategory(category, pageable);
        Page<ProductDTO> dtoPage = productPage.map(product -> modelMapper.map(product, ProductDTO.class));
        return PagedResponseDTO.from(dtoPage);
    }

    @Transactional(readOnly = true)
    public PagedResponseDTO<ProductDTO> searchProducts(String keyword, Pageable pageable) {
        Page<Product> productPage = productRepository.findByNameContainingIgnoreCase(keyword, pageable);
        Page<ProductDTO> dtoPage = productPage.map(product -> modelMapper.map(product, ProductDTO.class));
        return PagedResponseDTO.from(dtoPage);
    }

    @Transactional(readOnly = true)
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return modelMapper.map(product, ProductDTO.class);
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getRelatedProducts(Long productId, int limit) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));
        
        return productRepository.findByCategoryAndIdNot(product.getCategory(), productId, Pageable.ofSize(limit))
                .stream()
                .map(p -> modelMapper.map(p, ProductDTO.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = modelMapper.map(productDTO, Product.class);
        Product savedProduct = productRepository.save(product);
        return modelMapper.map(savedProduct, ProductDTO.class);
    }

    @Transactional
    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        
        Product product = modelMapper.map(productDTO, Product.class);
        product.setId(id);
        Product updatedProduct = productRepository.save(product);
        return modelMapper.map(updatedProduct, ProductDTO.class);
    }

    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }
    
    @Transactional
    public ProductDTO updateProductInventory(Long id, Integer quantity) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        
        product.setInventory(quantity);
        Product updatedProduct = productRepository.save(product);
        return modelMapper.map(updatedProduct, ProductDTO.class);
    }
}