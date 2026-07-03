import Link from "next/link";
import CheckoutForm from "@/components/CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-16 pt-5 lg:max-w-4xl">
      <Link href="/" className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-foreground/50">
        ← Каталог
      </Link>
      <h1 className="mb-5 text-xl font-bold">Оформление заказа</h1>
      <CheckoutForm />
    </main>
  );
}
