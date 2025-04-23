import { prisma } from './lib/db';
import ProductGrid from './components/product/ProductGrid';
import Link from 'next/link';

export default async function Home() {
  // Fetch products from the database
  const products = await prisma.product.findMany({
    take: 6, // Limit to 6 products for the homepage
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Map the products to include price as a number for client components
  const mappedProducts = products.map(product => ({
    ...product,
    price: parseFloat(product.price.toString())
  }));

  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Welcome to Terrapin Shop
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Discover our handpicked products with fast shipping and top-notch quality.
            </p>
            <div className="mt-8">
              <Link href="/#products" className="btn bg-white text-primary-700 hover:bg-gray-100">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured products section */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Check out our latest products curated just for you.
            </p>
          </div>

          <ProductGrid products={mappedProducts} />

          <div className="mt-12 text-center">
            <Link href="/products" className="btn btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Shop With Us</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Quality Products</h3>
              <p className="text-gray-600 dark:text-gray-400">All our products are carefully selected for quality and durability.</p>
            </div>
            <div className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Fast Shipping</h3>
              <p className="text-gray-600 dark:text-gray-400">Get your orders delivered quickly with our express shipping options.</p>
            </div>
            <div className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Secure Payments</h3>
              <p className="text-gray-600 dark:text-gray-400">Shop with confidence using our secure payment methods.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}