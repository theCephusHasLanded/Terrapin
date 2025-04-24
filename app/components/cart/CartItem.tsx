'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '../../lib/types';
import { useCart } from '../../lib/cart-context';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const product = item.product;

  return (
    <div className="flex items-center py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex-shrink-0 w-24 h-24 relative overflow-hidden rounded-md">
        {product.image ? (
          <Image 
            src={product.image} 
            alt={product.name} 
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 96px"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="flex-1 ml-4">
        <h3 className="text-md font-medium text-gray-900 dark:text-white">{product.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">${product.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center">
        <button 
          onClick={() => updateQuantity(String(product.id), item.quantity - 1)}
          className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <span className="mx-2 text-gray-900 dark:text-white">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(String(product.id), item.quantity + 1)}
          className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="flex-shrink-0 ml-6">
        <span className="text-md font-medium text-gray-900 dark:text-white">
          ${(product.price * item.quantity).toFixed(2)}
        </span>
      </div>
      <button 
        onClick={() => removeItem(String(product.id))}
        className="ml-4 p-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}