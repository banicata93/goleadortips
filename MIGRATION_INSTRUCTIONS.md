# Database Migration Instructions

## Apply Contact Messages Migration

To enable the contact form functionality, you need to apply the migration to your Supabase database.

### Option 1: Using Supabase Dashboard (Easiest)

1. Go to your Supabase project dashboard: https://supabase.com/dashboard/project/jibajgtbholuaoxcmhch
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `supabase/migrations/20251015000000_create_contact_messages.sql`
5. Click **Run** to execute the migration

### Option 2: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Login to Supabase
supabase login

# Link your project
supabase link --project-ref jibajgtbholuaoxcmhch

# Apply migrations
supabase db push
```

### Option 3: Manual SQL Execution

Connect to your database and run the SQL from the migration file directly.

## Verify Migration

After applying the migration, verify it worked:

1. Go to **Table Editor** in Supabase dashboard
2. You should see a new table called `contact_messages`
3. Test the contact form on your website

## Regenerate TypeScript Types (Optional but Recommended)

To remove the TypeScript warnings:

```bash
# Generate types from your Supabase schema
npx supabase gen types typescript --project-id jibajgtbholuaoxcmhch > src/integrations/supabase/types.ts
```

Then remove the `(supabase as any)` type assertion in `src/pages/Archives.tsx` line 131.
