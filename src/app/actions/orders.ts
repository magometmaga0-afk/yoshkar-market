"use server";

import { prisma } from "@/lib/prisma";

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

  if (!customerName || !phone || !street) {
    return { error: "Заполните имя, телефон и адрес доставки" };
  }

  const address = [
    `г. Йошкар-Ола, ${street}`,
    apartment && `кв./офис ${apartment}`,
    entrance && `подъезд ${entrance}`,
    floor && `этаж ${floor}`,
    intercom && `домофон ${intercom}`,
  ]
    .filter(Boolean)
    .join(", ");

  const cleanItems = (items || []).filter((i) => i.productId && i.quantity > 0);
  if (cleanItems.length === 0) {
    return { error: "Корзина пуста" };
  }

  const productIds = cleanItems.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, inStock: true },
  });

  const hasAlcohol = cleanItems.some((i) => {
    const product = products.find((p) => p.id === i.productId);
    return product?.category === "BEER";
  });
  if (hasAlcohol && !ageConfirmed) {
    return { error: "Подтвердите, что вам есть 18 лет — в заказе есть пиво" };
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

  const order = await prisma.order.create({
    data: {
      customerName,
      phone,
      address,
      comment: comment || null,
      paymentMethod,
      ageConfirmed,
      totalAmount,
      totalCost,
      totalProfit: totalAmount - totalCost,
      items: { create: orderItemsData },
    },
  });

  return { orderId: order.id };
}
