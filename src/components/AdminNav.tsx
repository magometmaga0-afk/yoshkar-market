"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLogout } from "@/app/actions/admin";

const TABS = [
  { href: "/admin", label: "Заказы" },
  { href: "/admin/products", label: "Товары" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 -mx-4 mb-6 border-b border-border bg-white/90 px-4 backdrop-blur-md safe-top">
      <div className="mx-auto flex max-w-4xl items-center justify-between py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icon-mark.png" alt="" className="h-full w-full object-cover" />
          </span>
          <p className="text-[15px] font-bold leading-none text-foreground">Админка</p>
        </div>
        <form action={adminLogout}>
          <button
            type="submit"
            className="rounded-full px-3 py-1.5 text-xs font-medium text-foreground/50 transition active:scale-95"
          >
            Выйти
          </button>
        </form>
      </div>
      <nav className="mx-auto flex max-w-4xl gap-1 pb-2">
        {TABS.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                active
                  ? "bg-brand text-white shadow-sm"
                  : "text-foreground/60 hover:bg-black/5"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
