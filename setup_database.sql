-- ============================================
-- SUPABASE DATABASE SETUP FOR GOLEADORTIPS
-- ============================================
-- Copy and paste this entire file into Supabase SQL Editor and run it

-- 1. Create enum types
DO $$ BEGIN
  CREATE TYPE public.subscription_tier AS ENUM ('silver', 'gold', 'platinum');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 2. Drop old tables if they exist (clean slate)
DROP TABLE IF EXISTS public.prediction_matches CASCADE;
DROP TABLE IF EXISTS public.predictions CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.contact_messages CASCADE;

-- 3. Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- 4. Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- 5. Create helper function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 6. Create predictions table (NEW STRUCTURE)
CREATE TABLE public.predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prediction_date DATE NOT NULL,
  tier subscription_tier NOT NULL,
  result TEXT,
  ticket_odds DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view predictions"
  ON public.predictions FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert predictions"
  ON public.predictions FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update predictions"
  ON public.predictions FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete predictions"
  ON public.predictions FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 7. Create prediction_matches table
CREATE TABLE public.prediction_matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prediction_id UUID NOT NULL REFERENCES public.predictions(id) ON DELETE CASCADE,
  match_date DATE NOT NULL,
  match_name TEXT NOT NULL,
  prediction TEXT NOT NULL,
  odds DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.prediction_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view prediction matches"
  ON public.prediction_matches FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert prediction matches"
  ON public.prediction_matches FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update prediction matches"
  ON public.prediction_matches FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete prediction matches"
  ON public.prediction_matches FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- 8. Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all messages"
  ON public.contact_messages FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anyone can insert messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

-- 9. Create update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 10. Create trigger for predictions
CREATE TRIGGER update_predictions_updated_at
  BEFORE UPDATE ON public.predictions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- 11. Create trigger for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 12. Create indexes for performance
CREATE INDEX idx_prediction_matches_prediction_id ON public.prediction_matches(prediction_id);
CREATE INDEX idx_predictions_tier ON public.predictions(tier);
CREATE INDEX idx_predictions_date ON public.predictions(prediction_date DESC);

-- 13. Insert sample data for testing
INSERT INTO public.predictions (prediction_date, tier, result, ticket_odds) VALUES
  ('2025-10-15', 'silver', '✅ WIN', 3.50),
  ('2025-10-14', 'gold', '✅ WIN', 12.80),
  ('2025-10-13', 'platinum', '❌ LOSS', 45.00),
  ('2025-10-12', 'silver', '✅ WIN', 2.90),
  ('2025-10-11', 'gold', '✅ WIN', 8.50);

-- Get the IDs of inserted predictions
DO $$
DECLARE
  pred_id UUID;
BEGIN
  -- Silver prediction 1
  SELECT id INTO pred_id FROM public.predictions WHERE prediction_date = '2025-10-15' LIMIT 1;
  INSERT INTO public.prediction_matches (prediction_id, match_date, match_name, prediction, odds) VALUES
    (pred_id, '2025-10-15', 'Man City vs Arsenal', 'Over 2.5 Goals', 1.80),
    (pred_id, '2025-10-15', 'Liverpool vs Chelsea', 'BTTS Yes', 1.95);

  -- Gold prediction
  SELECT id INTO pred_id FROM public.predictions WHERE prediction_date = '2025-10-14' LIMIT 1;
  INSERT INTO public.prediction_matches (prediction_id, match_date, match_name, prediction, odds) VALUES
    (pred_id, '2025-10-14', 'Real Madrid vs Barcelona', 'Home Win', 2.10),
    (pred_id, '2025-10-14', 'Bayern vs Dortmund', 'Over 3.5 Goals', 2.40),
    (pred_id, '2025-10-14', 'PSG vs Lyon', 'BTTS Yes', 1.85),
    (pred_id, '2025-10-14', 'Inter vs Milan', '1X', 1.65);

  -- Platinum prediction
  SELECT id INTO pred_id FROM public.predictions WHERE prediction_date = '2025-10-13' LIMIT 1;
  INSERT INTO public.prediction_matches (prediction_id, match_date, match_name, prediction, odds) VALUES
    (pred_id, '2025-10-13', 'Juventus vs Napoli', 'Correct Score 2-1', 9.00),
    (pred_id, '2025-10-13', 'Atletico vs Sevilla', 'Home Win & Over 2.5', 5.00);

  -- Silver prediction 2
  SELECT id INTO pred_id FROM public.predictions WHERE prediction_date = '2025-10-12' LIMIT 1;
  INSERT INTO public.prediction_matches (prediction_id, match_date, match_name, prediction, odds) VALUES
    (pred_id, '2025-10-12', 'Man United vs Tottenham', 'BTTS Yes', 1.75),
    (pred_id, '2025-10-12', 'West Ham vs Aston Villa', 'Over 2.5', 1.65);

  -- Gold prediction 2
  SELECT id INTO pred_id FROM public.predictions WHERE prediction_date = '2025-10-11' LIMIT 1;
  INSERT INTO public.prediction_matches (prediction_id, match_date, match_name, prediction, odds) VALUES
    (pred_id, '2025-10-11', 'Newcastle vs Brighton', 'Home Win', 1.90),
    (pred_id, '2025-10-11', 'Wolves vs Fulham', 'Over 2.5', 2.00),
    (pred_id, '2025-10-11', 'Brentford vs Everton', 'BTTS Yes', 1.80),
    (pred_id, '2025-10-11', 'Crystal Palace vs Bournemouth', '1X', 1.50);
END $$;

-- SUCCESS MESSAGE
DO $$
BEGIN
  RAISE NOTICE '✅ Database setup complete! Tables created with sample data.';
END $$;
