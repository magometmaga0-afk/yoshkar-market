"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Modal({
  children,
  maxWidthClassName = "sm:max-w-2xl",
}: {
  children: React.ReactNode;
  maxWidthClassName?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      // defaultPrevented даёт вложенным элементам (например, выпадающему списку
      // подсказок адреса) шанс самим обработать Escape и не закрывать модалку целиком.
      if (e.key === "Escape" && !e.defaultPrevented) router.back();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={() => router.back()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full animate-slide-up overflow-hidden rounded-t-3xl bg-background shadow-xl sm:rounded-2xl ${maxWidthClassName}`}
        style={{ maxHeight: "92vh" }}
      >
        <button
          onClick={() => router.back()}
          aria-label="Закрыть"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg leading-none shadow-md backdrop-blur active:scale-90"
        >
          ✕
        </button>
        <div className="overflow-y-auto px-4 pt-4 lg:px-6" style={{ maxHeight: "92vh" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
