import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { seedProducts, getMarkup, computeSellPrice } from "../src/lib/seedProducts";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Upsert by product name — never touches Order/OrderItem history.
  for (const p of seedProducts) {
    const data = {
      category: p.category,
      volumeMl: p.volumeMl,
      weightGrams: p.weightGrams ?? null,
      caseSize: p.caseSize,
      purchasePrice: p.purchasePrice,
      sellPrice: computeSellPrice(p.purchasePrice, p.markup ?? getMarkup(p.category)),
      // imageUrl/description/КБЖУ обновляются, только если заданы в seedProducts —
      // иначе не трогаем то, что уже вручную выставлено в базе через админку.
      ...(p.imageUrl ? { imageUrl: p.imageUrl } : {}),
      ...(p.description ? { description: p.description } : {}),
      ...(p.calories != null ? { calories: p.calories } : {}),
      ...(p.protein != null ? { protein: p.protein } : {}),
      ...(p.fat != null ? { fat: p.fat } : {}),
      ...(p.carbs != null ? { carbs: p.carbs } : {}),
    };
    const existing = await prisma.product.findFirst({ where: { name: p.name, volumeMl: p.volumeMl } });
    if (existing) {
      await prisma.product.update({ where: { id: existing.id }, data });
    } else {
      await prisma.product.create({ data: { name: p.name, ...data } });
    }
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