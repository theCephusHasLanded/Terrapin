// Configuration for the Terrapin E-commerce application

// API Configuration
const API_CONFIG = {
  // The base URL for API requests - uses environment variable or defaults to localhost:8080/api
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  
  // Flag to use mock data if true, or real API calls if false
  USE_MOCK_DATA: process.env.REACT_APP_USE_MOCK_DATA === 'true' || false,
  
  // API request timeout in milliseconds
  TIMEOUT: 10000,
  
  // API endpoints
  ENDPOINTS: {
    PRODUCTS: '/products',
    PRODUCT_DETAIL: (id) => `/products/${id}`,
    PRODUCT_SEARCH: '/products/search',
    PRODUCT_CATEGORY: (category) => `/products/category/${category}`,
    RELATED_PRODUCTS: (id) => `/products/${id}/related`,
    
    ORDERS: '/orders',
    CHECKOUT: '/orders/checkout',
    CUSTOMER_ORDERS: (email) => `/orders/customer/${email}`,
    
    PAYMENT_INTENT: '/payments/intent',
    PROCESS_PAYMENT: (paymentIntentId) => `/orders/payment/${paymentIntentId}`,
  }
};

// App Configuration
const APP_CONFIG = {
  // Maximum number of items to display per page
  PAGE_SIZE: 12,
  
  // Product image placeholder URL
  DEFAULT_PRODUCT_IMAGE: '/images/products/placeholder.jpg',
  
  // Currency settings
  CURRENCY: {
    CODE: 'USD',
    SYMBOL: '$',
    LOCALE: 'en-US'
  },
  
  // Minimum order value for checkout
  MIN_ORDER_VALUE: 10,
};

export { API_CONFIG, APP_CONFIG };