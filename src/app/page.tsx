import { prisma } from "@/lib/prisma";
import Catalog from "@/components/Catalog";
import type { ProductDTO } from "@/lib/types";

export const dynamic = "force-dynamic";

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
    sellPrice: Number(p.sellPrice),
    // Снеки продаются поштучно покупателю, даже если закупаются коробками —
    // реальный размер упаковки для закупки виден только в админке.
    caseSize: p.category === "SNACKS" ? 1 : p.caseSize,
    imageUrl: p.imageUrl,
    inStock: p.inStock,
  }));

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 pb-28 md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
      <Catalog products={dto} />
    </main>
  );
}
