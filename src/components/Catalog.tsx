"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { ProductDTO } from "@/lib/types";

const TABS: {
  key: "ALL" | "BEER" | "ENERGY" | "OTHER" | "SNACKS" | "COFFEE_TEA" | "CANNED" | "GROCERY";
  label: string;
  emoji: string;
}[] = [
  { key: "ALL", label: "Всё", emoji: "🛒" },
  { key: "BEER", label: "Пиво", emoji: "🍺" },
  { key: "ENERGY", label: "Энергетики", emoji: "⚡" },
  { key: "OTHER", label: "Напитки", emoji: "🥤" },
  { key: "SNACKS", label: "Снеки", emoji: "🍫" },
  { key: "COFFEE_TEA", label: "Чай и кофе", emoji: "☕" },
  { key: "CANNED", label: "Консервы", emoji: "🥫" },
  { key: "GROCERY", label: "Бакалея", emoji: "🌾" },
];

export default function Catalog({ products }: { products: ProductDTO[] }) {
  const [tab, setTab] = useState<
    "ALL" | "BEER" | "ENERGY" | "OTHER" | "SNACKS" | "COFFEE_TEA" | "CANNED" | "GROCERY"
  >("ALL");

  const filtered = useMemo(
    () => (tab === "ALL" ? products : products.filter((p) => p.category === tab)),
    [products, tab],
  );

  return (
    <div>
      <div className="sticky top-[57px] z-30 -mx-4 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-none">
        <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === t.key
                  ? "bg-brand text-white shadow-sm"
                  : "bg-white text-foreground/70 border border-border"
              }`}
            >
              <span>{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-foreground/50">Товаров пока нет.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
