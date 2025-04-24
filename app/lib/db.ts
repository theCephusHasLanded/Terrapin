import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// Create a new PrismaClient if one doesn't exist already
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  });

// Save PrismaClient on the global object in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Handle clean disconnection of Prisma Client
// This is especially important during build and development
if (process.env.NODE_ENV !== 'production') {
  // Handle graceful shutdown
  process.on('beforeExit', async () => {
    await prisma.$disconnect();
  });
}