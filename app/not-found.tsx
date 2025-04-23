import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary">
        Go back home
      </Link>
    </div>
  );
}