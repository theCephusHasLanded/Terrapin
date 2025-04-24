'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '../../lib/types';
import { useCart } from '../../lib/cart-context';
import ProductGrid from '../../components/product/ProductGrid';

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  // Update API call to use the non-dynamic endpoint
  const getProductDetails = async (id: string) => {
    try {
      const response = await fetch(`/api/product-by-id?id=${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Product image */}
        <div className="relative h-72 sm:h-96 lg:h-auto">
          {product.image ? (
            <Image 
              src={product.image} 
              alt={product.name} 
              className="object-cover rounded-lg shadow-md"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 rounded-lg">
              No Image Available
            </div>
          )}
        </div>

        {/* Product details */}
        <div className="mt-10 lg:mt-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
          
          <div className="mt-4">
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <div className="mt-4 border-t border-b border-gray-200 dark:border-gray-700 py-4">
            <div className="prose prose-sm dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300">{product.description}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <div className="mr-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="mt-1 block w-20 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-800 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <button
                onClick={handleAddToCart}
                className="btn btn-primary flex-1"
              >
                Add to Cart
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Product Details</h3>
            <div className="mt-2 space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-white">Category:</span> {product.category}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium text-gray-900 dark:text-white">Stock:</span> {product.inventory > 0 ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}