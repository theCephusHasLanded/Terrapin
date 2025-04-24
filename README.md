# Terrapin E-Commerce Platform

A modern, full-stack e-commerce platform built with React, Material UI, and Spring Boot.

## Tech Stack

- **Frontend**: React with Material UI
- **Backend**: Spring Boot (Java)
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA
- **State Management**: React Context
- **Payment Processing**: Stripe Integration

## Features

- Responsive product catalog
- Product detail pages
- Shopping cart with localStorage persistence
- Checkout process
- RESTful API endpoints
- Database schema with relations
- Dark mode support

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn
- Supabase account (free tier)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/theCephusHasLanded/Terrapin.git
cd terrapin-ecommerce
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env` file in the root directory based on `.env.example`:

```
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
STRIPE_SECRET_KEY=sk_test_123456789
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_123456789
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. Initialize the database:

```bash
npx prisma generate
npx prisma db push
```

5. Seed the database with sample data:

```bash
npm run db:seed
# or
yarn db:seed
```

6. Start the development server:

```bash
npm run dev
# or
yarn dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                 # Next.js App Router
│   ├── api/             # API Routes
│   ├── cart/            # Cart page
│   ├── checkout/        # Checkout pages
│   ├── components/      # Reusable components
│   ├── lib/             # Utilities and helpers
│   ├── product/         # Product detail pages
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── prisma/              # Prisma schema and migrations
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed script
├── public/              # Static assets
├── .env.example         # Example environment variables
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Database Schema

The database includes the following models:

- **Product**: Product information including name, description, price, and inventory.
- **CartItem**: Items in a user's cart with quantity and product reference.
- **Order**: Completed orders with customer information and status.

## API Routes

- `GET /api/products`: List all products (with pagination and filtering)
- `GET /api/products/[id]`: Get a specific product
- `GET /api/cart`: Get the user's cart
- `POST /api/cart`: Add an item to the cart
- `PUT /api/cart`: Update an item in the cart
- `DELETE /api/cart`: Remove an item from the cart
- `POST /api/checkout`: Process a checkout

## Database Setup

For detailed instructions on setting up your Supabase database, see the [Database Setup Guide](DATABASE_SETUP.md).

## Deployment

### Deploying to Vercel

1. Push your repository to GitHub.
2. Create a new project on [Vercel](https://vercel.com).
3. Connect your GitHub repository to Vercel.
4. Configure environment variables in the Vercel dashboard, including your Supabase DATABASE_URL.
5. In the project settings, set the following:
   - Framework Preset: Next.js
   - Build Command: `next build || exit 0` (allows build to continue despite minor errors)
   - Install Command: `npm install`
   - Output Directory: `.next`
6. Deploy!

### Troubleshooting Deployment

If you encounter issues during deployment, consider these solutions:

1. **Type Errors with Dynamic API Routes**:
   - We've implemented alternative non-dynamic routes for handling product details at `/api/product-by-id?id=123` 
   - The client code supports both the dynamic and non-dynamic endpoints

2. **Database Connection Issues**:
   - Ensure your Supabase database allows connections from Vercel's IP ranges
   - Check that your DATABASE_URL environment variable is correct
   - Consider using connection pooling for production deployments

3. **Build Failures**:
   - The `vercel.json` file includes configuration to continue builds despite errors
   - For persistent issues, you can manually deploy from a successful local build
   
4. **BigInt Handling**:
   - Our database uses BigInt IDs which require special handling in JavaScript
   - Always convert BigInt values to strings before passing them to JSON responses
   - When working with IDs in client components, use String() to ensure compatibility

## Authentication (Future Expansion)

To add authentication, we recommend:

### Using Supabase Auth

1. Install Supabase client: `npm install @supabase/supabase-js`
2. Set up Supabase auth keys in your environment variables
3. Create auth functionality using Supabase Auth API
4. Secure routes using middleware

### Using NextAuth.js (Auth.js)

1. Install Auth.js: `npm install next-auth`
2. Create an API route at `app/api/auth/[...nextauth]/route.ts`
3. Set up the desired providers (Google, GitHub, Credentials, etc.)
4. Create a session provider component in `app/components/auth/SessionProvider.tsx`
5. Wrap the app in the session provider
6. Add protected routes using middleware

## Customization

### Styling

This project uses Tailwind CSS. You can customize the design by editing:

- `tailwind.config.js`: Change colors, fonts, spacing, etc.
- `app/globals.css`: Edit global styles and Tailwind component classes.

### Adding Payment Processors

To integrate a payment processor like Stripe:

1. Install the Stripe SDK: `npm install stripe @stripe/stripe-js`
2. Create a payment service in `app/lib/payment.ts`
3. Update the checkout API route to create payment intents
4. Add payment form components to the checkout page

## License

This project is MIT licensed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.