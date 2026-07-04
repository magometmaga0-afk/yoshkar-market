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
  description: string | null;
  inStock: boolean;
};

function Field({
  label,
  value,
  onChange,
  type = "number",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-foreground/50">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-background px-2.5 py-2 text-sm outline-none focus:border-brand"
      />
    </label>
  );
}

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
  const [description, setDescription] = useState(product.description ?? "");
  const [isPending, startTransition] = useTransition();

  const dirty =
    caseSize !== String(product.caseSize) ||
    purchasePrice !== String(product.purchasePrice) ||
    sellPrice !== String(product.sellPrice) ||
    imageUrl !== (product.imageUrl ?? "") ||
    description !== (product.description ?? "");

  return (
    <div
      className={`rounded-2xl border p-3.5 shadow-sm transition ${
        product.inStock ? "border-border bg-card" : "border-border bg-foreground/[0.03] opacity-60"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{product.name}</p>
          <p className="text-xs text-foreground/50">
            {categoryLabel}
            {product.volumeMl ? ` · ${product.volumeMl} мл` : ""}
          </p>
        </div>
        <label className="flex shrink-0 items-center gap-1.5 text-xs text-foreground/60">
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
            className="h-4 w-4 accent-brand"
          />
          в наличии
        </label>
      </div>

      <div className="mb-2.5 grid grid-cols-3 gap-2">
        <Field label="Упаковка, шт" value={caseSize} onChange={setCaseSize} />
        <Field label="Закупка, ₽" value={purchasePrice} onChange={setPurchasePrice} />
        <Field label="Продажа, ₽" value={sellPrice} onChange={setSellPrice} />
      </div>
      <Field
        label="Ссылка на фото"
        value={imageUrl}
        onChange={setImageUrl}
        type="url"
        placeholder="/photo.jpg"
      />
      <label className="mt-2.5 block">
        <span className="mb-1 block text-xs text-foreground/50">Описание</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="Краткое описание товара для карточки"
          className="w-full rounded-xl border border-border bg-background px-2.5 py-2 text-sm outline-none focus:border-brand"
        />
      </label>

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
              updateProductPrices(product.id, purchase, sell, imageUrl, size, description);
            });
          }}
          className="mt-3 w-full rounded-xl bg-brand py-2 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-50"
        >
          Сохранить
        </button>
      )}
    </div>
  );
}
