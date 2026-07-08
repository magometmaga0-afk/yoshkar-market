export function formatPrice(amount: number | string): string {
  return Math.round(Number(amount)).toLocaleString("ru-RU");
}
