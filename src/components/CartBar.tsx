"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart";

export default function CartBar() {
  const pathname = usePathname();
  const items = useCartStore((s) => s.items);

  const hidden = pathname.startsWith("/checkout") || pathname.startsWith("/admin");
  if (hidden) return null;

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  if (count === 0) return null;

  const total = items.reduce((sum, i) => sum + i.quantity * i.sellPrice, 0);

  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 animate-slide-up px-4 pt-2">
      <Link
        href="/checkout"
        className="mx-auto flex max-w-3xl items-center justify-between rounded-2xl bg-brand px-5 py-3.5 text-white shadow-lg shadow-brand/30 transition duration-200 hover:brightness-105 active:scale-[0.98]"
      >
        <span className="flex items-center gap-2 font-medium">
          <span
            key={count}
            className="flex h-6 w-6 animate-bounce-once items-center justify-center rounded-full bg-white/25 text-xs font-bold"
          >
            {count}
          </span>
          В корзине
        </span>
        <span className="font-semibold">{total} ₽ · Оформить →</span>
      </Link>
    </div>
  );
}
