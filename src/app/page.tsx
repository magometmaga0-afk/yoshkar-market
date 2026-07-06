import { prisma } from "@/lib/prisma";
import { Category } from "@/generated/prisma/client";
import Catalog from "@/components/Catalog";
import type { ProductDTO } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    // Пиво временно скрыто из каталога (юридические причины) — товары и код
    // не удалены, просто закомментированы/отфильтрованы. Чтобы вернуть, убрать
    // строку "category: { not: Category.BEER }" ниже.
    where: { inStock: true, category: { not: Category.BEER } },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  const dto: ProductDTO[] = products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    volumeMl: p.volumeMl,
    sellPrice: Number(p.sellPrice),
    // Снеки, чай/кофе, консервы, бакалея, зоотовары и фрукты/овощи продаются
    // поштучно покупателю, даже если закупаются коробками — реальный размер
    // упаковки виден только в админке.
    caseSize: ["SNACKS", "COFFEE_TEA", "CANNED", "GROCERY", "PET_SUPPLIES", "PRODUCE"].includes(p.category) ? 1 : p.caseSize,
    imageUrl: p.imageUrl,
    description: p.description,
    inStock: p.inStock,
  }));

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 pb-28 md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
      <Catalog products={dto} />
    </main>
  );
}
