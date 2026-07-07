"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import type { ProductDTO } from "@/lib/types";
import { CATEGORY_TILE } from "@/lib/productCategory";
import { formatPrice } from "@/lib/formatPrice";

export default function ProductCard({ product }: { product: ProductDTO }) {
  const quantity = useCartStore(
    (s) => s.items.find((i) => i.productId === product.id)?.quantity ?? 0,
  );
  const addItem = useCartStore((s) => s.addItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const tile = CATEGORY_TILE[product.category];
  const hasPhoto = Boolean(product.imageUrl);

  const packages = quantity / product.caseSize;
  const packagePrice = product.sellPrice * product.caseSize;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md">
      <Link href={`/product/${product.id}`} className="contents">
        <div
          className={`relative aspect-square w-full ${
            hasPhoto ? "bg-white" : `bg-gradient-to-br ${tile.gradient}`
          }`}
        >
          {hasPhoto ? (
            <Image
              src={product.imageUrl!}
              alt={product.name}
              fill
              sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, (max-width: 1279px) 25vw, (max-width: 1535px) 20vw, 16vw"
              className="object-contain p-3"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-5xl">
              {tile.emoji}
            </span>
          )}
          <div className="absolute inset-x-1.5 top-1.5 flex flex-wrap items-start justify-between gap-1">
            {product.volumeMl && (
              <span className="rounded-full border border-border bg-white/90 px-2 py-0.5 text-[11px] font-medium text-foreground/70 shadow-sm">
                {product.volumeMl} мл
              </span>
            )}
            {product.caseSize > 1 && (
              <span className="rounded-full border border-border bg-white/90 px-2 py-0.5 text-[11px] font-medium text-foreground/70 shadow-sm">
                уп. {product.caseSize} шт
              </span>
            )}
          </div>
        </div>

        <div className="px-3 pt-3">
          <h3 className="line-clamp-2 min-h-[2.5em] text-sm font-medium leading-tight">
            {product.name}
          </h3>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 px-3 pb-3">
        <div className="mt-auto space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-bold">{formatPrice(packagePrice)} ₽</span>
            {product.caseSize > 1 && (
              <span className="text-xs text-foreground/50">{formatPrice(product.sellPrice)} ₽/шт</span>
            )}
          </div>

          <div className="flex items-center justify-end">
            <div className="flex shrink-0 items-center gap-1 rounded-full bg-brand px-1 py-1 text-white shadow-sm">
              <button
                onClick={() => quantity > 0 && setQuantity(product.id, quantity - product.caseSize)}
                disabled={quantity === 0}
                aria-label={product.caseSize > 1 ? "Убавить упаковку" : "Убавить"}
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
                        imageUrl: product.imageUrl,
                      },
                      product.caseSize,
                    );
                  } else {
                    setQuantity(product.id, quantity + product.caseSize);
                  }
                }}
                aria-label={product.caseSize > 1 ? "Добавить упаковку" : "Добавить"}
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
