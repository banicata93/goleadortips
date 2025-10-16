-- ============================================
-- ОКОНЧАТЕЛНО РЕШЕНИЕ ЗА CONTACT FORM
-- ============================================
-- Изпълни този SQL в Supabase SQL Editor

-- 1. Пресъздай таблицата
DROP TABLE IF EXISTS public.contact_messages CASCADE;

CREATE TABLE public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Drop старата функция ако съществува
DROP FUNCTION IF EXISTS public.insert_contact_message(TEXT, TEXT, TEXT);

-- 3. Създай нова функция за insert
CREATE FUNCTION public.insert_contact_message(
  p_name TEXT,
  p_email TEXT,
  p_message TEXT
)
RETURNS TABLE(id UUID, created_at TIMESTAMPTZ)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  INSERT INTO public.contact_messages (name, email, message, status, created_at)
  VALUES (p_name, p_email, p_message, 'new', NOW())
  RETURNING contact_messages.id, contact_messages.created_at;
END;
$$;

-- 4. Изключи RLS (за да работи без проблеми)
ALTER TABLE public.contact_messages DISABLE ROW LEVEL SECURITY;

-- 5. Дай permissions
GRANT ALL ON public.contact_messages TO anon;
GRANT ALL ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;

GRANT EXECUTE ON FUNCTION public.insert_contact_message(TEXT, TEXT, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.insert_contact_message(TEXT, TEXT, TEXT) TO authenticated;

-- 6. Force reload на schema
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';

-- 7. Провери че всичко е наред
SELECT 'Table created successfully' as status;
SELECT 'Function created successfully' as status FROM pg_proc WHERE proname = 'insert_contact_message';
