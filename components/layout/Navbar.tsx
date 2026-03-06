"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export function Navbar() {
  const totalQuantity = useCart((state) => state.totalQuantity());

  return (
    <header className="border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            fr-shop
          </Link>
          <nav className="hidden items-center gap-4 text-xs text-muted-foreground sm:flex">
            <Link href="/products" className="hover:text-foreground">
              商品
            </Link>
            <Link href="/dashboard" className="hover:text-foreground">
              我的订单
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs hover:bg-muted"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>购物车</span>
            {totalQuantity > 0 ? (
              <span className="ml-1 rounded-full bg-primary px-1.5 text-[10px] font-medium text-primary-foreground">
                {totalQuantity}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </header>
  );
}
