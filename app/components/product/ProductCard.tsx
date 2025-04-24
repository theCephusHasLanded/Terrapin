'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../../lib/types';
import { useCart } from '../../lib/cart-context';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [imageError, setImageError] = useState(false);

  return (
    <div className="card group h-full flex flex-col">
      <Link href={`/product/${product.id}`} className="flex-shrink-0 relative h-60 overflow-hidden">
        {product.image && !imageError ? (
          <Image 
            src={product.image} 
            alt={product.name} 
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-shell-gold flex items-center justify-center">
            <div className="text-center p-4">
              <div className="font-display text-4xl mb-2 text-shell-brown">T</div>
              <div className="text-dark-brown text-sm uppercase tracking-widest font-medium">{product.category}</div>
            </div>
          </div>
        )}
        
        {/* Art Deco corner accent */}
        <div className="absolute top-0 left-0 w-10 h-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-20 h-20 bg-shell-amber opacity-80 rotate-45 transform origin-top-left"></div>
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2 flex items-baseline justify-between">
          <Link href={`/product/${product.id}`} className="block">
            <h3 className="font-display text-xl text-shell-brown group-hover:text-shell-amber transition-colors">
              {product.name}
            </h3>
          </Link>
          <span className="text-lg font-medium text-shell-brown">
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <div className="text-sm text-dark-brown mt-2 mb-4 flex-grow line-clamp-2">
          {product.description}
        </div>

        <button 
          onClick={() => addItem(product, 1)}
          className="btn btn-primary w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}