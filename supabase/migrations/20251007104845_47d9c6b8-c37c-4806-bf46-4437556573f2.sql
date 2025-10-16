-- Drop the old predictions table
DROP TABLE IF EXISTS public.predictions CASCADE;

-- Create new predictions table (main ticket/prediction entry)
CREATE TABLE public.predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prediction_date DATE NOT NULL,
  tier subscription_tier NOT NULL,
  result TEXT,
  ticket_odds DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create prediction_matches table (individual matches in a ticket)
CREATE TABLE public.prediction_matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prediction_id UUID NOT NULL REFERENCES public.predictions(id) ON DELETE CASCADE,
  match_date DATE NOT NULL,
  match_name TEXT NOT NULL,
  prediction TEXT NOT NULL,
  odds DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prediction_matches ENABLE ROW LEVEL SECURITY;

-- RLS Policies for predictions
CREATE POLICY "Anyone can view predictions"
  ON public.predictions
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert predictions"
  ON public.predictions
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update predictions"
  ON public.predictions
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete predictions"
  ON public.predictions
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for prediction_matches
CREATE POLICY "Anyone can view prediction matches"
  ON public.prediction_matches
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert prediction matches"
  ON public.prediction_matches
  FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update prediction matches"
  ON public.prediction_matches
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete prediction matches"
  ON public.prediction_matches
  FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates on predictions
CREATE TRIGGER update_predictions_updated_at
  BEFORE UPDATE ON public.predictions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster queries
CREATE INDEX idx_prediction_matches_prediction_id ON public.prediction_matches(prediction_id);
CREATE INDEX idx_predictions_tier ON public.predictions(tier);
CREATE INDEX idx_predictions_date ON public.predictions(prediction_date DESC);