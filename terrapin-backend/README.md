# Terrapin E-Commerce Backend

A Spring Boot backend for the Terrapin E-Commerce application, providing RESTful APIs for products, orders, and payments.

## Tech Stack

- **Framework**: Spring Boot 3.2
- **Language**: Java 17
- **Database**: PostgreSQL (with H2 for testing)
- **ORM**: Spring Data JPA
- **Documentation**: SpringDoc OpenAPI 3
- **Payment Processing**: Stripe API
- **Build Tool**: Maven

## Features

- RESTful API for products, categories, orders, and payments
- Pagination and sorting for list endpoints
- Integration with Stripe for payment processing
- Error handling and validation
- Sample data loading for development and testing

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven
- PostgreSQL (optional, can use H2 for development)
- Stripe account (for payment functionality)

### Configuration

1. Clone the repository:

```bash
git clone https://github.com/theCephusHasLanded/Terrapin.git
cd terrapin-backend
```

2. Configure the database:

Update the `src/main/resources/application.yml` file with your database connection details:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/terrapin
    username: your_username
    password: your_password
```

3. Configure Stripe API key:

Update the `src/main/resources/application.yml` file with your Stripe API key:

```yaml
stripe:
  api-key: sk_test_yourkeyhere
  webhook-secret: whsec_yoursecrethere
```

### Building and Running

1. Build the application:

```bash
mvn clean package
```

2. Run the application:

```bash
java -jar target/terrapin-backend-0.1.0.jar
```

Alternatively, use Maven to run the application:

```bash
mvn spring-boot:run
```

The application will be available at `http://localhost:8080/api`.

## API Documentation

API documentation is available at `http://localhost:8080/api/swagger-ui.html` when the application is running.

### Main Endpoints

- **Products API**:
  - `GET /api/products`: Get all products
  - `GET /api/products/{id}`: Get product by ID
  - `GET /api/products/category/{category}`: Get products by category
  - `GET /api/products/search?keyword={keyword}`: Search products by keyword
  - `GET /api/products/{id}/related`: Get related products
  - `POST /api/products`: Create a new product
  - `PUT /api/products/{id}`: Update a product
  - `DELETE /api/products/{id}`: Delete a product

- **Orders API**:
  - `GET /api/orders`: Get all orders
  - `GET /api/orders/{id}`: Get order by ID
  - `GET /api/orders/customer/{email}`: Get orders by customer email
  - `GET /api/orders/status/{status}`: Get orders by status
  - `POST /api/orders/checkout`: Create a new order
  - `PATCH /api/orders/{id}/status`: Update order status

- **Payments API**:
  - `POST /api/payments/{paymentIntentId}/confirm`: Confirm a payment
  - `POST /api/payments/{paymentIntentId}/cancel`: Cancel a payment

## Development

### Profiles

- **dev**: For development, loads sample data, uses detailed logging
- **test**: For testing, uses H2 in-memory database
- **prod**: For production, optimized for performance

## Database Schema

- **products**: Stores product information including price, inventory, and images
- **cart_items**: Stores cart items with product reference and quantity
- **orders**: Stores order information with customer details and payment status

## Connecting with Frontend

The Spring Boot backend is designed to work with the React frontend. To connect:

1. Ensure the backend is running on `http://localhost:8080`
2. Configure the React frontend to make API requests to `http://localhost:8080/api`
3. CORS is already configured to allow requests from `http://localhost:3000`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request