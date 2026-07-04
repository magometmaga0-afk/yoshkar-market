import { prisma } from "@/lib/prisma";
import AdminNav from "@/components/AdminNav";
import ProductRow from "@/components/ProductRow";
import NewProductForm from "@/components/NewProductForm";

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  BEER: "Пиво",
  ENERGY: "Энергетик",
  OTHER: "Напиток",
};

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 safe-bottom">
      <AdminNav />

      <h2 className="mb-3 font-semibold">Добавить товар</h2>
      <NewProductForm />

      <h2 className="mb-3 mt-8 font-semibold">Товары ({products.length})</h2>
      <div className="overflow-x-auto rounded-xl border border-black/10 dark:border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/10 text-left text-black/50 dark:border-white/10 dark:text-white/50">
              <th className="px-3 py-2">Название</th>
              <th className="px-3 py-2">Категория</th>
              <th className="px-3 py-2">Объём</th>
              <th className="px-3 py-2">Упаковка</th>
              <th className="px-3 py-2">Закупка</th>
              <th className="px-3 py-2">Продажа</th>
              <th className="px-3 py-2">Фото</th>
              <th className="px-3 py-2">Наличие</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <ProductRow
                key={p.id}
                product={{
                  id: p.id,
                  name: p.name,
                  category: p.category,
                  volumeMl: p.volumeMl,
                  caseSize: p.caseSize,
                  purchasePrice: Number(p.purchasePrice),
                  sellPrice: Number(p.sellPrice),
                  imageUrl: p.imageUrl,
                  inStock: p.inStock,
                }}
                categoryLabel={CATEGORY_LABELS[p.category]}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
