import Stripe from "stripe";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("Missing STRIPE_SECRET_KEY. Add it to .env.local for Stripe test mode.");
  }
  return new Stripe(key, { apiVersion: "2024-11-20.acacia" });
}

export { getStripe };
