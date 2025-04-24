import { NextResponse } from 'next/server';
import { prisma } from '../../lib/db';

// Simple, non-dynamic route that uses query parameters instead
export async function GET(request: Request) {
  try {
    // Get ID from query parameter instead of path parameter
    const url = new URL(request.url);
    const idParam = url.searchParams.get('id');
    
    if (!idParam) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Convert string ID to BigInt for Prisma
    const id = BigInt(idParam);

    const product = await prisma.product.findUnique({
      where: { id },
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