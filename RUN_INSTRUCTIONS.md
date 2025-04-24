# Terrapin E-commerce - Running Instructions

## Running the Frontend

To run the frontend with mock data (no backend needed):

```bash
# From the project root
./runweb.sh
```

This will:
1. Create a local environment file with mock data enabled
2. Start the Vite development server
3. Open the application in your browser at http://localhost:3000

## Setting Up the Backend (Optional)

The Spring Boot backend requires:

1. Java 17 or later
2. Maven
3. PostgreSQL database

### Database Setup

1. Create a PostgreSQL database named `terrapin`
2. Configure database connection settings in:
   ```
   terrapin-backend//main/resources/application.yml
   ```

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd terrapin-backend
   ```

2. If you have Maven installed:
   ```bash
   mvn spring-boot:run
   ```

3. If you have the Maven wrapper set up:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend API will be available at: http://localhost:8080/api

## Connecting Frontend to Backend

Once both services are running:

1. Update the `.env.local` file:
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   REACT_APP_USE_MOCK_DATA=false
   REACT_APP_ENV=development
   ```

2. Restart the frontend application

## Troubleshooting

- If you encounter dependency issues, try:
  ```bash
  npm install --legacy-peer-deps
  ```

- For backend connection issues, verify:
  - Database is running and accessible
  - Backend application has started successfully
  - CORS is properly configured

- For more detailed setup instructions, see:
  - `INTEGRATION.md` - Frontend/backend integration details
  - `DATABASE_SETUP.md` - Database configuration
