export function formatVolume(volumeMl: number): string {
  const liters = volumeMl / 1000;
  const formatted = liters.toLocaleString("ru-RU", { maximumFractionDigits: 2 });
  return `${formatted} л`;
}
