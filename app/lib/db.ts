import { PrismaClient } from '@prisma/client';

// This approach helps prevent multiple PrismaClient instances during development
// and also handles reconnection issues during builds

// Solution for the "prepared statement already exists" error
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
    // Add connection pool configuration for better stability
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = global as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// Create a new PrismaClient if one doesn't exist already, or use the existing one
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Save PrismaClient on the global object in development
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Handle clean disconnection of Prisma Client
// Create a simple cleanup function
const cleanupPrisma = async () => {
  if (globalForPrisma.prisma) {
    await globalForPrisma.prisma.$disconnect();
  }
};

// Register it for various termination events
if (process.env.NODE_ENV !== 'production') {
  process.on('beforeExit', cleanupPrisma);
  process.on('exit', cleanupPrisma);
}