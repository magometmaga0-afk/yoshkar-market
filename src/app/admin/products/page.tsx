import { prisma } from "@/lib/prisma";
import AdminNav from "@/components/AdminNav";
import AdminProductList from "@/components/AdminProductList";
import NewProductForm from "@/components/NewProductForm";

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  BEER: "Пиво",
  ENERGY: "Энергетик",
  OTHER: "Напиток",
  SNACKS: "Снек",
  COFFEE_TEA: "Чай/кофе",
  CANNED: "Консервы",
  GROCERY: "Бакалея",
  PET_SUPPLIES: "Зоотовары",
  PRODUCE: "Фрукты и овощи",
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

      <div className="mt-8">
        <AdminProductList
          products={products.map((p) => ({
            id: p.id,
            name: p.name,
            category: p.category,
            volumeMl: p.volumeMl,
            caseSize: p.caseSize,
            purchasePrice: Number(p.purchasePrice),
            sellPrice: Number(p.sellPrice),
            imageUrl: p.imageUrl,
            description: p.description,
            inStock: p.inStock,
          }))}
          categoryLabels={CATEGORY_LABELS}
        />
      </div>
    </div>
  );
}
