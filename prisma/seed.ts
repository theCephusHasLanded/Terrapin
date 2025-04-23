import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete existing data
  await prisma.cartItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  // Create sample products
  const products = [
    {
      name: 'Organic Cotton T-Shirt',
      description: 'A soft, comfortable t-shirt made from 100% organic cotton.',
      price: 29.99,
      image: '/images/products/tshirt.jpg',
      category: 'clothing',
      inventory: 100,
    },
    {
      name: 'Ceramic Coffee Mug',
      description: 'Handcrafted ceramic coffee mug with a unique glazed finish.',
      price: 19.99,
      image: '/images/products/mug.jpg',
      category: 'home',
      inventory: 50,
    },
    {
      name: 'Wireless Bluetooth Headphones',
      description: 'Premium noise-cancelling headphones with 20-hour battery life.',
      price: 129.99,
      image: '/images/products/headphones.jpg',
      category: 'electronics',
      inventory: 25,
    },
    {
      name: 'Leather Wallet',
      description: 'Genuine leather wallet with multiple card slots and RFID protection.',
      price: 49.99,
      image: '/images/products/wallet.jpg',
      category: 'accessories',
      inventory: 75,
    },
    {
      name: 'Stainless Steel Water Bottle',
      description: 'Double-walled insulated water bottle that keeps drinks cold for 24 hours.',
      price: 34.99,
      image: '/images/products/bottle.jpg',
      category: 'home',
      inventory: 60,
    },
    {
      name: 'Organic Scented Candle',
      description: 'Hand-poured soy wax candle with essential oils and a 40-hour burn time.',
      price: 24.99,
      image: '/images/products/candle.jpg',
      category: 'home',
      inventory: 40,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });