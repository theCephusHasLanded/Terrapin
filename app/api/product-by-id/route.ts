import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/db';

// Non-dynamic route that uses query parameters
export async function GET(request: NextRequest) {
  try {
    // Get ID from query parameter
    const idParam = request.nextUrl.searchParams.get('id');
    
    if (!idParam) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Convert string ID to BigInt for Prisma
    try {
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
    } catch (e) {
      return NextResponse.json({ error: 'Invalid product ID format' }, { status: 400 });
    }
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}