'use client';

import { useCart } from '../../lib/cart-context';
import Link from 'next/link';

export default function CartSummary() {
  const { total } = useCart();
  
  // Fixed shipping cost
  const shipping = 5.99;
  
  // Apply tax (e.g., 8%)
  const taxRate = 0.08;
  const tax = total * taxRate;
  
  // Calculate order total
  const orderTotal = total + shipping + tax;

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="text-gray-900 dark:text-white">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Shipping</span>
          <span className="text-gray-900 dark:text-white">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Tax</span>
          <span className="text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
          <div className="flex justify-between font-medium">
            <span className="text-gray-900 dark:text-white">Total</span>
            <span className="text-gray-900 dark:text-white">${orderTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Link
          href="/checkout"
          className="w-full btn btn-primary block text-center"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}