import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { ProductDTO } from "@/lib/types";
import ProductDetailActions from "@/components/ProductDetailActions";
import ProductCard from "@/components/ProductCard";

const CATEGORY_LABEL: Record<ProductDTO["category"], string> = {
  BEER: "Пиво",
  ENERGY: "Энергетики",
  OTHER: "Напитки",
  SNACKS: "Снеки",
  COFFEE_TEA: "Чай и кофе",
  CANNED: "Консервы",
};

const CATEGORY_TILE: Record<ProductDTO["category"], { emoji: string; gradient: string }> = {
  BEER: { emoji: "🍺", gradient: "from-amber-200 to-amber-100" },
  ENERGY: { emoji: "⚡", gradient: "from-violet-200 to-sky-100" },
  OTHER: { emoji: "🥤", gradient: "from-sky-200 to-cyan-100" },
  SNACKS: { emoji: "🍫", gradient: "from-orange-200 to-rose-100" },
  COFFEE_TEA: { emoji: "☕", gradient: "from-stone-200 to-amber-100" },
  CANNED: { emoji: "🥫", gradient: "from-emerald-200 to-lime-100" },
};

function toDto(p: {
  id: string;
  name: string;
  category: ProductDTO["category"];
  volumeMl: number | null;
  sellPrice: unknown;
  caseSize: number;
  imageUrl: string | null;
  description: string | null;
  inStock: boolean;
}): ProductDTO {
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

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || !product.inStock) notFound();

  const related = await prisma.product.findMany({
    where: { category: product.category, inStock: true, id: { not: product.id } },
    orderBy: { name: "asc" },
    take: 8,
  });

  const dto = toDto(product);
  const tile = CATEGORY_TILE[dto.category];
  const hasPhoto = Boolean(dto.imageUrl);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-32 pt-4 lg:max-w-5xl">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60"
      >
        ← Назад в каталог
      </Link>

      <div className="lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-8">
        <div
          className={`relative aspect-square w-full overflow-hidden rounded-2xl border border-border ${
            hasPhoto ? "bg-white" : `bg-gradient-to-br ${tile.gradient}`
          }`}
        >
          {hasPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={dto.imageUrl!}
              alt={dto.name}
              className="absolute inset-0 h-full w-full object-contain p-6"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-8xl">
              {tile.emoji}
            </span>
          )}
        </div>

        <div className="mt-5 lg:mt-0">
          <p className="text-xs font-medium text-brand-dark">{CATEGORY_LABEL[dto.category]}</p>
          <h1 className="mt-1 text-xl font-bold leading-snug">{dto.name}</h1>

          <div className="mt-3 flex flex-wrap gap-2">
            {dto.volumeMl && (
              <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground/70">
                {dto.volumeMl} мл
              </span>
            )}
            {dto.caseSize > 1 && (
              <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground/70">
                уп. {dto.caseSize} шт
              </span>
            )}
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-card p-4">
            <h2 className="mb-1.5 text-sm font-semibold text-foreground/80">Описание</h2>
            <p className="text-sm leading-relaxed text-foreground/70">
              {dto.description?.trim() || "Описание для этого товара скоро появится."}
            </p>
          </div>

          <div className="mt-5 hidden lg:block">
            <ProductDetailActions product={dto} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 font-semibold">Что ещё пригодится</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={toDto(p)} />
            ))}
          </div>
        </div>
      )}

      <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 pt-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto max-w-lg">
          <ProductDetailActions product={dto} />
        </div>
      </div>
    </main>
  );
}
