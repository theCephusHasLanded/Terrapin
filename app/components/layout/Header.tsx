'use client';

import Link from 'next/link';
import { useCart } from '../../lib/cart-context';

export default function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-xl text-primary-600 dark:text-primary-400">
              Terrapin Shop
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <Link href="/#products" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Products
            </Link>
          </nav>
          <div className="flex items-center">
            <Link href="/cart" className="group p-2 flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
              <span className="sr-only">Cart</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="ml-1 text-sm font-medium bg-primary-600 text-white group-hover:bg-primary-700 rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}