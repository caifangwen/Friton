export function formatPrice(amount: number, currency: string = "CNY"): string {
  if (!Number.isFinite(amount)) return "-";

  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);
}

