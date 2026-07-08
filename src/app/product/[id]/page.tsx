import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductDetail } from "@/lib/productDetail";
import ProductDetailBody from "@/components/ProductDetailBody";
import ReloadToHome from "@/components/ReloadToHome";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getProductDetail(id);
  if (!data) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-32 pt-4 lg:max-w-5xl">
      <ReloadToHome />
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60"
      >
        ← Назад в каталог
      </Link>

      <ProductDetailBody product={data.product} related={data.related} />
    </main>
  );
}
