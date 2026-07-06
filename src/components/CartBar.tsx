"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/formatPrice";

export default function CartBar() {
  const pathname = usePathname();
  const items = useCartStore((s) => s.items);

  const hidden =
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/product");
  if (hidden) return null;

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  if (count === 0) return null;

  const total = items.reduce((sum, i) => sum + i.quantity * i.sellPrice, 0);

  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 animate-slide-up px-4 pt-2">
      <Link
        href="/checkout"
        className="mx-auto flex max-w-3xl items-center justify-between gap-1.5 rounded-2xl bg-brand px-3 py-3.5 text-sm text-white shadow-lg shadow-brand/30 transition duration-200 hover:brightness-105 active:scale-[0.98] sm:text-base"
      >
        <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap font-medium">
          <span
            key={count}
            className="flex h-6 w-6 shrink-0 animate-bounce-once items-center justify-center rounded-full bg-white/25 text-xs font-bold"
          >
            {count}
          </span>
          В корзине
        </span>
        <span className="whitespace-nowrap font-semibold">{formatPrice(total)} ₽ Оформить →</span>
      </Link>
    </div>
  );
}
