import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from './lib/cart-context';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

export const metadata: Metadata = {
  title: 'Terrapin E-Commerce',
  description: 'A modern e-commerce platform built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}