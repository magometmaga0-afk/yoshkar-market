"use client";

import { useCartStore } from "@/store/cart";
import type { ProductDTO } from "@/lib/types";

const CATEGORY_TILE: Record<ProductDTO["category"], { emoji: string; gradient: string }> = {
  BEER: { emoji: "🍺", gradient: "from-amber-200 to-amber-100" },
  ENERGY: { emoji: "⚡", gradient: "from-violet-200 to-sky-100" },
  OTHER: { emoji: "🥤", gradient: "from-sky-200 to-cyan-100" },
};

export default function ProductCard({ product }: { product: ProductDTO }) {
  const quantity = useCartStore(
    (s) => s.items.find((i) => i.productId === product.id)?.quantity ?? 0,
  );
  const addItem = useCartStore((s) => s.addItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const tile = CATEGORY_TILE[product.category];

  const packages = quantity / product.caseSize;
  const packagePrice = product.sellPrice * product.caseSize;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md">
      <div className={`relative aspect-square w-full bg-gradient-to-br ${tile.gradient}`}>
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-contain p-3"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-5xl">
            {tile.emoji}
          </span>
        )}
        {product.volumeMl && (
          <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-foreground/70 shadow-sm">
            {product.volumeMl} мл
          </span>
        )}
        <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-medium text-foreground/70 shadow-sm">
          уп. {product.caseSize} шт
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-2 min-h-[2.5em] text-sm font-medium leading-tight">
          {product.name}
        </h3>

        <div className="mt-auto space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold">{packagePrice} ₽</span>
            <span className="text-xs text-foreground/50">{product.sellPrice} ₽/шт</span>
          </div>

          <div className="flex items-center justify-end">
            <div className="flex shrink-0 items-center gap-1 rounded-full bg-brand px-1 py-1 text-white shadow-sm">
              <button
                onClick={() => quantity > 0 && setQuantity(product.id, quantity - product.caseSize)}
                disabled={quantity === 0}
                aria-label="Убавить упаковку"
                className="flex h-8 w-8 items-center justify-center rounded-full text-base leading-none disabled:opacity-40 active:scale-90"
              >
                −
              </button>
              <span key={packages} className="w-4 animate-bounce-once text-center text-sm font-semibold">
                {packages}
              </span>
              <button
                onClick={() => {
                  if (quantity === 0) {
                    addItem(
                      {
                        productId: product.id,
                        name: product.name,
                        sellPrice: product.sellPrice,
                        volumeMl: product.volumeMl,
                        category: product.category,
                        caseSize: product.caseSize,
                      },
                      product.caseSize,
                    );
                  } else {
                    setQuantity(product.id, quantity + product.caseSize);
                  }
                }}
                aria-label="Добавить упаковку"
                className="flex h-8 w-8 items-center justify-center rounded-full text-base leading-none active:scale-90"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
