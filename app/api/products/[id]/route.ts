import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

// Completely removing the context parameter and using a different approach
export async function GET(request: Request) {
  try {
    // Get URL parameters (we'll use this instead of path params)
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/');
    const id = pathParts[pathParts.length - 1]; // Get the ID from the path
    
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