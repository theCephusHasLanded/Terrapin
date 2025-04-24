// API service for connecting to the Spring Boot backend
import { sampleProducts } from '../data/sampleProducts';
import { API_CONFIG } from '../config';

// Base URL for API requests
const API_BASE_URL = API_CONFIG.BASE_URL;

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'An error occurred');
  }
  return response.json();
};

// Get all products with pagination, filtering, and sorting
export const getProducts = async (page = 0, size = 10, sortBy = 'id', sortDir = 'asc', category = '') => {
  try {
    // If we're configured to use mock data, use the sample data
    if (API_CONFIG.USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      let filteredProducts = [...sampleProducts];
      
      // Apply category filter if provided
      if (category) {
        filteredProducts = filteredProducts.filter(
          product => product.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      return {
        products: filteredProducts.slice(page * size, (page + 1) * size),
        pagination: {
          totalElements: filteredProducts.length,
          totalPages: Math.ceil(filteredProducts.length / size),
          page,
          size,
          last: (page + 1) * size >= filteredProducts.length,
          first: page === 0,
        },
      };
    }
    
    // Build URL with query parameters
    let url = `${API_BASE_URL}/products?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`;
    
    // Add category filter if provided
    if (category) {
      url = `${API_BASE_URL}/products/category/${category}?page=${page}&size=${size}`;
    }
    
    const response = await fetch(url);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get a single product by ID
export const getProduct = async (id) => {
  try {
    // If we're configured to use mock data, use the sample data
    if (API_CONFIG.USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      const product = sampleProducts.find(p => String(p.id) === String(id));
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      return product;
    }
    
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// Get related products
export const getRelatedProducts = async (productId, limit = 4) => {
  try {
    // If we're configured to use mock data, use the sample data
    if (API_CONFIG.USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      const product = sampleProducts.find(p => String(p.id) === String(productId));
      
      if (!product) {
        throw new Error('Product not found');
      }
      
      // Get products in the same category, excluding the current product
      const relatedProducts = sampleProducts
        .filter(p => p.category === product.category && String(p.id) !== String(productId))
        .slice(0, limit);
      
      return relatedProducts;
    }
    
    const response = await fetch(`${API_BASE_URL}/products/${productId}/related?limit=${limit}`);
    return handleResponse(response);
  } catch (error) {
    console.error(`Error fetching related products for ${productId}:`, error);
    throw error;
  }
};

// Search products by keyword
export const searchProducts = async (keyword, page = 0, size = 10) => {
  try {
    // If we're configured to use mock data, use the sample data
    if (API_CONFIG.USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      const filteredProducts = sampleProducts.filter(
        product => product.name.toLowerCase().includes(keyword.toLowerCase()) ||
                  product.description.toLowerCase().includes(keyword.toLowerCase())
      );
      
      return {
        products: filteredProducts.slice(page * size, (page + 1) * size),
        pagination: {
          totalElements: filteredProducts.length,
          totalPages: Math.ceil(filteredProducts.length / size),
          page,
          size,
          last: (page + 1) * size >= filteredProducts.length,
          first: page === 0,
        },
      };
    }
    
    const response = await fetch(`${API_BASE_URL}/products/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Create an order (checkout)
export const createOrder = async (orderData) => {
  try {
    // If we're configured to use mock data, use the sample data
    if (API_CONFIG.USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      // Generate a fake order ID
      const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      return {
        id: orderId,
        ...orderData,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      };
    }
    
    const response = await fetch(`${API_BASE_URL}/orders/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get orders by customer email
export const getOrdersByEmail = async (email, page = 0, size = 10) => {
  try {
    // If we're configured to use mock data, use the sample data
    if (API_CONFIG.USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
      
      // This is a mock function, in a real app this would fetch from the backend
      return {
        content: [],
        pagination: {
          totalElements: 0,
          totalPages: 0,
          page,
          size,
          last: true,
          first: true,
        },
      };
    }
    
    const response = await fetch(`${API_BASE_URL}/orders/customer/${encodeURIComponent(email)}?page=${page}&size=${size}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Create payment intent (Stripe)
export const createPaymentIntent = async (amount, currency = 'usd', orderId) => {
  try {
    // If we're configured to use mock data, use the sample data
    if (API_CONFIG.USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Generate a fake payment intent ID
      const paymentIntentId = `pi_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
      
      return {
        id: paymentIntentId,
        client_secret: `${paymentIntentId}_secret_${Math.floor(Math.random() * 10000)}`,
        amount,
        currency,
        status: 'requires_payment_method',
      };
    }
    
    const response = await fetch(`${API_BASE_URL}/payments/intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, currency, orderId }),
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Process payment
export const processPayment = async (paymentIntentId, success = true) => {
  try {
    // If we're configured to use mock data, use the sample data
    if (API_CONFIG.USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      return {
        id: paymentIntentId,
        status: success ? 'succeeded' : 'canceled',
      };
    }
    
    const response = await fetch(`${API_BASE_URL}/orders/payment/${paymentIntentId}?success=${success}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse(response);
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};