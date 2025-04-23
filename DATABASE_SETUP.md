# PlanetScale Database Setup Guide

This guide provides step-by-step instructions for setting up your PlanetScale database for the Terrapin E-Commerce project.

## Why PlanetScale?

PlanetScale is a serverless MySQL platform that offers:
- Automatic scaling
- Branching for database changes
- Developer-friendly workflows
- High performance and reliability

## Setup Process

### 1. Create a PlanetScale Account

1. Go to [PlanetScale](https://planetscale.com/)
2. Sign up for an account or log in
3. Verify your email if necessary

### 2. Create a New Database

1. From the PlanetScale dashboard, click "New Database"
2. Fill in the database details:
   - **Name**: `terrapin-ecommerce` (or your preferred name)
   - **Region**: Choose the closest to your users or development location
   - **Plan**: Select the free plan for development or an appropriate paid plan for production
3. Click "Create"

### 3. Get Your Database Connection String

1. Once your database is created, click on it in the dashboard
2. Click "Connect" button
3. Select "Connect with Prisma"
4. PlanetScale will display a connection string like:
   ```
   DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/your-database-name?sslaccept=strict"
   ```
5. Copy this connection string

### 4. Configure Your Local Environment

1. Create a `.env` file in your project root:
   ```
   DATABASE_URL="your-connection-string-from-planetscale"
   ```
2. Make sure this file is in your `.gitignore` (it should be already)

### 5. Generate Prisma Client and Push Schema

1. Install dependencies if you haven't already:
   ```bash
   npm install
   ```

2. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

3. Push your schema to PlanetScale:
   ```bash
   npx prisma db push
   ```
   This creates all the tables defined in your `schema.prisma` file.

### 6. Seed Your Database

Populate your database with sample data:

```bash
npm run db:seed
```

This runs the seed script defined in `prisma/seed.ts` which creates sample products.

### 7. Verify Your Database Setup

1. Check your PlanetScale dashboard to see the created tables
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Visit `http://localhost:3000` to make sure the products are being fetched correctly

### 8. Setting Up Production Environment Variables

When deploying to Vercel or another hosting platform:

1. Add your `DATABASE_URL` as an environment variable in your hosting platform
2. Ensure the database connection is properly configured for production

### 9. Database Management

- **Viewing Data**: Use the PlanetScale console to view your data or run queries
- **Schema Changes**: For production, use PlanetScale's branching workflow to make schema changes safely
- **Monitoring**: PlanetScale dashboard provides monitoring for your database

## Troubleshooting

If you encounter any issues:

1. **Connection Issues**:
   - Verify your DATABASE_URL is correct
   - Check that your IP is allowed (PlanetScale's free tier allows connections from anywhere)

2. **Schema Push Failures**:
   - Check your `schema.prisma` file for syntax errors
   - Verify that you're not trying to make breaking changes

3. **Seeding Issues**:
   - Check for errors in your seed script
   - Verify that your seed data matches your schema

For more help, refer to:
- [PlanetScale Documentation](https://planetscale.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)