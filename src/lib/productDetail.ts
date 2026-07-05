import { prisma } from "@/lib/prisma";
import type { ProductDTO } from "@/lib/types";

type RawProduct = {
  id: string;
  name: string;
  category: ProductDTO["category"];
  volumeMl: number | null;
  sellPrice: unknown;
  caseSize: number;
  imageUrl: string | null;
  description: string | null;
  inStock: boolean;
};

function toDto(p: RawProduct): ProductDTO {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    volumeMl: p.volumeMl,
    sellPrice: Number(p.sellPrice),
    caseSize: ["SNACKS", "COFFEE_TEA", "CANNED"].includes(p.category) ? 1 : p.caseSize,
    imageUrl: p.imageUrl,
    description: p.description,
    inStock: p.inStock,
  };
}

export async function getProductDetail(id: string) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || !product.inStock) return null;

  const related = await prisma.product.findMany({
    where: { category: product.category, inStock: true, id: { not: product.id } },
    orderBy: { name: "asc" },
    take: 8,
  });

  return { product: toDto(product), related: related.map(toDto) };
}
