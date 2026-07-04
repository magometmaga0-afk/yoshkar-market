import { prisma } from "@/lib/prisma";
import AdminNav from "@/components/AdminNav";
import OrderStatusSelect from "@/components/OrderStatusSelect";

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
    <>
      <AdminNav />

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-black/10 p-4 dark:border-white/10">
          <p className="text-xs text-black/50 dark:text-white/50">Заказов сегодня</p>
          <p className="text-xl font-semibold">{todayAgg._count}</p>
        </div>
        <div className="rounded-xl border border-black/10 p-4 dark:border-white/10">
          <p className="text-xs text-black/50 dark:text-white/50">Выручка сегодня</p>
          <p className="text-xl font-semibold">{Number(todayAgg._sum.totalAmount ?? 0)} ₽</p>
        </div>
        <div className="rounded-xl border border-black/10 p-4 dark:border-white/10">
          <p className="text-xs text-black/50 dark:text-white/50">Прибыль сегодня</p>
          <p className="text-xl font-semibold text-green-600">
            {Number(todayAgg._sum.totalProfit ?? 0)} ₽
          </p>
        </div>
        <div className="rounded-xl border border-black/10 p-4 dark:border-white/10">
          <p className="text-xs text-black/50 dark:text-white/50">Прибыль всего</p>
          <p className="text-xl font-semibold text-green-600">
            {Number(totalAgg._sum.totalProfit ?? 0)} ₽
          </p>
        </div>
      </div>

      <h2 className="mb-3 font-semibold">Последние заказы</h2>
      <div className="space-y-3">
        {orders.length === 0 && (
          <p className="text-black/50 dark:text-white/50">Заказов пока нет.</p>
        )}
        {orders.map((order) => (
          <div key={order.id} className="rounded-xl border border-black/10 p-4 dark:border-white/10">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-medium">
                  {order.customerName} · {order.phone}
                  {order.isPickup && (
                    <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                      Самовывоз
                    </span>
                  )}
                </p>
                <p className="text-sm text-black/50 dark:text-white/50">{order.address}</p>
              </div>
              <OrderStatusSelect orderId={order.id} status={order.status} labels={STATUS_LABELS} />
            </div>

            <ul className="mb-2 text-sm text-black/70 dark:text-white/70">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.productName} × {item.quantity}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="text-black/50 dark:text-white/50">
                {order.createdAt.toLocaleString("ru-RU")} ·{" "}
                {order.paymentMethod === "CASH" ? "наличные" : "карта"}
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
    </>
  );
}
