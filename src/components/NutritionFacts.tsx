function formatNum(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toLocaleString("ru-RU", { maximumFractionDigits: 1 });
}

export default function NutritionFacts({
  calories,
  protein,
  fat,
  carbs,
  perLiquid,
}: {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  perLiquid: boolean;
}) {
  const items = [
    { label: "Ккал", value: formatNum(calories) },
    { label: "Белки", value: `${formatNum(protein)} г` },
    { label: "Жиры", value: `${formatNum(fat)} г` },
    { label: "Углеводы", value: `${formatNum(carbs)} г` },
  ];

  return (
    <div className="mt-5 rounded-2xl border border-border bg-card p-4">
      <h2 className="mb-3 text-sm font-semibold text-foreground/80">
        В 100 {perLiquid ? "мл" : "граммах"}
      </h2>
      <div className="grid grid-cols-4 gap-2 text-center">
        {items.map((item) => (
          <div key={item.label}>
            <p className="text-sm font-bold sm:text-base">{item.value}</p>
            <p className="mt-0.5 text-xs text-foreground/50">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
