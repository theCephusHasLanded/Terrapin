# Setting Up Your E-Commerce Project

## GitHub Setup

After creating a repository on GitHub, connect your local repository and push the code:

```bash
# Add the GitHub repository as a remote
git remote add origin https://github.com/theCephusHasLanded/Terrapin.git

# Push your code to GitHub
git push -u origin main
```

## Database Setup with Supabase

Follow these steps to set up your database with Supabase:

1. **Create a Supabase account**:
   - Go to [Supabase](https://supabase.com/) and sign up or log in with GitHub

2. **Create a new project**:
   - Click "New Project"
   - Name your database (e.g., "terrapin-ecommerce")
   - Set a secure database password (save this!)
   - Select a region close to your users
   - Choose the free plan
   - Click "Create new project"

3. **Get your database connection string**:
   - Go to Settings > Database in the left sidebar
   - Find the "Connection string" section and select "URI" format
   - Copy the PostgreSQL connection string provided
   - Replace the password placeholder with your actual database password

4. **Configure your local environment**:
   - Create a `.env` file in your project root (if not already created)
   - Add your DATABASE_URL from Supabase:
     ```
     DATABASE_URL="postgresql://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres"
     ```

5. **Push your schema to Supabase**:
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