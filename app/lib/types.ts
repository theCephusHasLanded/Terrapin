// Core type definitions for the application

export type Product = {
  id: string | bigint;  // Support both string and bigint for flexibility
  name: string;
  description: string;
  price: number;
  image?: string | null;  // Allow null values
  category: string;
  inventory: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CartItem = {
  id: string | bigint;
  quantity: number;
  product: Product;
  productId: string | bigint;
};

export enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export type Order = {
  id: string | bigint;
  total: number;
  status: OrderStatus;
  customerEmail: string;
  customerName: string;
  shippingAddress: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
  stripePaymentIntentId?: string;
};

// Client-side cart state
export type CartState = {
  items: CartItem[];
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};