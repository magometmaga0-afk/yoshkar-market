"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icon-mark.png"
              alt="Йошкар Маркет"
              className="h-full w-full object-cover"
            />
          </span>
          <div className="leading-tight">
            <p className="text-[15px] font-bold text-foreground">Йошкар Маркет</p>
            <p className="text-xs text-foreground/50">Йошкар-Ола · за 60 мин</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
