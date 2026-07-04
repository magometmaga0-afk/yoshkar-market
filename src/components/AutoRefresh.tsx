"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AutoRefresh({ intervalMs = 10000 }: { intervalMs?: number }) {
  const router = useRouter();

  useEffect(() => {
    const id = setInterval(() => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    }, intervalMs);

    // Полифон/сафари могут восстановить страницу из bfcache или фона без
    // повторного рендера сервером — форсируем обновление в этих случаях,
    // иначе новый заказ виден только после полной навигации на другую страницу.
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    };
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        router.refresh();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [router, intervalMs]);

  return null;
}
