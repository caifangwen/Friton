export type Id = string;

export type OrderStatus = "pending" | "paid" | "canceled" | "refunded";

export type Product = {
  id: Id;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  cover_url: string | null;
  file_path: string;
  category: string | null;
  is_active: boolean;
};

export type Order = {
  id: Id;
  user_id: Id;
  status: OrderStatus;
  stripe_session_id: string | null;
  total_amount: number;
  created_at: string;
};

export type OrderItem = {
  id: Id;
  order_id: Id;
  product_id: Id;
  price_at_purchase: number;
  created_at: string;
};

