import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });

  if (!order) notFound();

  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-16 pt-8">
      <div className="mb-5 text-center">
        <div className="mx-auto mb-3 flex h-16 w-16 animate-pop-in items-center justify-center rounded-full bg-green-100 text-3xl">
          ✅
        </div>
        <h1 className="text-xl font-bold">Заказ принят!</h1>
        <p className="mt-1 text-sm text-foreground/50">
          {order.isPickup ? "Мы" : "Курьер"} свяжется по телефону {order.phone} для подтверждения
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="space-y-2 p-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-foreground/70">
                {item.productName} × {item.quantity}
              </span>
              <span className="font-medium">{Number(item.unitSellPrice) * item.quantity} ₽</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between border-t border-border bg-background/60 p-4 font-semibold">
          <span>Итого</span>
          <span>{Number(order.totalAmount)} ₽</span>
        </div>
      </div>

      <div className="mt-4 space-y-1 rounded-2xl border border-border bg-card p-4 text-sm text-foreground/60">
        <p>Номер заказа: {order.id.slice(0, 10)}…</p>
        <p>{order.isPickup ? "" : "Адрес: "}{order.address}</p>
        <p>Оплата: {order.paymentMethod === "CASH" ? "наличными курьеру" : "картой курьеру"}</p>
      </div>

      <Link
        href="/"
        className="mt-6 block rounded-2xl bg-brand py-3.5 text-center font-semibold text-white shadow-sm transition duration-200 hover:brightness-105 active:scale-[0.97]"
      >
        Вернуться к каталогу
      </Link>
    </main>
  );
}
