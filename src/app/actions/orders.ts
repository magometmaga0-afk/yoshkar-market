"use server";

import { prisma } from "@/lib/prisma";
import { PICKUP_ADDRESS, MIN_ORDER_AMOUNT, WORKING_HOURS, isWithinWorkingHours } from "@/lib/constants";
import { formatPrice } from "@/lib/formatPrice";
import { makeStrictEnum } from "@prisma/client/runtime/client";

export type CheckoutItem = { productId: string; quantity: number };

export type OrderFormState = {
  error?: string;
  orderId?: string;
};

export async function createOrder(
  items: CheckoutItem[],
  _prevState: OrderFormState,
  formData: FormData,
): Promise<OrderFormState> {
  const customerName = String(formData.get("customerName") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const street = String(formData.get("street") || "").trim();
  const apartment = String(formData.get("apartment") || "").trim();
  const floor = String(formData.get("floor") || "").trim();
  const entrance = String(formData.get("entrance") || "").trim();
  const intercom = String(formData.get("intercom") || "").trim();
  const comment = String(formData.get("comment") || "").trim();
  const paymentMethod = formData.get("paymentMethod") === "CARD" ? "CARD" : "CASH";
  const ageConfirmed = formData.get("ageConfirmed") === "on";

  if (!isWithinWorkingHours()) {
    return {
      error: `Принимаем заказы с ${WORKING_HOURS.start}:00 до ${WORKING_HOURS.end}:00. Загляните в рабочее время!`,
    };
  }

  if (!customerName || !phone) {
    return { error: "Заполните имя и телефон" };
  }

  const cleanItems = (items || []).filter((i) => i.productId && i.quantity > 0);
  if (cleanItems.length === 0) {
    return { error: "Корзина пуста" };
  }

  const productIds = cleanItems.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, inStock: true },
  });

  const isPickup = cleanItems.some((i) => {
    const product = products.find((p) => p.id === i.productId);
    return product?.category === "BEER";
  });

  if (isPickup && !ageConfirmed) {
    return { error: "Подтвердите, что вам есть 18 лет — в заказе есть пиво" };
  }

  let address: string;
  if (isPickup) {
    address = `Самовывоз: ${PICKUP_ADDRESS}`;
  } else {
    if (!street) {
      return { error: "Заполните адрес доставки" };
    }
    address = [
      `г. Йошкар-Ола, ${street}`,
      apartment && `кв./офис ${apartment}`,
      entrance && `подъезд ${entrance}`,
      floor && `этаж ${floor}`,
      intercom && `домофон ${intercom}`,
    ]
      .filter(Boolean)
      .join(", ");
  }

  let totalAmount = 0;
  let totalCost = 0;
  const orderItemsData: {
    productId: string;
    productName: string;
    quantity: number;
    unitSellPrice: number;
    unitPurchasePrice: number;
  }[] = [];

  for (const item of cleanItems) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;
    const quantity = Math.floor(item.quantity);
    const sell = Number(product.sellPrice);
    const cost = Number(product.purchasePrice);
    totalAmount += sell * quantity;
    totalCost += cost * quantity;
    orderItemsData.push({
      productId: product.id,
      productName: product.name,
      quantity,
      unitSellPrice: sell,
      unitPurchasePrice: cost,
    });
  }

  if (orderItemsData.length === 0) {
    return { error: "Товары из корзины сейчас недоступны" };
  }

  if (totalAmount < MIN_ORDER_AMOUNT) {
    return {
      error: `Минимальная сумма заказа ${MIN_ORDER_AMOUNT} ₽. Добавьте ещё товаров на ${formatPrice(MIN_ORDER_AMOUNT - totalAmount)} ₽.`,
    };
  }

  const order = await prisma.order.create({
    data: {
      customerName,
      phone,
      address,
      comment: comment || null,
      paymentMethod,
      ageConfirmed,
      isPickup,
      totalAmount,
      totalCost,
      totalProfit: totalAmount - totalCost,
      items: { create: orderItemsData },
    },
  });

  return { orderId: order.id };
}
