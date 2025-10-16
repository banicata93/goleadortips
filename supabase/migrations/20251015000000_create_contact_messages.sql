-- Create contact_messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  status VARCHAR(20) DEFAULT 'new' NOT NULL,
  notes TEXT
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON public.contact_messages(email);

-- Enable Row Level Security
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting messages (anyone can submit)
CREATE POLICY "Anyone can insert contact messages"
  ON public.contact_messages
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy for viewing messages (only authenticated users/admins)
CREATE POLICY "Authenticated users can view contact messages"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for updating messages (only authenticated users/admins)
CREATE POLICY "Authenticated users can update contact messages"
  ON public.contact_messages
  FOR UPDATE
  TO authenticated
  USING (true);

-- Add comment
COMMENT ON TABLE public.contact_messages IS 'Stores contact form submissions from the website';
