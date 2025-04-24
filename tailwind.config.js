/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['var(--font-playfair)', 'serif'],
        'sans': ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        'shell-brown': '#5E3023',
        'shell-amber': '#BC6C25',
        'shell-caramel': '#DDA15E',
        'shell-gold': '#FEFAE0',
        'cream': '#FDFCF5',
        'dark-brown': '#283618',
        'sage': '#606C38',
        'accent-gold': '#D4AF37',
      },
      borderWidth: {
        '3': '3px',
      },
      backgroundImage: {
        'tortoise-pattern': "url('/images/tortoise-pattern.png')",
      },
      boxShadow: {
        'art-deco': '0 4px 6px -1px rgba(94, 48, 35, 0.1), 0 2px 4px -1px rgba(94, 48, 35, 0.06)',
      },
    },
  },
  plugins: [],
};