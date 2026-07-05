import ProductCard from "@/components/ProductCard";
import ProductDetailActions from "@/components/ProductDetailActions";
import type { ProductDTO } from "@/lib/types";
import { CATEGORY_LABEL, CATEGORY_TILE } from "@/lib/productCategory";

export default function ProductDetailBody({
  product,
  related,
}: {
  product: ProductDTO;
  related: ProductDTO[];
}) {
  const tile = CATEGORY_TILE[product.category];
  const hasPhoto = Boolean(product.imageUrl);

  return (
    <>
      <div className="lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-8">
        <div
          className={`relative aspect-square w-full overflow-hidden rounded-2xl border border-border ${
            hasPhoto ? "bg-white" : `bg-gradient-to-br ${tile.gradient}`
          }`}
        >
          {hasPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl!}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-contain p-6"
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center text-8xl">
              {tile.emoji}
            </span>
          )}
        </div>

        <div className="mt-5 lg:mt-0">
          <p className="text-xs font-medium text-brand-dark">{CATEGORY_LABEL[product.category]}</p>
          <h1 className="mt-1 text-xl font-bold leading-snug">{product.name}</h1>

          <div className="mt-3 flex flex-wrap gap-2">
            {product.volumeMl && (
              <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground/70">
                {product.volumeMl} мл
              </span>
            )}
            {product.caseSize > 1 && (
              <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground/70">
                уп. {product.caseSize} шт
              </span>
            )}
          </div>

          <div className="mt-5 rounded-2xl border border-border bg-card p-4">
            <h2 className="mb-1.5 text-sm font-semibold text-foreground/80">Описание</h2>
            <p className="text-sm leading-relaxed text-foreground/70">
              {product.description?.trim() || "Описание для этого товара скоро появится."}
            </p>
          </div>

          <div className="mt-5 hidden lg:block">
            <ProductDetailActions product={product} />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 font-semibold">Что ещё пригодится</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 px-4 pt-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto max-w-lg">
          <ProductDetailActions product={product} />
        </div>
      </div>
    </>
  );
}
