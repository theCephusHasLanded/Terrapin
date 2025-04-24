import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      }
    }
  },
  server: {
    port: 3000,
    open: true,
  },
  define: {
    'process.env': {
      REACT_APP_API_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
      REACT_APP_USE_MOCK_DATA: process.env.REACT_APP_USE_MOCK_DATA || 'true',
      REACT_APP_ENV: process.env.REACT_APP_ENV || 'development',
    }
  }
});