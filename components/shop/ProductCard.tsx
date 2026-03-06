import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {product.cover_url ? (
        // 使用原生 img 避免额外配置，后续可替换为 next/image
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={product.cover_url}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-muted text-xs text-muted-foreground">
          无封面
        </div>
      )}

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="space-y-1">
          <h3 className="line-clamp-2 text-sm font-medium">{product.name}</h3>
          {product.category ? (
            <p className="text-xs text-muted-foreground">{product.category}</p>
          ) : null}
        </div>

        <p className="mt-auto text-base font-semibold">
          {formatPrice(product.price)}
        </p>

        <div className="mt-3 flex items-center justify-between gap-2 text-xs">
          <Link
            href={`/products/${product.slug}`}
            className="rounded-full bg-primary px-4 py-2 text-center text-primary-foreground transition hover:bg-primary/90"
          >
            查看详情
          </Link>
          <span className="text-muted-foreground">数字商品 · 即时下载</span>
        </div>
      </div>
    </article>
  );
}

