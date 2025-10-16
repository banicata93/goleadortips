-- Create enum for subscription tiers
CREATE TYPE public.subscription_tier AS ENUM ('silver', 'gold', 'platinum');

-- Create predictions table
CREATE TABLE public.predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_date DATE NOT NULL,
  match_name TEXT NOT NULL,
  prediction TEXT NOT NULL,
  result TEXT,
  tier subscription_tier NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on predictions
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;

-- Public read access for predictions (everyone can see)
CREATE POLICY "Anyone can view predictions"
  ON public.predictions
  FOR SELECT
  USING (true);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create trigger to auto-create profile
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

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Admin policies for predictions (only admins can insert/update/delete)
CREATE POLICY "Admins can insert predictions"
  ON public.predictions
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update predictions"
  ON public.predictions
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete predictions"
  ON public.predictions
  FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Users can view their own roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Admins can manage all roles
CREATE POLICY "Admins can manage all roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Trigger for predictions updated_at
CREATE TRIGGER update_predictions_updated_at
  BEFORE UPDATE ON public.predictions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.predictions (match_date, match_name, prediction, result, tier) VALUES
  ('2025-10-05', 'Man City vs Arsenal', 'Over 2.5', '✅ Win', 'silver'),
  ('2025-10-04', 'Real Madrid vs Barcelona', '1X', '✅ Win', 'silver'),
  ('2025-10-03', 'Bayern vs Dortmund', 'BTTS', '❌ Loss', 'silver'),
  ('2025-10-05', 'PSG vs Lyon', 'Home Win & Over 2.5', '✅ Win', 'gold'),
  ('2025-10-04', 'Liverpool vs Chelsea', '1X & BTTS', '✅ Win', 'gold'),
  ('2025-10-03', 'Inter vs Milan', 'Under 3.5', '✅ Win', 'gold'),
  ('2025-10-05', 'Juventus vs Napoli', 'Home Win HT/FT', '✅ Win', 'platinum'),
  ('2025-10-04', 'Atletico vs Sevilla', 'Correct Score 2-1', '✅ Win', 'platinum'),
  ('2025-10-03', 'Man United vs Tottenham', 'Away Win & Over 2.5', '❌ Loss', 'platinum');