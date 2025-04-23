'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Something went wrong!</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        We apologize for the inconvenience. Please try again or contact support if the problem persists.
      </p>
      <button
        onClick={() => reset()}
        className="btn btn-primary"
      >
        Try again
      </button>
    </div>
  );
}