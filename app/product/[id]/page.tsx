import { notFound } from 'next/navigation';
import { prisma } from '../../lib/db';
import ProductDetail from './ProductDetail';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

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
      id: { not: product.id }
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