import { prisma } from "@/lib/prisma";
import type { ProductDTO } from "@/lib/types";

export const CATEGORY_LABEL: Record<ProductDTO["category"], string> = {
  BEER: "Пиво",
  ENERGY: "Энергетики",
  OTHER: "Напитки",
  SNACKS: "Снеки",
  COFFEE_TEA: "Чай и кофе",
  CANNED: "Консервы",
};

export const CATEGORY_TILE: Record<ProductDTO["category"], { emoji: string; gradient: string }> = {
  BEER: { emoji: "🍺", gradient: "from-amber-200 to-amber-100" },
  ENERGY: { emoji: "⚡", gradient: "from-violet-200 to-sky-100" },
  OTHER: { emoji: "🥤", gradient: "from-sky-200 to-cyan-100" },
  SNACKS: { emoji: "🍫", gradient: "from-orange-200 to-rose-100" },
  COFFEE_TEA: { emoji: "☕", gradient: "from-stone-200 to-amber-100" },
  CANNED: { emoji: "🥫", gradient: "from-emerald-200 to-lime-100" },
};

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
