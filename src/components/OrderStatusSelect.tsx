"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/app/actions/admin";
import type { OrderStatus } from "@/generated/prisma/client";

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-orange-100 text-orange-800 border-orange-300",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-300",
  DELIVERING: "bg-purple-100 text-purple-800 border-purple-300",
  DELIVERED: "bg-green-100 text-green-800 border-green-300",
  CANCELLED: "bg-black/5 text-black/50 border-black/10",
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
    <select
      value={status}
      disabled={isPending}
      onChange={(e) => {
        const next = e.target.value as OrderStatus;
        startTransition(() => {
          updateOrderStatus(orderId, next);
        });
      }}
      className={`shrink-0 rounded-xl border px-3 py-2.5 text-sm font-semibold disabled:opacity-50 ${STATUS_COLORS[status] ?? ""}`}
    >
      {Object.entries(labels).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
