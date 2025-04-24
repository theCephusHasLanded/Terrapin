// API service for handling product data and other API calls
// This is a simplified version that uses the mock data
// In a real app, this would connect to your backend API

import { sampleProducts } from '../data/sampleProducts';

// Get all products with optional limit
export const getProducts = async (limit = 0, category = '') => {
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  try {
    let filteredProducts = [...sampleProducts];
    
    // Filter by category if provided
    if (category) {
      filteredProducts = filteredProducts.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Apply limit if provided
    if (limit > 0) {
      filteredProducts = filteredProducts.slice(0, limit);
    }
    
    return {
      products: filteredProducts,
      pagination: {
        total: filteredProducts.length,
        page: 1,
        pageSize: limit || filteredProducts.length,
        totalPages: 1,
      },
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get a single product by ID
export const getProduct = async (id) => {
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const product = sampleProducts.find(p => String(p.id) === String(id));
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    return product;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// Process an order
export const createOrder = async (orderData) => {
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  try {
    // In a real app, this would send the order data to your backend
    console.log('Creating order:', orderData);
    
    // Generate a fake order ID
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    return {
      id: orderId,
      ...orderData,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};