"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="mt-8 border-t border-border px-4 py-6 text-center text-xs text-foreground/50">
      <p>ИП Байрамова Зарнишан Азиз Кызы · ИНН 121529862040</p>
      <p className="mt-1">г. Йошкар-Ола</p>
      <p className="mt-2">
        <Link href="/privacy" className="underline underline-offset-2">
          Политика конфиденциальности
        </Link>
      </p>
    </footer>
  );
}
