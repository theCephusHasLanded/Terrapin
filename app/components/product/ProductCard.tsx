'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../lib/types';
import { useCart } from '../../lib/cart-context';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="card h-full flex flex-col">
      <Link href={`/product/${product.id}`} className="flex-shrink-0 relative h-48 overflow-hidden">
        {product.image ? (
          <Image 
            src={product.image} 
            alt={product.name} 
            className="object-cover hover:scale-105 transition-transform duration-300"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
            No Image
          </div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/product/${product.id}`} className="mb-2 block">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">{product.name}</h3>
        </Link>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex-grow line-clamp-2">
          {product.description}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <button 
            onClick={() => addItem(product, 1)}
            className="btn btn-primary"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}