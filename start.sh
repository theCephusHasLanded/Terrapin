#!/bin/bash

# Start script for Terrapin E-commerce application

echo "=== Starting Terrapin E-commerce Application ==="

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed or not in PATH"
    echo "Please install Node.js and npm"
    exit 1
fi

# Create or update .env file to use mock data
if [ -f .env ]; then
    # Update existing .env file
    grep -q "REACT_APP_USE_MOCK_DATA" .env && 
    sed -i '' 's/REACT_APP_USE_MOCK_DATA=.*/REACT_APP_USE_MOCK_DATA=true/' .env ||
    echo "REACT_APP_USE_MOCK_DATA=true" >> .env
else
    # Create new .env file
    echo "REACT_APP_API_URL=http://localhost:8080/api" > .env
    echo "REACT_APP_USE_MOCK_DATA=true" >> .env
    echo "REACT_APP_ENV=development" >> .env
fi

echo "=== Configuration ==="
echo "Using mock data for frontend development"
echo ""

echo "=== Starting Frontend (Vite) ==="
echo "Frontend will be available at: http://localhost:3000"
cd "$(dirname "$0")"
npm run dev