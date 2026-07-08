export function formatWeight(weightGrams: number): string {
  if (weightGrams >= 1000) {
    const kg = weightGrams / 1000;
    return `${kg.toLocaleString("ru-RU", { maximumFractionDigits: 2 })} кг`;
  }
  return `${weightGrams} г`;
}
