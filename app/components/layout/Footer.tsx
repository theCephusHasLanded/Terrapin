export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Terrapin Shop. All Rights Reserved.
            </span>
          </div>
          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-8">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}