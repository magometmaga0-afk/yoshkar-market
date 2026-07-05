import type { ProductDTO } from "@/lib/types";

export const CATEGORY_LABEL: Record<ProductDTO["category"], string> = {
  BEER: "Пиво",
  ENERGY: "Энергетики",
  OTHER: "Напитки",
  SNACKS: "Снеки",
  COFFEE_TEA: "Чай и кофе",
  CANNED: "Консервы",
  GROCERY: "Бакалея",
  PET_SUPPLIES: "Зоотовары",
};

export const CATEGORY_TILE: Record<ProductDTO["category"], { emoji: string; gradient: string }> = {
  BEER: { emoji: "🍺", gradient: "from-amber-200 to-amber-100" },
  ENERGY: { emoji: "⚡", gradient: "from-violet-200 to-sky-100" },
  OTHER: { emoji: "🥤", gradient: "from-sky-200 to-cyan-100" },
  SNACKS: { emoji: "🍫", gradient: "from-orange-200 to-rose-100" },
  COFFEE_TEA: { emoji: "☕", gradient: "from-stone-200 to-amber-100" },
  CANNED: { emoji: "🥫", gradient: "from-emerald-200 to-lime-100" },
  GROCERY: { emoji: "🌾", gradient: "from-yellow-200 to-lime-100" },
  PET_SUPPLIES: { emoji: "🐾", gradient: "from-orange-100 to-amber-50" },
};
