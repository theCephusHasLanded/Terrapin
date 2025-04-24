import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/db';

export async function GET(request: NextRequest) {
  try {
    // Get URL parameters
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit') as string) : undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
    const pageSize = limit || 10;
    const skip = (page - 1) * pageSize;

    // Build the query
    const where = category ? { category } : {};

    // Fetch products
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        take: pageSize,
        skip,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.product.count({ where }),
    ]);

    // Format products for API response
    const formattedProducts = products.map(product => ({
      ...product,
      price: parseFloat(product.price.toString()), // Convert Decimal to number
    }));

    // Calculate pagination info
    const totalPages = Math.ceil(total / pageSize);
    
    return NextResponse.json({
      products: formattedProducts,
      pagination: {
        total,
        page,
        pageSize,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}