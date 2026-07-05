import { notFound } from "next/navigation";
import { getProductDetail } from "@/lib/productDetail";
import ProductDetailBody from "@/components/ProductDetailBody";
import Modal from "@/components/Modal";

export default async function ProductModalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getProductDetail(id);
  if (!data) notFound();

  return (
    <Modal>
      <ProductDetailBody product={data.product} related={data.related} />
    </Modal>
  );
}
