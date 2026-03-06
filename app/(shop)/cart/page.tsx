"use client";

import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { items, remove, totalAmount } = useCart();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">购物车</h1>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">购物车是空的。</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  ¥{(item.price / 100).toFixed(2)} × {item.quantity}
                </p>
              </div>
              <button
                onClick={() => remove(item.productId)}
                className="text-xs text-destructive hover:underline"
              >
                移除
              </button>
            </div>
          ))}

          <div className="flex justify-end pt-4 text-sm font-medium">
            合计：¥{(totalAmount() / 100).toFixed(2)}
          </div>

          <div className="flex justify-end">
            <button className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              结算（即将支持）
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
