'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Component to handle the search params inside a suspense boundary
function OrderDetails() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');
  
  return (
    <div className="space-y-3">
      <p className="text-gray-600 dark:text-gray-400">
        <span className="font-medium text-gray-900 dark:text-white">Order ID:</span> {orderId || 'N/A'}
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        <span className="font-medium text-gray-900 dark:text-white">Date:</span> {new Date().toLocaleDateString()}
      </p>
      <p className="text-gray-600 dark:text-gray-400">
        <span className="font-medium text-gray-900 dark:text-white">Status:</span> 
        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Confirmed
        </span>
      </p>
    </div>
  );
}

// Main component with Suspense for the parts that use useSearchParams
export default function CheckoutSuccessPage() {
  // In a real app, you might want to verify the order exists
  // and show actual order details fetched from the server

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Order Confirmed!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 text-left">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Order Details</h2>
          <Suspense fallback={<div>Loading order details...</div>}>
            <OrderDetails />
          </Suspense>
        </div>
        
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Link href="/" className="btn btn-primary">
            Continue Shopping
          </Link>
          <Suspense fallback={<button className="btn btn-secondary" disabled>Loading...</button>}>
            <OrderLinkButton />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

// Component for the order link button
function OrderLinkButton() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');
  
  return (
    <Link href={`/orders/${orderId || ''}`} className="btn btn-secondary">
      View Order Details
    </Link>
  );
}