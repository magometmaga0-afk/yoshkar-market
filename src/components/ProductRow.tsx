"use client";

import { useState, useTransition } from "react";
import { toggleProductStock, updateProductPrices } from "@/app/actions/admin";

type Product = {
  id: string;
  name: string;
  category: string;
  volumeMl: number | null;
  caseSize: number;
  purchasePrice: number;
  sellPrice: number;
  imageUrl: string | null;
  inStock: boolean;
};

export default function ProductRow({
  product,
  categoryLabel,
}: {
  product: Product;
  categoryLabel: string;
}) {
  const [caseSize, setCaseSize] = useState(String(product.caseSize));
  const [purchasePrice, setPurchasePrice] = useState(String(product.purchasePrice));
  const [sellPrice, setSellPrice] = useState(String(product.sellPrice));
  const [imageUrl, setImageUrl] = useState(product.imageUrl ?? "");
  const [isPending, startTransition] = useTransition();

  const dirty =
    caseSize !== String(product.caseSize) ||
    purchasePrice !== String(product.purchasePrice) ||
    sellPrice !== String(product.sellPrice) ||
    imageUrl !== (product.imageUrl ?? "");

  return (
    <tr className="border-b border-black/10 last:border-b-0 dark:border-white/10">
      <td className="px-3 py-2">{product.name}</td>
      <td className="px-3 py-2 text-black/50 dark:text-white/50">{categoryLabel}</td>
      <td className="px-3 py-2 text-black/50 dark:text-white/50">
        {product.volumeMl ? `${product.volumeMl} мл` : "—"}
      </td>
      <td className="px-3 py-2">
        <input
          type="number"
          value={caseSize}
          onChange={(e) => setCaseSize(e.target.value)}
          className="w-16 rounded border border-black/10 bg-transparent px-2 py-1 dark:border-white/10"
        />
      </td>
      <td className="px-3 py-2">
        <input
          type="number"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          className="w-20 rounded border border-black/10 bg-transparent px-2 py-1 dark:border-white/10"
        />
      </td>
      <td className="px-3 py-2">
        <input
          type="number"
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
          className="w-20 rounded border border-black/10 bg-transparent px-2 py-1 dark:border-white/10"
        />
      </td>
      <td className="px-3 py-2">
        <input
          type="url"
          value={imageUrl}
          placeholder="Ссылка на фото"
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-40 rounded border border-black/10 bg-transparent px-2 py-1 dark:border-white/10"
        />
      </td>
      <td className="px-3 py-2">
        <input
          type="checkbox"
          checked={product.inStock}
          disabled={isPending}
          onChange={(e) => {
            const next = e.target.checked;
            startTransition(() => {
              toggleProductStock(product.id, next);
            });
          }}
        />
      </td>
      <td className="px-3 py-2">
        {dirty && (
          <button
            disabled={isPending}
            onClick={() => {
              const size = Number(caseSize);
              const purchase = Number(purchasePrice);
              const sell = Number(sellPrice);
              if (!Number.isFinite(size) || size < 1) return;
              if (!Number.isFinite(purchase) || !Number.isFinite(sell)) return;
              startTransition(() => {
                updateProductPrices(product.id, purchase, sell, imageUrl, size);
              });
            }}
            className="rounded bg-black px-2 py-1 text-xs font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black"
          >
            Сохранить
          </button>
        )}
      </td>
    </tr>
  );
}
