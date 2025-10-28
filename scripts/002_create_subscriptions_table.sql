-- 002_create_subscriptions_table.sql
-- Idempotent migration: safe to run multiple times

-- 1) Table
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_price_id text,
  status text not null default 'inactive',
  current_period_start timestamptz,
  current_period_end   timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now()),
  -- one row per user (fits current model)
  unique (user_id),
  -- keep status values clean (adjust list if your app uses others)
  constraint subscriptions_status_check
    check (status in ('inactive','trialing','active','past_due','canceled'))
);

-- 2) Indexes (named + idempotent)
do $$
begin
  if not exists (
    select 1 from pg_indexes
    where schemaname='public' and indexname='idx_subscriptions_user_id'
  ) then
    create index idx_subscriptions_user_id on public.subscriptions(user_id);
  end if;

  if not exists (
    select 1 from pg_indexes
    where schemaname='public' and indexname='idx_subscriptions_stripe_customer_id'
  ) then
    create index idx_subscriptions_stripe_customer_id on public.subscriptions(stripe_customer_id);
  end if;

  if not exists (
    select 1 from pg_indexes
    where schemaname='public' and indexname='idx_subscriptions_status'
  ) then
    create index idx_subscriptions_status on public.subscriptions(status);
  end if;
end$$;

-- 3) RLS
alter table public.subscriptions enable row level security;

-- Make policies idempotent
drop policy if exists "Users can view their own subscription"  on public.subscriptions;
drop policy if exists "Users can insert their own subscription" on public.subscriptions;
drop policy if exists "Users can update their own subscription" on public.subscriptions;
drop policy if exists "Users can delete their own subscription" on public.subscriptions;

create policy "Users can view their own subscription"
  on public.subscriptions
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own subscription"
  on public.subscriptions
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own subscription"
  on public.subscriptions
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own subscription"
  on public.subscriptions
  for delete
  using (auth.uid() = user_id);

-- 4) updated_at trigger (shared function + table trigger, idempotent)
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists set_subscriptions_updated_at on public.subscriptions;

create trigger set_subscriptions_updated_at
before update on public.subscriptions
for each row
execute function public.set_updated_at();
