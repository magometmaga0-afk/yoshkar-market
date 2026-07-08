"use client";

import { useMemo, useState, Fragment, type ReactNode } from "react";
import ProductCard from "@/components/ProductCard";
import { CATEGORY_LABEL } from "@/lib/productCategory";
import type { ProductDTO } from "@/lib/types";

type TabKey = "ALL" | "BEER" | "ENERGY" | "OTHER" | "SNACKS" | "COFFEE_TEA" | "CANNED" | "GROCERY" | "PET_SUPPLIES" | "PRODUCE";

const TABS: { key: TabKey; label: string; emoji: string }[] = [
  { key: "ALL", label: "Всё", emoji: "🛒" },
  // Пиво временно скрыто (юридические причины) — не удалено, просто закомментировано.
  // { key: "BEER", label: "Пиво", emoji: "🍺" },
  { key: "ENERGY", label: "Энергетики", emoji: "⚡" },
  { key: "OTHER", label: "Напитки", emoji: "🥤" },
  { key: "SNACKS", label: "Снеки", emoji: "🍫" },
  { key: "COFFEE_TEA", label: "Чай и кофе", emoji: "☕" },
  { key: "CANNED", label: "Консервы", emoji: "🥫" },
  { key: "GROCERY", label: "Бакалея", emoji: "🌾" },
  { key: "PET_SUPPLIES", label: "Зоотовары", emoji: "🐾" },
  { key: "PRODUCE", label: "Фрукты и овощи", emoji: "🍑" },
];

function normalize(s: string): string {
  return s.toLowerCase().replace(/ё/g, "е");
}

// Доп. слова-синонимы на случай, если склонение не совпадает с названием категории
// подстрокой (например, "напиток" не входит в "Напитки" как подстрока).
const CATEGORY_SEARCH_ALIASES: Partial<Record<TabKey, string[]>> = {
  ENERGY: ["энергетик", "энергетический"],
  OTHER: ["напиток", "сок", "вода", "газировка", "лимонад"],
  SNACKS: ["снек", "чипсы", "шоколад", "конфеты", "сладост"],
  COFFEE_TEA: ["чай", "кофе"],
  CANNED: ["консерв", "тушенка", "рыбные консервы"],
  GROCERY: ["крупа", "крупы", "макароны"],
  PET_SUPPLIES: ["корм", "кошка", "кошек", "кот"],
  PRODUCE: ["фрукт", "овощ"],
};

function categoryMatches(category: TabKey, q: string): boolean {
  const label = normalize(CATEGORY_LABEL[category as keyof typeof CATEGORY_LABEL] ?? "");
  if (label.includes(q)) return true;
  const aliases = CATEGORY_SEARCH_ALIASES[category] ?? [];
  return aliases.some((a) => normalize(a).includes(q) || q.includes(normalize(a)));
}

function HighlightedName({ name, query }: { name: string; query: string }) {
  if (!query) return <>{name}</>;
  const nName = normalize(name);
  const nQuery = normalize(query);
  const parts: ReactNode[] = [];
  let cursor = 0;
  let idx = nName.indexOf(nQuery, cursor);
  if (idx === -1) return <>{name}</>;
  let key = 0;
  while (idx !== -1) {
    if (idx > cursor) parts.push(<Fragment key={key++}>{name.slice(cursor, idx)}</Fragment>);
    parts.push(
      <mark key={key++} className="rounded-sm bg-brand/20 text-inherit">
        {name.slice(idx, idx + query.length)}
      </mark>,
    );
    cursor = idx + query.length;
    idx = nName.indexOf(nQuery, cursor);
  }
  if (cursor < name.length) parts.push(<Fragment key={key++}>{name.slice(cursor)}</Fragment>);
  return <>{parts}</>;
}

export default function Catalog({ products }: { products: ProductDTO[] }) {
  const [tab, setTab] = useState<TabKey>("ALL");
  const [query, setQuery] = useState("");

  const isSearching = query.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = normalize(query.trim());
    return products.filter(
      (p) => normalize(p.name).includes(q) || categoryMatches(p.category as TabKey, q),
    );
  }, [products, query, isSearching]);

  const groupedResults = useMemo(() => {
    if (!isSearching) return [];
    const byCategory = new Map<string, ProductDTO[]>();
    for (const p of searchResults) {
      const list = byCategory.get(p.category) ?? [];
      list.push(p);
      byCategory.set(p.category, list);
    }
    return TABS.filter((t) => t.key !== "ALL" && byCategory.has(t.key)).map((t) => ({
      key: t.key,
      label: CATEGORY_LABEL[t.key as keyof typeof CATEGORY_LABEL],
      items: byCategory.get(t.key)!,
    }));
  }, [searchResults, isSearching]);

  const filtered = useMemo(
    () => (tab === "ALL" ? products : products.filter((p) => p.category === tab)),
    [products, tab],
  );

  return (
    <div>
      <div className="sticky top-[57px] z-30 -mx-4 space-y-2.5 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-none">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="9" cy="9" r="6.5" />
            <path d="M18 18l-4.5-4.5" />
          </svg>
          <input
            type="text"
            inputMode="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Найти товар..."
            className="w-full rounded-full border border-border bg-white py-2.5 pl-10 pr-10 text-sm outline-none transition focus:border-brand"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Очистить поиск"
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-foreground/40 transition hover:bg-foreground/5 hover:text-foreground/70"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>
          )}
        </div>

        <div
          className={`flex gap-2 overflow-x-auto transition-opacity [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
            isSearching ? "pointer-events-none opacity-40" : "opacity-100"
          }`}
        >
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              disabled={isSearching}
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
        {isSearching ? (
          searchResults.length === 0 ? (
            <div className="py-14 text-center">
              <p className="text-3xl">🔍</p>
              <p className="mt-3 font-medium text-foreground/70">Ничего не нашлось по запросу «{query}»</p>
              <p className="mt-1 text-sm text-foreground/50">Проверьте, нет ли опечатки, или попробуйте другое слово</p>
            </div>
          ) : (
            <div className="space-y-6">
              {groupedResults.map((group) => (
                <div key={group.key}>
                  <h2 className="mb-3 text-sm font-semibold text-foreground/70">
                    {group.label} <span className="text-foreground/40">· {group.items.length}</span>
                  </h2>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {group.items.map((p) => (
                      <ProductCard key={p.id} product={p} nameOverride={<HighlightedName name={p.name} query={query} />} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        ) : filtered.length === 0 ? (
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
