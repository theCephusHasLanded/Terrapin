# Supabase Database Setup Guide

This guide provides step-by-step instructions for setting up your Supabase PostgreSQL database for the Terrapin E-Commerce project.

## Why Supabase?

Supabase is an open-source Firebase alternative that offers:
- PostgreSQL database with a generous free tier
- Auth, storage, and serverless functions
- Real-time subscriptions
- REST and GraphQL APIs
- Simple dashboard interface

## Setup Process

### 1. Create a Supabase Account

1. Go to [Supabase](https://supabase.com/)
2. Sign up for an account or log in with GitHub
3. Verify your email if necessary

### 2. Create a New Project

1. From the Supabase dashboard, click "New Project"
2. Fill in the project details:
   - **Name**: `terrapin-ecommerce` (or your preferred name)
   - **Database Password**: Create a strong password and save it securely
   - **Region**: Choose the closest to your users or development location
   - **Pricing Plan**: Free tier (up to 2 projects)
3. Click "Create new project" and wait for the setup to complete (may take a few minutes)

### 3. Get Your Database Connection String

1. Once your project is created, go to Settings > Database in the left sidebar
2. In the "Connection string" section, select "URI" format
3. Copy the connection string that looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   ```
4. Replace `[YOUR-PASSWORD]` with the database password you created

### 4. Configure Your Local Environment

1. Create a `.env` file in your project root:
   ```
   DATABASE_URL="your-connection-string-from-supabase"
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

3. Push your schema to Supabase:
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

1. Check your Supabase dashboard under "Table Editor" to see the created tables
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Visit `http://localhost:3000` to make sure the products are being fetched correctly

### 8. Setting Up Production Environment Variables

When deploying to Vercel or another hosting platform:

1. Add your `DATABASE_URL` as an environment variable in your hosting platform
2. Ensure the database connection is properly configured for production

### 9. Database Management with Supabase

- **Table Editor**: Use Supabase's built-in table editor to manage your data
- **SQL Editor**: Write custom SQL queries directly in the Supabase dashboard
- **API Documentation**: Auto-generated API docs to interact with your database
- **Authentication**: Set up auth rules if you decide to add user authentication
- **Monitoring**: View logs and monitor performance in the dashboard

## Supabase-specific Features

If you want to enhance your app with additional Supabase features:

1. **Auth**: Implement authentication using Supabase Auth
2. **Storage**: Store product images in Supabase Storage
3. **Edge Functions**: Deploy serverless functions for backend logic
4. **Realtime**: Subscribe to database changes for real-time updates

## Troubleshooting

If you encounter any issues:

1. **Connection Issues**:
   - Verify your DATABASE_URL is correct
   - Check that your IP is allowed in Supabase dashboard (Settings > Database > Network)

2. **Schema Push Failures**:
   - Check your `schema.prisma` file for syntax errors
   - Verify that your Supabase project is fully initialized

3. **Seeding Issues**:
   - Check for errors in your seed script
   - Verify that your seed data matches your schema

For more help, refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma with PostgreSQL Guide](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/postgresql)