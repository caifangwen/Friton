-- 002_orders.sql
-- 订单、订单商品、下载日志

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'order_status') then
    create type public.order_status as enum ('pending', 'paid', 'canceled', 'refunded');
  end if;
end $$;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  status public.order_status not null default 'pending',
  stripe_session_id text unique,
  total_amount numeric(12, 2) not null check (total_amount >= 0),
  created_at timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists orders_status_idx on public.orders (status);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid not null references public.products (id),
  price_at_purchase numeric(12, 2) not null check (price_at_purchase >= 0),
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_id_idx on public.order_items (order_id);
create index if not exists order_items_product_id_idx on public.order_items (product_id);

create table if not exists public.download_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  order_item_id uuid not null references public.order_items (id) on delete cascade,
  downloaded_at timestamptz not null default now(),
  ip_address inet
);

create index if not exists download_logs_user_id_idx on public.download_logs (user_id);
create index if not exists download_logs_order_item_id_idx on public.download_logs (order_item_id);

