-- Recursos de operação manual e administração completa.
do $$ begin create type public.order_source as enum ('website','whatsapp','phone','counter','admin'); exception when duplicate_object then null; end $$;
alter table public.orders add column if not exists order_source public.order_source not null default 'website';
alter table public.products add column if not exists archived_at timestamptz;
create index if not exists orders_source_created_idx on public.orders(order_source,created_at desc);
create index if not exists products_admin_filter_idx on public.products(category_id,is_available,is_featured,display_order);
