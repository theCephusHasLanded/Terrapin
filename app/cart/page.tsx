'use client';

import { useCart } from '../lib/cart-context';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Link from 'next/link';

export default function CartPage() {
  const { items, clearCart } = useCart();

  // If cart is empty
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Your Cart</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Your cart is currently empty.
          </p>
          <Link href="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Your Cart</h1>
      
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flow-root">
                <div className="-my-6">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-end">
              <button 
                onClick={clearCart}
                className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
        
        {/* Cart summary */}
        <div className="mt-8 lg:mt-0">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}