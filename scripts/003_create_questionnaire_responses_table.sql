-- 003_create_questionnaire_responses_table.sql
-- Idempotent: safe to run multiple times

-- 1) Table
create table if not exists public.questionnaire_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  responses jsonb not null,
  completed boolean default false,
  created_at timestamptz not null default timezone('utc'::text, now()),
  updated_at timestamptz not null default timezone('utc'::text, now())
);

-- 2) Indexes (named + idempotent)
do $$
begin
  -- user_id lookup
  if not exists (
    select 1 from pg_indexes
    where schemaname='public' and indexname='idx_qr_user_id'
  ) then
    create index idx_qr_user_id on public.questionnaire_responses(user_id);
  end if;

  -- completed=true quick filter
  if not exists (
    select 1 from pg_indexes
    where schemaname='public' and indexname='idx_qr_completed_true'
  ) then
    create index idx_qr_completed_true
      on public.questionnaire_responses(completed)
      where completed = true;
  end if;

  -- JSONB queries (keys/containment)
  if not exists (
    select 1 from pg_indexes
    where schemaname='public' and indexname='idx_qr_responses_gin'
  ) then
    create index idx_qr_responses_gin
      on public.questionnaire_responses
      using gin (responses jsonb_path_ops);
  end if;
end$$;

-- 3) RLS
alter table public.questionnaire_responses enable row level security;

-- Make policies idempotent
drop policy if exists "Users can view their own responses"   on public.questionnaire_responses;
drop policy if exists "Users can insert their own responses"  on public.questionnaire_responses;
drop policy if exists "Users can update their own responses"  on public.questionnaire_responses;
drop policy if exists "Users can delete their own responses"  on public.questionnaire_responses;

create policy "Users can view their own responses"
  on public.questionnaire_responses
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own responses"
  on public.questionnaire_responses
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own responses"
  on public.questionnaire_responses
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own responses"
  on public.questionnaire_responses
  for delete
  using (auth.uid() = user_id);

-- 4) updated_at trigger (shared function + table trigger)
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := timezone('utc'::text, now());
  return new;
end;
$$;

drop trigger if exists set_qr_updated_at on public.questionnaire_responses;

create trigger set_qr_updated_at
before update on public.questionnaire_responses
for each row
execute function public.set_updated_at();
