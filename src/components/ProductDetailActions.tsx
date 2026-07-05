"use client";

import { useCartStore } from "@/store/cart";
import type { ProductDTO } from "@/lib/types";

export default function ProductDetailActions({ product }: { product: ProductDTO }) {
  const quantity = useCartStore(
    (s) => s.items.find((i) => i.productId === product.id)?.quantity ?? 0,
  );
  const addItem = useCartStore((s) => s.addItem);
  const setQuantity = useCartStore((s) => s.setQuantity);

  const packages = quantity / product.caseSize;
  const packagePrice = product.sellPrice * product.caseSize;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
      <div className="min-w-0 flex-1">
        <p className="text-lg font-bold">{packagePrice} ₽</p>
        {product.caseSize > 1 && (
          <p className="text-xs text-foreground/50">{product.sellPrice} ₽/шт</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand px-1.5 py-1.5 text-white shadow-sm">
        <button
          onClick={() => quantity > 0 && setQuantity(product.id, quantity - product.caseSize)}
          disabled={quantity === 0}
          aria-label={product.caseSize > 1 ? "Убавить упаковку" : "Убавить"}
          className="flex h-10 w-10 items-center justify-center rounded-full text-lg leading-none disabled:opacity-40 active:scale-90"
        >
          −
        </button>
        <span key={packages} className="w-6 animate-bounce-once text-center text-base font-semibold">
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
          className="flex h-10 w-10 items-center justify-center rounded-full text-lg leading-none active:scale-90"
        >
          +
        </button>
      </div>
    </div>
  );
}
