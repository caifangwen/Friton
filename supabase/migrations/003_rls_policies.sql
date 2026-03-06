-- 003_rls_policies.sql
-- Row Level Security + Policies

-- 开启 RLS
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.download_logs enable row level security;

-- PRODUCTS
-- 公开可见：仅允许读取上架商品
drop policy if exists "products_select_active" on public.products;
create policy "products_select_active"
on public.products
for select
to anon, authenticated
using (is_active = true);

-- ORDERS
-- 用户只能看自己的订单
drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own"
on public.orders
for select
to authenticated
using (auth.uid() = user_id);

-- ORDER_ITEMS
-- 用户只能看属于自己订单的订单项
drop policy if exists "order_items_select_own_orders" on public.order_items;
create policy "order_items_select_own_orders"
on public.order_items
for select
to authenticated
using (
  exists (
    select 1
    from public.orders o
    where o.id = order_items.order_id
      and o.user_id = auth.uid()
  )
);

-- DOWNLOAD_LOGS
-- 用户只能查看自己的下载记录
drop policy if exists "download_logs_select_own" on public.download_logs;
create policy "download_logs_select_own"
on public.download_logs
for select
to authenticated
using (auth.uid() = user_id);

-- 允许用户为“自己的、已支付订单”的订单项写入下载日志
drop policy if exists "download_logs_insert_for_own_paid_order" on public.download_logs;
create policy "download_logs_insert_for_own_paid_order"
on public.download_logs
for insert
to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.order_items oi
    join public.orders o on o.id = oi.order_id
    where oi.id = download_logs.order_item_id
      and o.user_id = auth.uid()
      and o.status = 'paid'
  )
);

