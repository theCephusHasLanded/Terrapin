'use client';

import Link from 'next/link';
import { useCart } from '../../lib/cart-context';
import { useState, useEffect } from 'react';

export default function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-10 transition-all duration-300 ${
      scrolled ? 'bg-cream shadow-art-deco' : 'bg-cream'
    }`}>
      {/* Top decorative border */}
      <div className="h-1 w-full bg-gradient-to-r from-shell-brown via-shell-amber to-shell-caramel"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="font-display text-3xl text-shell-brown hover:text-shell-amber transition-colors">
              Terrapin
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-dark-brown hover:text-shell-amber py-2 uppercase tracking-wider text-sm font-semibold border-b-2 border-transparent hover:border-shell-amber transition-all">
              Home
            </Link>
            <Link href="/#products" className="text-dark-brown hover:text-shell-amber py-2 uppercase tracking-wider text-sm font-semibold border-b-2 border-transparent hover:border-shell-amber transition-all">
              Shop
            </Link>
            <Link href="/about" className="text-dark-brown hover:text-shell-amber py-2 uppercase tracking-wider text-sm font-semibold border-b-2 border-transparent hover:border-shell-amber transition-all">
              About
            </Link>
            <Link href="/contact" className="text-dark-brown hover:text-shell-amber py-2 uppercase tracking-wider text-sm font-semibold border-b-2 border-transparent hover:border-shell-amber transition-all">
              Contact
            </Link>
          </nav>
          
          <div className="flex items-center">
            <Link 
              href="/cart" 
              className="group p-2 flex items-center text-dark-brown hover:text-shell-amber transition-colors relative"
              aria-label="Shopping Cart"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current"
              >
                <path d="M3 3H5L5.4 5M5.4 5H21L17 13H7M5.4 5L7 13M7 13L5.2 16H17M9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18C8.32843 18 9 18.6716 9 19.5ZM17 19.5C17 20.3284 16.3284 21 15.5 21C14.6716 21 14 20.3284 14 19.5C14 18.6716 14.6716 18 15.5 18C16.3284 18 17 18.6716 17 19.5Z" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              
              {itemCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-shell-brown text-shell-gold rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative pattern */}
      <div className="h-1 w-full bg-tortoise-overlay"></div>
    </header>
  );
}