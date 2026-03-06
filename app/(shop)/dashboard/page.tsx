import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <h1 className="mb-4 text-2xl font-semibold tracking-tight">我的订单</h1>
        <p className="text-sm text-muted-foreground">
          请先登录后查看订单记录。
        </p>
      </div>
    );
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load orders", error);
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">我的订单</h1>

      {!orders || orders.length === 0 ? (
        <p className="text-sm text-muted-foreground">暂无订单记录。</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border p-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium">订单 #{order.id.slice(0, 8)}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString("zh-CN")}
                </span>
              </div>
              <p className="mt-1 text-muted-foreground">
                状态：{order.status ?? "处理中"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
