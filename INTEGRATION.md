# Frontend and Backend Integration Guide

This guide explains how to set up and run both the React frontend and Spring Boot backend components of the Terrapin E-Commerce application.

## Architecture Overview

Our application uses a client-server architecture:

1. **Frontend**: React application with Material UI
2. **Backend**: Spring Boot REST API
3. **Database**: PostgreSQL database

## Prerequisites

- Node.js 16.8.0 or later
- npm or yarn
- Java 17 or later
- Maven
- PostgreSQL database

## Setup Instructions

### 1. Database Setup

1. Install PostgreSQL if not already installed
2. Create a new database named `terrapin`:
   ```sql
   CREATE DATABASE terrapin;
   ```
3. Create a PostgreSQL user (or use the default `postgres` user)
4. Note the database connection details for later use

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd terrapin-backend
   ```

2. Configure the database connection:
   - Edit `src/main/resources/application.yml`
   - Update the following properties:
     ```yml
     spring:
       datasource:
         url: jdbc:postgresql://localhost:5432/terrapin
         username: postgres
         password: your_password
     ```

3. Build the application:
   ```bash
   ./mvnw clean package
   ```

4. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

5. The backend will start on `http://localhost:8080/api`

### 3. Frontend Setup

1. From the project root, install dependencies:
   ```bash
   npm install
   ```

2. Configure the environment:
   - Create a `.env` file in the project root:
     ```
     REACT_APP_API_URL=http://localhost:8080/api
     REACT_APP_USE_MOCK_DATA=false
     ```

3. Start the React application:
   ```bash
   npm start
   ```

4. The frontend will start on `http://localhost:3000`

## Verifying Integration

### 1. Test Backend API Endpoints

- Products API: `http://localhost:8080/api/products`
- Categories: `http://localhost:8080/api/products/category/{category-name}`
- Product Details: `http://localhost:8080/api/products/{id}`

You can use tools like Postman or curl to test these endpoints.

### 2. Test Frontend-Backend Integration

1. Open the frontend application at `http://localhost:3000`
2. Verify that product listings are loaded from the backend
3. Test product search and filtering
4. Add items to the cart
5. Test the checkout process

## Troubleshooting

### CORS Issues

If you encounter CORS errors:

1. Verify that the backend CORS configuration allows requests from your frontend origin:
   ```java
   registry.addMapping("/**")
           .allowedOrigins("http://localhost:3000")
           .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
           .allowedHeaders("*")
           .allowCredentials(true);
   ```

2. Check that your frontend is making requests to the correct API URL

### API Connection Issues

If the frontend can't connect to the backend:

1. Verify that both applications are running
2. Check the API URL in your frontend configuration
3. Look for any error messages in the browser console
4. Check that the backend is correctly exposing the API endpoints

### Database Issues

If the backend can't connect to the database:

1. Check the database connection settings in `application.yml`
2. Verify that the PostgreSQL service is running
3. Check that the database user has proper permissions

## Development Workflow

When working on both frontend and backend:

1. Start the backend first, to ensure API endpoints are available
2. Start the frontend, which will connect to the running backend
3. Make API changes in the backend, then refresh the frontend to test
4. Use network monitoring in browser dev tools to debug API requests

## Using Mock Data During Development

If you need to work on the frontend without the backend:

1. Set `REACT_APP_USE_MOCK_DATA=true` in your `.env` file
2. Restart the frontend application
3. The frontend will now use sample data from `src/data/sampleProducts.js`

## Production Deployment

For production:

1. Build optimized frontend bundle:
   ```bash
   npm run build
   ```

2. Package Spring Boot as a JAR:
   ```bash
   ./mvnw clean package -DskipTests
   ```

3. Configure production environment variables:
   - Database connection for production
   - API URL pointing to the production backend
   - Set `USE_MOCK_DATA=false`

4. Deploy both applications to your hosting environment