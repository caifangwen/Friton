import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

type Props = {
  products: Product[];
};

export function ProductGrid({ products }: Props) {
  if (!products.length) {
    return (
      <div className="flex min-h-[160px] items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
        暂无上架商品，先在 Supabase 的 products 表中创建一条记录吧。
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

