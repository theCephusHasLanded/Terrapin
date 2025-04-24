# How to Run Terrapin E-commerce

To run the frontend application in its simplest form, follow these steps:

## Quick Start

1. **Run with React Scripts**:
   ```bash
   npm run start
   ```

2. **Using the Run Script**:
   ```bash
   ./run.sh
   ```

This will start the React application in development mode with mock data.
The application will be available at http://localhost:3000.

## Troubleshooting

If you encounter dependency issues:

1. **Clear node_modules and reinstall**:
   ```bash
   rm -rf node_modules
   npm install --legacy-peer-deps
   ```

2. **Fix the ajv dependency issue**:
   ```bash
   npm install ajv@8.12.0 ajv-keywords@5.1.0 --legacy-peer-deps
   ```

## Running with Mock Data

The application is configured to use mock data by default.
This means you don't need to run a backend server to see the application working.

## Available Commands

- `npm run start` - Start the development server
- `npm run build` - Build for production
- `npm run test` - Run tests