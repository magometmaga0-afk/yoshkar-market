"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const DISMISS_THRESHOLD = 110;
const CLOSE_ANIMATION_MS = 200;

export default function Modal({
  children,
  maxWidthClassName = "sm:max-w-2xl",
  activePathPrefix,
}: {
  children: React.ReactNode;
  maxWidthClassName?: string;
  /** Путь, за который отвечает эта модалка (например "/checkout"). Если после
   * программной навигации (напр. редиректа на подтверждение заказа) текущий
   * путь перестаёт начинаться с этого префикса, значит слот @modal остался
   * смонтирован поверх уже другой страницы — прячем модалку сразу, без анимации. */
  activePathPrefix: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const orphaned = !pathname.startsWith(activePathPrefix);
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const startYRef = useRef(0);

  const close = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => router.back(), CLOSE_ANIMATION_MS);
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

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
      if (e.key === "Escape" && !e.defaultPrevented) close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTouchStart(e: React.TouchEvent) {
    startYRef.current = e.touches[0].clientY;
    setIsDragging(true);
  }
  function handleTouchMove(e: React.TouchEvent) {
    const delta = e.touches[0].clientY - startYRef.current;
    if (delta > 0) setDragY(delta);
  }
  function handleTouchEnd() {
    setIsDragging(false);
    if (dragY > DISMISS_THRESHOLD) {
      close();
    } else {
      setDragY(0);
    }
  }

  const open = mounted && !closing;

  if (orphaned) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm transition-opacity sm:items-stretch sm:justify-end sm:p-4 ${
        open ? "opacity-100 duration-200" : "opacity-0 duration-150"
      }`}
      style={{ transitionDuration: isDragging ? "0ms" : undefined }}
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex w-full max-h-[90dvh] flex-col overflow-hidden rounded-t-3xl border border-border/60 bg-card shadow-2xl transition-transform ease-out sm:max-h-none sm:rounded-3xl sm:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] ${maxWidthClassName} ${
          open ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-y-0 sm:translate-x-10"
        } ${closing ? "pointer-events-none" : ""}`}
        style={{
          transitionDuration: isDragging ? "0ms" : "220ms",
          transform: dragY && !closing ? `translateY(${dragY}px)` : undefined,
        }}
      >
        <div
          className="flex shrink-0 touch-none items-center justify-center py-2.5 sm:hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="h-1.5 w-10 rounded-full bg-foreground/15" />
        </div>

        <button
          onClick={close}
          aria-label="Закрыть"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/[0.04] text-lg leading-none text-foreground/70 transition hover:bg-foreground/[0.08] active:scale-90 sm:right-5 sm:top-5"
        >
          ✕
        </button>

        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-1 sm:px-7 sm:pt-2 lg:px-9"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
