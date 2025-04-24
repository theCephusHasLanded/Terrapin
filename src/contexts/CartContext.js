import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage and calculate total whenever items change
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
      calculateTotal();
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);

  // Calculate total price
  const calculateTotal = () => {
    const newTotal = items.reduce(
      (sum, item) => sum + (item.product.price * item.quantity),
      0
    );
    setTotal(newTotal);
  };

  // Add item to cart
  const addItem = (product, quantity = 1) => {
    setItems(prevItems => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(
        item => String(item.product.id) === String(product.id)
      );

      if (existingItemIndex > -1) {
        // Update quantity if product already exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item if product doesn't exist in cart
        return [
          ...prevItems,
          {
            id: `cart-${product.id}-${Date.now()}`,
            product,
            quantity,
          },
        ];
      }
    });
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    setItems(prevItems => prevItems.filter(item => String(item.product.id) !== String(itemId)));
  };

  // Update item quantity
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems(prevItems => 
      prevItems.map(item => 
        String(item.product.id) === String(itemId) 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    setTotal(0);
    localStorage.removeItem('cart');
  };

  const value = {
    items,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;