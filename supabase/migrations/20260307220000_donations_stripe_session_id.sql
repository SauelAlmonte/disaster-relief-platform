-- Add Stripe Checkout session id to donations for idempotent fulfillment
ALTER TABLE public.donations
  ADD COLUMN IF NOT EXISTS stripe_session_id text UNIQUE;

CREATE UNIQUE INDEX IF NOT EXISTS donations_stripe_session_id_key
  ON public.donations (stripe_session_id)
  WHERE stripe_session_id IS NOT NULL;
