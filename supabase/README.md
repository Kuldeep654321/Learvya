# Supabase

Apply migrations with the Supabase CLI after linking the project.

## Auth

Google OAuth is the planned authentication method.

## Database security

The initial migration creates the core profile, education, interests,
career-goal and preference tables with owner-only RLS policies.

The authenticated Supabase user ID is the ownership key. Backend
authorization and PostgreSQL RLS are intentionally both used:

1. API authentication identifies the caller.
2. RLS enforces database-level ownership.

## Important security rule

Never place a Supabase service-role key in Flutter or any other client.
Keep privileged credentials server-side only.

The new-user trigger initializes a profile and default notification
preferences after a Supabase Auth user is created.