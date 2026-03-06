export function Footer() {
  return (
    <footer className="border-t bg-background/80">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} fr-shop 数字商品商城</p>
        <p className="hidden sm:block">
          支付由 Stripe 提供，数据存储在 Supabase。
        </p>
      </div>
    </footer>
  );
}

