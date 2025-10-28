-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Profiles policies
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Subscriptions table
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  plan_type text not null check (plan_type in ('single', 'essential', 'coaching')),
  status text not null check (status in ('active', 'cancelled', 'expired')),
  stripe_subscription_id text unique,
  stripe_customer_id text,
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.subscriptions enable row level security;

create policy "Users can view own subscriptions" on public.subscriptions
  for select using (auth.uid() = user_id);

-- Questionnaire responses table
create table public.questionnaire_responses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  responses jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.questionnaire_responses enable row level security;

create policy "Users can view own responses" on public.questionnaire_responses
  for select using (auth.uid() = user_id);

create policy "Users can insert own responses" on public.questionnaire_responses
  for insert with check (auth.uid() = user_id);

-- Generated plans table
create table public.generated_plans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  plan_type text not null check (plan_type in ('meal', 'workout', 'complete')),
  meal_plan text,
  workout_plan text,
  calories integer,
  macros jsonb,
  questionnaire_data jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.generated_plans enable row level security;

create policy "Users can view own plans" on public.generated_plans
  for select using (auth.uid() = user_id);

create policy "Users can insert own plans" on public.generated_plans
  for insert with check (auth.uid() = user_id);

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Indexes for better performance
create index idx_subscriptions_user_id on public.subscriptions(user_id);
create index idx_subscriptions_status on public.subscriptions(status);
create index idx_questionnaire_user_id on public.questionnaire_responses(user_id);
create index idx_generated_plans_user_id on public.generated_plans(user_id);
create index idx_generated_plans_created_at on public.generated_plans(created_at desc);
