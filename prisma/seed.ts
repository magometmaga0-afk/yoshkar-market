import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { seedProducts, getMarkup } from "../src/lib/seedProducts";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Upsert by product name — never touches Order/OrderItem history.
  for (const p of seedProducts) {
    const data = {
      category: p.category,
      volumeMl: p.volumeMl,
      caseSize: p.caseSize,
      purchasePrice: p.purchasePrice,
      sellPrice: p.purchasePrice + (p.markup ?? getMarkup(p.category)),
      // imageUrl обновляется, только если задан в seedProducts — иначе не трогаем
      // то, что уже вручную выставлено в базе через админку.
      ...(p.imageUrl ? { imageUrl: p.imageUrl } : {}),
    };
    await prisma.product.upsert({
      where: { name: p.name },
      create: { name: p.name, ...data },
      update: data,
    });
  }
  console.log(`Синхронизировано товаров: ${seedProducts.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
