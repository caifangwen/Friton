import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Product } from "@/types";
import { ProductGrid } from "@/components/shop/ProductGrid";

async function getAllProducts(): Promise<Product[]> {
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

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">全部商品</h1>
      <ProductGrid products={products} />
    </div>
  );
}
