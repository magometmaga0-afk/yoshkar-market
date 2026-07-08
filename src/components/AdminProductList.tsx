"use client";

import { useMemo, useState } from "react";
import ProductRow from "@/components/ProductRow";

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

export default function AdminProductList({
  products,
  categoryLabels,
}: {
  products: Product[];
  categoryLabels: Record<string, string>;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [products, query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск товара по названию..."
        className="mb-3 w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm outline-none focus:border-brand"
      />

      <h2 className="mb-3 font-semibold">
        Товары ({filtered.length}{filtered.length !== products.length ? ` из ${products.length}` : ""})
      </h2>
      <div className="space-y-2.5 pb-6">
        {filtered.map((p) => (
          <ProductRow key={p.id} product={p} categoryLabel={categoryLabels[p.category]} />
        ))}
      </div>
    </div>
  );
}
