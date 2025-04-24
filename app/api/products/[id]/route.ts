import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

interface RouteContext {
  params: {
    id: string;
  };
}

// Updated to match Next.js App Router route handler pattern
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const productId = context.params.id;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Format product for API response
    const formattedProduct = {
      ...product,
      price: parseFloat(product.price.toString()), // Convert Decimal to number
    };

    return NextResponse.json(formattedProduct);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}