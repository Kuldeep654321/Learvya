create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  date_of_birth date,
  state text,
  city text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.education_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  qualification text not null,
  institution text,
  stream text,
  year integer,
  created_at timestamptz not null default now()
);

create table if not exists public.user_interests (
  user_id uuid not null references public.profiles(id) on delete cascade,
  interest text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, interest)
);

create table if not exists public.user_career_goals (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  goal text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.user_preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  locale text not null default 'en',
  notifications_enabled boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.education_records enable row level security;
alter table public.user_interests enable row level security;
alter table public.user_career_goals enable row level security;
alter table public.user_preferences enable row level security;

create policy "profiles_owner" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "education_owner" on public.education_records
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "interests_owner" on public.user_interests
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "career_goal_owner" on public.user_career_goals
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "preferences_owner" on public.user_preferences
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id)
  on conflict (id) do nothing;
  insert into public.user_preferences (user_id) values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
