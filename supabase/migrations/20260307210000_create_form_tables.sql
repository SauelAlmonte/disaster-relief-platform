-- Form submission tables for disaster-relief-platform
-- RLS: allow anonymous insert for public forms; read restricted (service_role only by default)

-- Relief requests (victims requesting help)
CREATE TABLE public.relief_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  assistance_type text NOT NULL,
  description text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.relief_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert for relief_requests"
  ON public.relief_requests FOR INSERT
  TO anon
  WITH CHECK (true);

-- Volunteers (sign-up form)
CREATE TABLE public.volunteers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  skills text,
  availability text,
  location text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert for volunteers"
  ON public.volunteers FOR INSERT
  TO anon
  WITH CHECK (true);

-- Donations (pledge / intent; actual payment can be integrated later)
CREATE TABLE public.donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  amount text NOT NULL,
  message text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert for donations"
  ON public.donations FOR INSERT
  TO anon
  WITH CHECK (true);

-- Contact messages
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert for contact_messages"
  ON public.contact_messages FOR INSERT
  TO anon
  WITH CHECK (true);

-- Indexes for common queries (e.g. by created_at for admin lists)
CREATE INDEX idx_relief_requests_created_at ON public.relief_requests (created_at DESC);
CREATE INDEX idx_volunteers_created_at ON public.volunteers (created_at DESC);
CREATE INDEX idx_donations_created_at ON public.donations (created_at DESC);
CREATE INDEX idx_contact_messages_created_at ON public.contact_messages (created_at DESC);
