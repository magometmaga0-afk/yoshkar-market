"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/app/actions/admin";
import type { OrderStatus } from "@/generated/prisma/client";

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
      className="rounded-lg border border-black/10 bg-transparent px-2 py-1 text-sm disabled:opacity-50 dark:border-white/10"
    >
      {Object.entries(labels).map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
