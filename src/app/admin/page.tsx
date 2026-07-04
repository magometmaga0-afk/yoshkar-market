import { prisma } from "@/lib/prisma";
import AdminNav from "@/components/AdminNav";
import OrderStatusSelect from "@/components/OrderStatusSelect";
import AutoRefresh from "@/components/AutoRefresh";
import NewOrderAlert from "@/components/NewOrderAlert";

export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  NEW: "Новый",
  CONFIRMED: "Подтверждён",
  DELIVERING: "В доставке",
  DELIVERED: "Доставлен",
  CANCELLED: "Отменён",
};

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function mapsHref(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export default async function AdminOrdersPage() {
  const [orders, todayAgg, totalAgg] = await Promise.all([
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { items: true },
    }),
    prisma.order.aggregate({
      where: { createdAt: { gte: startOfToday() }, status: { not: "CANCELLED" } },
      _sum: { totalAmount: true, totalProfit: true },
      _count: true,
    }),
    prisma.order.aggregate({
      where: { status: { not: "CANCELLED" } },
      _sum: { totalAmount: true, totalProfit: true },
      _count: true,
    }),
  ]);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 safe-bottom">
      <AutoRefresh />
      <NewOrderAlert latestOrderId={orders[0]?.id ?? null} />
      <AdminNav />

      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        <div className="rounded-xl border border-black/10 p-3 sm:p-4 dark:border-white/10">
          <p className="text-xs text-black/50 dark:text-white/50">Заказов сегодня</p>
          <p className="text-xl font-semibold">{todayAgg._count}</p>
        </div>
        <div className="rounded-xl border border-black/10 p-3 sm:p-4 dark:border-white/10">
          <p className="text-xs text-black/50 dark:text-white/50">Выручка сегодня</p>
          <p className="text-xl font-semibold">{Number(todayAgg._sum.totalAmount ?? 0)} ₽</p>
        </div>
        <div className="rounded-xl border border-black/10 p-3 sm:p-4 dark:border-white/10">
          <p className="text-xs text-black/50 dark:text-white/50">Прибыль сегодня</p>
          <p className="text-xl font-semibold text-green-600">
            {Number(todayAgg._sum.totalProfit ?? 0)} ₽
          </p>
        </div>
        <div className="rounded-xl border border-black/10 p-3 sm:p-4 dark:border-white/10">
          <p className="text-xs text-black/50 dark:text-white/50">Прибыль всего</p>
          <p className="text-xl font-semibold text-green-600">
            {Number(totalAgg._sum.totalProfit ?? 0)} ₽
          </p>
        </div>
      </div>

      <h2 className="mb-3 font-semibold">Последние заказы</h2>
      <div className="space-y-3 pb-6">
        {orders.length === 0 && (
          <p className="text-black/50 dark:text-white/50">Заказов пока нет.</p>
        )}
        {orders.map((order) => (
          <div
            key={order.id}
            className={`rounded-2xl border p-4 ${
              order.status === "NEW"
                ? "border-orange-300 bg-orange-50 dark:border-orange-900 dark:bg-orange-950/30"
                : "border-black/10 dark:border-white/10"
            }`}
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{order.customerName}</p>
                  {order.isPickup && (
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                      Самовывоз
                    </span>
                  )}
                </div>
                <p className="text-xs text-black/50 dark:text-white/50">
                  {order.createdAt.toLocaleString("ru-RU")}
                </p>
              </div>
              <OrderStatusSelect orderId={order.id} status={order.status} labels={STATUS_LABELS} />
            </div>

            <div className="mb-3 flex flex-wrap gap-2">
              <a
                href={telHref(order.phone)}
                className="flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-2 text-sm font-medium active:scale-95 dark:bg-white/10"
              >
                📞 {order.phone}
              </a>
              {!order.isPickup && (
                <a
                  href={mapsHref(order.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 items-center gap-1.5 rounded-full bg-black/5 px-3 py-2 text-sm font-medium active:scale-95 dark:bg-white/10"
                >
                  📍 <span className="truncate">{order.address}</span>
                </a>
              )}
            </div>

            {order.isPickup && (
              <p className="mb-3 text-sm text-black/60 dark:text-white/60">📍 {order.address}</p>
            )}

            <ul className="mb-3 space-y-0.5 text-sm text-black/70 dark:text-white/70">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.productName} × {item.quantity}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-black/10 pt-3 text-sm dark:border-white/10">
              <span className="text-black/50 dark:text-white/50">
                {order.paymentMethod === "CASH" ? "💵 наличные" : "💳 карта"}
              </span>
              <span>
                Сумма: <b>{Number(order.totalAmount)} ₽</b> · Прибыль:{" "}
                <b className="text-green-600">{Number(order.totalProfit)} ₽</b>
              </span>
            </div>
            {order.comment && (
              <p className="mt-2 text-sm italic text-black/50 dark:text-white/50">
                Комментарий: {order.comment}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
