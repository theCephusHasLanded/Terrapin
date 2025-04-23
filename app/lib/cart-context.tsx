'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { CartState, CartItem, Product } from './types';

const CartContext = createContext<CartState | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
        calculateTotal(parsedCart);
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
      calculateTotal(items);
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [items]);

  // Calculate total price
  const calculateTotal = (cartItems: CartItem[]) => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotal(newTotal);
  };

  // Add item to cart
  const addItem = (product: Product, quantity = 1) => {
    setItems((prevItems) => {
      // Check if product already exists in cart
      const existingItemIndex = prevItems.findIndex(
        (item) => item.productId === product.id
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
            productId: product.id,
            product,
            quantity,
          },
        ];
      }
    });
  };

  // Remove item from cart
  const removeItem = (productId: string) => {
    setItems((prevItems) => 
      prevItems.filter((item) => item.productId !== productId)
    );
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) => 
      prevItems.map((item) => 
        item.productId === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    setTotal(0);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      total, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}