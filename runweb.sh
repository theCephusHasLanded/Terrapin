#!/bin/bash

# Simplified script to run the frontend with mock data

echo "=== Starting Terrapin E-commerce Frontend ==="

# Create environment file with mock data setting
echo "REACT_APP_API_URL=http://localhost:8080/api" > .env.local
echo "REACT_APP_USE_MOCK_DATA=true" >> .env.local
echo "REACT_APP_ENV=development" >> .env.local

echo "Frontend will be available at: http://localhost:3000"
echo "Using mock data for development"
npm run dev