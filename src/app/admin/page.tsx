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

const STATS = [
  { key: "count", label: "Заказов сегодня", emoji: "📦", tint: "bg-sky-100" },
  { key: "revenue", label: "Выручка сегодня", emoji: "💰", tint: "bg-amber-100" },
  { key: "profitToday", label: "Прибыль сегодня", emoji: "📈", tint: "bg-green-100" },
  { key: "profitTotal", label: "Прибыль всего", emoji: "🏆", tint: "bg-violet-100" },
] as const;

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

  const statValues: Record<(typeof STATS)[number]["key"], string> = {
    count: String(todayAgg._count),
    revenue: `${Number(todayAgg._sum.totalAmount ?? 0)} ₽`,
    profitToday: `${Number(todayAgg._sum.totalProfit ?? 0)} ₽`,
    profitTotal: `${Number(totalAgg._sum.totalProfit ?? 0)} ₽`,
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 safe-bottom">
      <AutoRefresh />
      <NewOrderAlert latestOrderId={orders[0]?.id ?? null} />
      <AdminNav />

      <div className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
        {STATS.map((stat) => (
          <div
            key={stat.key}
            className="rounded-2xl border border-border bg-card p-3.5 shadow-sm sm:p-4"
          >
            <span className={`mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-base ${stat.tint}`}>
              {stat.emoji}
            </span>
            <p className="text-xs text-foreground/50">{stat.label}</p>
            <p
              className={`text-xl font-bold ${
                stat.key === "profitToday" || stat.key === "profitTotal" ? "text-green-600" : ""
              }`}
            >
              {statValues[stat.key]}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 font-semibold">Последние заказы</h2>
      <div className="space-y-3 pb-6">
        {orders.length === 0 && (
          <p className="rounded-2xl border border-border bg-card p-6 text-center text-foreground/50">
            Заказов пока нет.
          </p>
        )}
        {orders.map((order) => (
          <div
            key={order.id}
            className={`rounded-2xl border p-4 shadow-sm ${
              order.status === "NEW" ? "border-brand/30 bg-brand/[0.05]" : "border-border bg-card"
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
                <p className="text-xs text-foreground/50">
                  {order.createdAt.toLocaleString("ru-RU")}
                </p>
              </div>
              <OrderStatusSelect orderId={order.id} status={order.status} labels={STATUS_LABELS} />
            </div>

            <div className="mb-3 flex flex-wrap gap-2">
              <a
                href={telHref(order.phone)}
                className="flex items-center gap-1.5 rounded-full bg-foreground/[0.04] px-3 py-2 text-sm font-medium text-foreground transition active:scale-95"
              >
                📞 {order.phone}
              </a>
              {!order.isPickup && (
                <a
                  href={mapsHref(order.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 items-center gap-1.5 rounded-full bg-foreground/[0.04] px-3 py-2 text-sm font-medium text-foreground transition active:scale-95"
                >
                  📍 <span className="truncate">{order.address}</span>
                </a>
              )}
            </div>

            {order.isPickup && (
              <p className="mb-3 text-sm text-foreground/60">📍 {order.address}</p>
            )}

            <ul className="mb-3 space-y-0.5 rounded-xl bg-foreground/[0.03] px-3 py-2 text-sm text-foreground/70">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.productName} × {item.quantity}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-sm">
              <span className="text-foreground/50">
                {order.paymentMethod === "CASH" ? "💵 наличные" : "💳 карта"}
              </span>
              <span>
                Сумма: <b>{Number(order.totalAmount)} ₽</b> · Прибыль:{" "}
                <b className="text-green-600">{Number(order.totalProfit)} ₽</b>
              </span>
            </div>
            {order.comment && (
              <p className="mt-2 text-sm italic text-foreground/50">
                Комментарий: {order.comment}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
