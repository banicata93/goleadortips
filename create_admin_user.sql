-- ============================================
-- CREATE ADMIN USER FOR GOLEADORTIPS
-- ============================================
-- This script creates an admin user and assigns admin role
-- IMPORTANT: Change the email and password before running!

-- Step 1: You need to create the user manually in Supabase Dashboard
-- Go to: Authentication → Users → Add User
-- Email: admin@goleadortips.com (or your preferred email)
-- Password: AdminPass123! (or your preferred password - must be strong!)
-- Auto Confirm User: YES (check this box)

-- Step 2: After creating the user, get the user ID from the Users table
-- Then run this SQL to assign admin role:

-- REPLACE 'YOUR_USER_ID_HERE' with the actual UUID from Authentication → Users
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID_HERE', 'admin'::app_role)
ON CONFLICT (user_id, role) DO NOTHING;

-- Example (you need to replace with real UUID):
-- INSERT INTO public.user_roles (user_id, role)
-- VALUES ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'admin'::app_role)
-- ON CONFLICT (user_id, role) DO NOTHING;

-- Verify the admin role was assigned:
SELECT u.email, ur.role 
FROM auth.users u
JOIN public.user_roles ur ON u.id = ur.user_id
WHERE ur.role = 'admin';
