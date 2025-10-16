-- Create contact_messages table for website form submissions
-- This table stores contact form messages from visitors

-- Drop table if exists (for clean re-run)
DROP TABLE IF EXISTS public.contact_messages;

-- Create the table
CREATE TABLE public.contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL CHECK (length(name) >= 1 AND length(name) <= 100),
  email VARCHAR(255) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  message TEXT NOT NULL CHECK (length(message) >= 10 AND length(message) <= 1000),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  status VARCHAR(20) DEFAULT 'new' NOT NULL CHECK (status IN ('new', 'read', 'replied', 'archived')),
  notes TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Create indexes for better performance
CREATE INDEX idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX idx_contact_messages_email ON public.contact_messages(email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow anonymous users to INSERT messages (for contact form)
CREATE POLICY "Enable insert for anonymous users"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy 2: Allow authenticated users to SELECT messages (for admin viewing)
CREATE POLICY "Enable select for authenticated users"
  ON public.contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy 3: Allow authenticated users to UPDATE messages (for admin management)
CREATE POLICY "Enable update for authenticated users"
  ON public.contact_messages
  FOR UPDATE
  TO authenticated
  USING (true);

-- Policy 4: Prevent DELETE operations for security
CREATE POLICY "Prevent delete operations"
  ON public.contact_messages
  FOR DELETE
  TO authenticated
  USING (false);

-- Add helpful comments
COMMENT ON TABLE public.contact_messages IS 'Stores contact form submissions from the website contact page';
COMMENT ON COLUMN public.contact_messages.name IS 'Name of the person submitting the form';
COMMENT ON COLUMN public.contact_messages.email IS 'Email address for follow-up';
COMMENT ON COLUMN public.contact_messages.message IS 'The actual message content';
COMMENT ON COLUMN public.contact_messages.status IS 'Status of the message: new, read, replied, archived';
COMMENT ON COLUMN public.contact_messages.notes IS 'Internal notes for admin use';
