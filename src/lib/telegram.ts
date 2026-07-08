function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function newOrderTelegramText(order: {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: string;
  comment: string | null;
  totalAmount: number;
  totalProfit: number;
  items: { productName: string; quantity: number; unitSellPrice: number }[];
}): string {
  const shortId = order.id.slice(0, 10);
  const itemsList = order.items
    .map((i) => `• ${escapeHtml(i.productName)} × ${i.quantity} — ${i.quantity * i.unitSellPrice} ₽`)
    .join("\n");

  return [
    `🆕 <b>Новый заказ ${shortId}</b>`,
    `👤 ${escapeHtml(order.customerName)}`,
    `📞 ${escapeHtml(order.phone)}`,
    `📍 ${escapeHtml(order.address)}`,
    order.comment ? `💬 ${escapeHtml(order.comment)}` : null,
    ``,
    itemsList,
    ``,
    `💰 <b>${order.totalAmount} ₽</b> (${order.paymentMethod === "CARD" ? "картой" : "наличными"})`,
    `📈 Прибыль: ${order.totalProfit} ₽`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error("TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID не заданы — уведомление не отправлено:", text);
    return;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
    const data = await res.json();
    if (!data.ok) {
      console.error("Ошибка отправки в Telegram:", data);
    }
  } catch (err) {
    console.error("Ошибка отправки в Telegram:", err);
  }
}
