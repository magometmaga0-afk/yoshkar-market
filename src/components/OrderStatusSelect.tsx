"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/app/actions/admin";
import type { OrderStatus } from "@/generated/prisma/client";

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-orange-100 text-orange-800 border-orange-200",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-200",
  DELIVERING: "bg-purple-100 text-purple-800 border-purple-200",
  DELIVERED: "bg-green-100 text-green-800 border-green-200",
  CANCELLED: "bg-foreground/5 text-foreground/50 border-border",
};

export default function OrderStatusSelect({
  orderId,
  status,
  labels,
}: {
  orderId: string;
  status: OrderStatus;
  labels: Record<string, string>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="relative shrink-0">
      <select
        value={status}
        disabled={isPending}
        onChange={(e) => {
          const next = e.target.value as OrderStatus;
          startTransition(async () => {
            await updateOrderStatus(orderId, next);
          });
        }}
        className={`appearance-none rounded-full border py-2 pl-3.5 pr-8 text-sm font-semibold shadow-sm outline-none transition disabled:opacity-50 ${STATUS_COLORS[status] ?? ""}`}
      >
        {Object.entries(labels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] opacity-60">
        ▾
      </span>
    </div>
  );
}
