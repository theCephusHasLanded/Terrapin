'use client';

import { useState, useEffect } from 'react';
import ProductGrid from './components/product/ProductGrid';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from './lib/types';

// Mock products to use during static build and until real products load
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Tortoise Shell Glasses',
    description: 'Elegant tortoise shell glasses with premium craftsmanship.',
    price: 129.99,
    image: '/images/products/glasses.jpg',
    category: 'Accessories',
    inventory: 15,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Art Deco Pendant Light',
    description: 'Beautiful art deco inspired pendant light that elevates any space.',
    price: 249.99,
    image: '/images/products/light.jpg',
    category: 'Home',
    inventory: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Leather Wallet',
    description: 'Handcrafted leather wallet with beautiful detailing.',
    price: 79.99,
    image: '/images/products/wallet.jpg',
    category: 'Accessories',
    inventory: 20,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [loading, setLoading] = useState(true);

  // Fetch real products on the client side
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?limit=6');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.products || sampleProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Art Deco Hero Section */}
      <section className="relative overflow-hidden bg-shell-gold">
        {/* Tortoise Shell Pattern Overlay */}
        <div className="absolute inset-0 tortoise-overlay"></div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
          <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
            <div className="text-center md:text-left mb-12 md:mb-0">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-shell-brown mb-6">
                Curated Elegance
              </h1>
              <div className="w-32 h-1 bg-shell-amber mx-auto md:mx-0 mb-6"></div>
              <p className="text-lg text-dark-brown max-w-xl mx-auto md:mx-0 mb-8">
                Discover our handpicked collection of premium products, crafted with precision and designed for elegance.
              </p>
              <Link 
                href="/#products" 
                className="btn btn-primary px-8 py-3 inline-block"
              >
                Shop Collection
              </Link>
            </div>
            
            {/* Art Deco Decorative Element */}
            <div className="relative mx-auto" style={{ maxWidth: '500px' }}>
              <div className="aspect-w-1 aspect-h-1 relative">
                <div className="absolute inset-0 border-3 border-shell-amber"></div>
                <div className="absolute inset-4 bg-cream"></div>
                <div className="absolute inset-8 bg-shell-brown bg-opacity-5 flex items-center justify-center">
                  <span className="font-display text-8xl text-shell-amber">T</span>
                </div>
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-3 border-l-3 border-accent-gold"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-accent-gold"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-accent-gold"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-3 border-r-3 border-accent-gold"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-shell-gold rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-shell-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-shell-brown mb-2">Premium Quality</h3>
              <div className="w-12 h-0.5 bg-shell-amber mx-auto mb-3"></div>
              <p className="text-dark-brown">Carefully selected materials and expert craftsmanship in every product.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-shell-gold rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-shell-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-shell-brown mb-2">Swift Delivery</h3>
              <div className="w-12 h-0.5 bg-shell-amber mx-auto mb-3"></div>
              <p className="text-dark-brown">Fast and reliable shipping with careful handling for perfect arrival.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto bg-shell-gold rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-shell-brown" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-display text-xl text-shell-brown mb-2">Secure Shopping</h3>
              <div className="w-12 h-0.5 bg-shell-amber mx-auto mb-3"></div>
              <p className="text-dark-brown">Protected transactions and discreet packaging for peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-16 bg-cream relative">
        <div className="absolute inset-0 tortoise-overlay opacity-[0.02]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="art-deco-header mx-auto">Featured Collection</h2>
            <p className="text-dark-brown max-w-2xl mx-auto">
              Discover our carefully curated selection of premium products.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-2 border-shell-amber rounded-full border-t-transparent animate-spin"></div>
              <p className="mt-2 text-shell-brown">Loading products...</p>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}

          <div className="mt-12 text-center">
            <Link href="/products" className="btn btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Art Deco Banner */}
      <section className="py-16 bg-shell-brown relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-shell-caramel via-shell-amber to-accent-gold"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-gold via-shell-amber to-shell-caramel"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-shell-gold mb-6">
            Timeless Elegance, Modern Functionality
          </h2>
          <p className="text-shell-gold text-lg max-w-3xl mx-auto mb-8 opacity-90">
            Join our exclusive collection of customers who appreciate refined aesthetics and exceptional quality.
          </p>
          <Link href="/products" className="btn border-2 border-shell-gold text-shell-gold hover:bg-shell-gold hover:text-shell-brown">
            Explore Our Philosophy
          </Link>
        </div>
      </section>
    </div>
  );
}