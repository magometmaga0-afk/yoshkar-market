import Link from "next/link";
import CheckoutForm from "@/components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="relative flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-border/60 bg-card shadow-2xl sm:max-h-[90vh] sm:max-w-4xl sm:rounded-3xl sm:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)]">
        <Link
          href="/"
          aria-label="Закрыть"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/[0.04] text-lg leading-none text-foreground/70 transition hover:bg-foreground/[0.08] active:scale-90 sm:right-5 sm:top-5"
        >
          ✕
        </Link>

        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pt-6 sm:px-7 sm:pt-8 lg:px-9"
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
        >
          <h1 className="mb-5 text-xl font-bold">Оформление заказа</h1>
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
