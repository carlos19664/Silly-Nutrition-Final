-- Create meal_plans table with idempotent guards
create table if not exists public.meal_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_data jsonb not null,
  plan_type text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.meal_plans enable row level security;

-- Drop existing policies if they exist (idempotent)
drop policy if exists "Users can view their own meal plans" on public.meal_plans;
drop policy if exists "Users can insert their own meal plans" on public.meal_plans;
drop policy if exists "Users can update their own meal plans" on public.meal_plans;
drop policy if exists "Users can delete their own meal plans" on public.meal_plans;

-- Create policies for meal_plans table
create policy "Users can view their own meal plans"
  on public.meal_plans for select
  using (auth.uid() = user_id);

create policy "Users can insert their own meal plans"
  on public.meal_plans for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own meal plans"
  on public.meal_plans for update
  using (auth.uid() = user_id);

create policy "Users can delete their own meal plans"
  on public.meal_plans for delete
  using (auth.uid() = user_id);

-- Create indexes for faster lookups (idempotent)
create index if not exists idx_meal_plans_user_id on public.meal_plans(user_id);
create index if not exists idx_meal_plans_created_at on public.meal_plans(created_at desc);
create index if not exists idx_meal_plans_plan_type on public.meal_plans(plan_type);
create index if not exists idx_meal_plans_plan_data on public.meal_plans using gin(plan_data);

-- Create updated_at trigger function if it doesn't exist
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;

-- Drop existing trigger if it exists (idempotent)
drop trigger if exists update_meal_plans_updated_at on public.meal_plans;

-- Create trigger to auto-update updated_at
create trigger update_meal_plans_updated_at
  before update on public.meal_plans
  for each row
  execute function public.update_updated_at_column();
