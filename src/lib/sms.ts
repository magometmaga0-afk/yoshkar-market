import type { OrderStatus } from "@/generated/prisma/client";

const SMS_RU_SEND_URL = "https://sms.ru/sms/send";

function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("8")) return `7${digits.slice(1)}`;
  return digits;
}

export async function sendSms(phone: string, message: string): Promise<void> {
  const apiId = process.env.SMSRU_API_ID;
  if (!apiId) {
    console.error("SMSRU_API_ID не задан — SMS не отправлено:", message);
    return;
  }

  const params = new URLSearchParams({
    api_id: apiId,
    to: normalizePhone(phone),
    msg: message,
    json: "1",
  });

  try {
    const res = await fetch(`${SMS_RU_SEND_URL}?${params.toString()}`);
    const data = await res.json();
    if (data.status !== "OK") {
      console.error("Ошибка отправки SMS:", data);
    }
  } catch (err) {
    console.error("Ошибка отправки SMS:", err);
  }
}

export function orderStatusSmsText(
  status: OrderStatus,
  orderId: string,
  isPickup: boolean,
): string | null {
  const shortId = orderId.slice(0, 10);
  switch (status) {
    case "CONFIRMED":
      return `Йошкар Маркет: заказ ${shortId} подтверждён, собираем товары.`;
    case "DELIVERING":
      return isPickup
        ? `Йошкар Маркет: заказ ${shortId} готов, ждём вас на самовывозе.`
        : `Йошкар Маркет: заказ ${shortId} у курьера, будет у вас в течение часа.`;
    case "DELIVERED":
      return `Йошкар Маркет: заказ ${shortId} доставлен. Спасибо за покупку!`;
    case "CANCELLED":
      return `Йошкар Маркет: заказ ${shortId} отменён.`;
    default:
      return null;
  }
}
