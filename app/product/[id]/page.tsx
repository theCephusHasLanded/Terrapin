import { notFound } from 'next/navigation';
import { prisma } from '../../lib/db';
import ProductDetail from './ProductDetail';

// In Next.js 15, params is a Promise that needs to be awaited
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id: idParam } = resolvedParams;

  // Convert string ID to BigInt for Prisma
  const id = BigInt(idParam);

  // Fetch the product from the database
  const product = await prisma.product.findUnique({
    where: { id }
  });

  // If product not found, show 404 page
  if (!product) {
    notFound();
  }

  // Map the product to include price as a number for client components
  const mappedProduct = {
    ...product,
    price: parseFloat(product.price.toString())
  };

  // Fetch related products in the same category
  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: id } // Already converted to BigInt above
    },
    take: 4
  });

  // Map the products to include price as a number for client components
  const mappedRelatedProducts = relatedProducts.map(product => ({
    ...product,
    price: parseFloat(product.price.toString())
  }));

  return <ProductDetail product={mappedProduct} relatedProducts={mappedRelatedProducts} />;
}