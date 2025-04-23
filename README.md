# Terrapin E-Commerce Boilerplate

A modern, full-stack e-commerce boilerplate built with Next.js, TypeScript, Tailwind CSS, and Prisma.

## Tech Stack

- **Frontend**: Next.js with TypeScript and App Router
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PlanetScale (MySQL-compatible)
- **ORM**: Prisma
- **Deployment**: Vercel
- **State Management**: React Context
- **Payment Processing**: Stripe (placeholder integration)

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
- PlanetScale account (or any MySQL-compatible database)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/terrapin-ecommerce.git
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
DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/your-database-name?sslaccept=strict"
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

## Deployment

### Deploying to Vercel

1. Push your repository to GitHub.
2. Create a new project on [Vercel](https://vercel.com).
3. Connect your GitHub repository to Vercel.
4. Configure environment variables in the Vercel dashboard.
5. Deploy!

### Deploying to PlanetScale

1. Create a new database on [PlanetScale](https://planetscale.com).
2. Get your database connection string.
3. Add the connection string to your environment variables.
4. Run `npx prisma db push` to create the tables.
5. Run `npm run db:seed` to seed the database.

## Authentication (Future Expansion)

To add authentication, we recommend:

### Using NextAuth.js (Auth.js)

1. Install Auth.js: `npm install next-auth`
2. Create an API route at `app/api/auth/[...nextauth]/route.ts`
3. Set up the desired providers (Google, GitHub, Credentials, etc.)
4. Create a session provider component in `app/components/auth/SessionProvider.tsx`
5. Wrap the app in the session provider
6. Add protected routes using middleware

### Using Clerk

1. Install Clerk: `npm install @clerk/nextjs`
2. Add Clerk API keys to your environment variables
3. Create middleware to protect routes
4. Use Clerk's pre-built components for sign-in, sign-up, and user profile

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