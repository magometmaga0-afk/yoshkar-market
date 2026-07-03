import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { seedProducts, MARKUP } from "../src/lib/seedProducts";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();

  for (const p of seedProducts) {
    await prisma.product.create({
      data: {
        name: p.name,
        category: p.category,
        volumeMl: p.volumeMl,
        purchasePrice: p.purchasePrice,
        sellPrice: p.purchasePrice + MARKUP,
      },
    });
  }
  console.log(`Создано товаров: ${seedProducts.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
