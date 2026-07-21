import { prisma } from "@/lib/prisma";
import Catalog from "@/components/Catalog";
import type { ProductDTO } from "@/lib/types";

// Каталог кэшируется на 15 секунд — под нагрузкой (много одновременных
// заходов) отдаётся готовая страница без обращения к базе на каждый запрос.
// Изменения в товарах (админка) появляются на сайте с задержкой до 15 сек.
export const revalidate = 15;

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { inStock: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  const dto: ProductDTO[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    volumeMl: p.volumeMl,
    weightGrams: p.weightGrams,
    packCount: p.packCount,
    sellPrice: Number(p.sellPrice),
    // Всё, кроме пива, продаётся поштучно покупателю, даже если закупается
    // коробками — реальный размер упаковки виден только в админке.
    caseSize: p.category !== "BEER" ? 1 : p.caseSize,
    imageUrl: p.imageUrl,
    description: p.description,
    calories: p.calories,
    protein: p.protein,
    fat: p.fat,
    carbs: p.carbs,
    fiber: p.fiber,
    moisture: p.moisture,
    inStock: p.inStock,
  }));

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 pb-28 md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
      <Catalog products={dto} />
    </main>
  );
}
