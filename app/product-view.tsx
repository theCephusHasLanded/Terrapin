'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product } from './lib/types';
import Link from 'next/link';

export default function ProductView() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`/api/product?id=${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch product');
          return res.json();
        })
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching product:', err);
          setError('Could not load product. Please try again.');
          setLoading(false);
        });
    } else {
      setError('No product ID provided');
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!product) return <div className="p-8 text-center">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/" className="text-shell-brown hover:text-shell-amber mb-6 inline-block">&larr; Back to products</Link>
      
      <div className="bg-cream border border-shell-caramel p-8 mt-4">
        <h1 className="font-display text-3xl text-shell-brown mb-4">{product.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="aspect-w-1 bg-shell-gold flex items-center justify-center">
              <span className="font-display text-4xl text-shell-brown">T</span>
            </div>
          </div>
          <div>
            <p className="text-dark-brown mb-4">{product.description}</p>
            <p className="text-2xl font-semibold text-shell-brown mb-6">${product.price.toFixed(2)}</p>
            <button className="btn btn-primary w-full md:w-auto">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}