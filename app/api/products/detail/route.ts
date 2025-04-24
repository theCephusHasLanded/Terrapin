import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

// Alternative approach with simpler typing for a non-dynamic route
export async function GET(
  request: NextRequest
) {
  try {
    // Get ID from query parameter instead of path parameter
    const id = request.nextUrl.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

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