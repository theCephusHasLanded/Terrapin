# Setting Up Your E-Commerce Project

## GitHub Setup

After creating a repository on GitHub, connect your local repository and push the code:

```bash
# Add the GitHub repository as a remote
git remote add origin https://github.com/YOUR_USERNAME/terrapin-ecommerce.git

# Push your code to GitHub
git push -u origin main
```

## Database Setup with PlanetScale

Follow these steps to set up your database with PlanetScale:

1. **Create a PlanetScale account**:
   - Go to [PlanetScale](https://planetscale.com/) and sign up or log in

2. **Create a new database**:
   - Click on "New Database"
   - Name your database (e.g., "terrapin-ecommerce")
   - Select a region close to your users
   - Click "Create"

3. **Get your database connection string**:
   - In your database dashboard, click "Connect"
   - Select "Connect with Prisma"
   - Copy the DATABASE_URL provided

4. **Configure your local environment**:
   - Create a `.env` file in your project root (if not already created)
   - Add your DATABASE_URL from PlanetScale:
     ```
     DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/your-database-name?sslaccept=strict"
     ```

5. **Push your schema to PlanetScale**:
   ```bash
   npm install
   npx prisma generate
   npx prisma db push
   ```

6. **Seed your database with initial data**:
   ```bash
   npm run db:seed
   ```

## Vercel Deployment

1. **Create a Vercel account** (if you don't have one):
   - Go to [Vercel](https://vercel.com/) and sign up

2. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

3. **Deploy your project**:
   ```bash
   vercel
   ```

4. **Set environment variables**:
   - In the Vercel dashboard, go to your project
   - Navigate to "Settings" > "Environment Variables"
   - Add your `DATABASE_URL` and any other required environment variables
   - Redeploy your project after adding environment variables

## Final Verification

After deploying, make sure to:

1. Visit your deployed app and verify all pages load correctly
2. Test the product listing and detail pages
3. Try adding items to the cart
4. Complete a test checkout process
5. Check that all API routes function properly

If you encounter any issues, check the logs in Vercel and make adjustments as needed.