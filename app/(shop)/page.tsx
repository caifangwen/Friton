import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Product } from "@/types";
import { ProductGrid } from "@/components/shop/ProductGrid";

async function getActiveProducts(): Promise<Product[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to load products", error);
    return [];
  }

  return (data ?? []) as Product[];
}

export default async function ShopHomePage() {
  const products = await getActiveProducts();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          数字产品商城
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          在这里购买模板、插件、课程等数字产品，支付完成后即可在「我的订单」中下载。
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-medium">热门产品</h2>
          <p className="text-xs text-muted-foreground">
            当前展示的是 Supabase 中已上架（is_active = true）的商品。
          </p>
        </div>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}

