"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function AgeGate() {
  const pathname = usePathname();
  const [status, setStatus] = useState<"checking" | "hidden" | "asking" | "denied">("checking");

  useEffect(() => {
    setStatus("asking");
  }, []);

  useEffect(() => {
    if (status === "asking" || status === "denied") {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [status]);

  if (pathname.startsWith("/admin")) return null;
  if (status === "checking" || status === "hidden") return null;

  function confirm() {
    setStatus("hidden");
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 text-center shadow-2xl">
        {status === "denied" ? (
          <>
            <p className="mb-3 text-4xl">🔞</p>
            <h1 className="mb-2 text-lg font-bold">Доступ ограничен</h1>
            <p className="text-sm text-foreground/60">
              Этот сайт предназначен только для лиц старше 18 лет.
            </p>
          </>
        ) : (
          <>
            <h1 className="mb-3 text-lg font-bold leading-snug">
              Добро пожаловать на сайт Йошкар Маркет
            </h1>
            <p className="mb-5 text-foreground/70">Вам уже исполнилось 18 лет?</p>
            <div className="flex gap-3">
              <button
                onClick={confirm}
                className="flex-1 rounded-2xl bg-brand py-3 font-semibold text-white shadow-sm transition active:scale-[0.97]"
              >
                Да
              </button>
              <button
                onClick={() => setStatus("denied")}
                className="flex-1 rounded-2xl border border-border py-3 font-semibold text-foreground/70 transition active:scale-[0.97]"
              >
                Нет
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
