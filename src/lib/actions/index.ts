"use server";

import { createClient } from "@/lib/supabase/server";
import { sendDonationThankYouEmail } from "@/lib/email";
import { getStripe } from "@/lib/stripe/server";

export type ActionResult = { success: boolean; message?: string };

/** For donate: success + redirect url to Stripe Checkout, or error message */
export type DonateCheckoutResult =
  | { success: true; url: string }
  | { success: false; message: string };

function getString(formData: FormData, key: string): string {
  return (formData.get(key) as string) ?? "";
}

export async function submitReliefRequest(
  formData: FormData
): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("relief_requests").insert({
      first_name: getString(formData, "firstName"),
      last_name: getString(formData, "lastName"),
      email: getString(formData, "email"),
      phone: getString(formData, "phone"),
      city: getString(formData, "city"),
      state: getString(formData, "state"),
      assistance_type: getString(formData, "assistanceType"),
      description: getString(formData, "description"),
    });
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: "Request received. We will be in touch." };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Submission failed.";
    return { success: false, message };
  }
}

export async function submitVolunteer(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("volunteers").insert({
      first_name: getString(formData, "firstName"),
      last_name: getString(formData, "lastName"),
      email: getString(formData, "email"),
      phone: getString(formData, "phone"),
      skills: getString(formData, "skills") || null,
      availability: getString(formData, "availability") || null,
      location: getString(formData, "location") || null,
      notes: getString(formData, "notes") || null,
    });
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: "Thank you for signing up as a volunteer." };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Submission failed.";
    return { success: false, message };
  }
}

const MIN_DONATION_CENTS = 50;
const MAX_DONATION_CENTS = 999_99_99; // 999,999.99

/** Creates a Stripe Checkout Session for donation; redirect user to returned url. */
export async function createDonationCheckoutSession(
  formData: FormData
): Promise<DonateCheckoutResult> {
  try {
    const amountRaw = getString(formData, "amount").replace(/[^0-9.]/g, "");
    const amountDollars = parseFloat(amountRaw) || 0;
    const amountCents = Math.round(amountDollars * 100);
    if (amountCents < MIN_DONATION_CENTS) {
      return { success: false, message: "Minimum donation is $0.50." };
    }
    if (amountCents > MAX_DONATION_CENTS) {
      return { success: false, message: "Amount is too large." };
    }

    const stripe = getStripe();
    const origin = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "http://localhost:3000";
    const customerEmail = getString(formData, "email");
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail || undefined,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amountCents,
            product_data: {
              name: "Donation to UnitedRelief",
              description: "Disaster relief support",
            },
          },
        },
      ],
      metadata: {
        first_name: getString(formData, "firstName"),
        last_name: getString(formData, "lastName"),
        email: customerEmail,
        message: getString(formData, "message") || "",
      },
      success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate`,
    });

    const url = session.url;
    if (!url) {
      return { success: false, message: "Could not create checkout session." };
    }
    return { success: true, url };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Checkout failed.";
    return { success: false, message };
  }
}

export type FulfillDonationResult =
  | { success: true; first_name: string; last_name: string }
  | { success: false; message: string };

/** Call after Stripe redirect with session_id; records donation in Supabase (idempotent). */
export async function fulfillDonationFromSession(
  sessionId: string
): Promise<FulfillDonationResult> {
  try {
    const supabase = await createClient();
    const { data: existing } = await supabase
      .from("donations")
      .select("id, first_name, last_name")
      .eq("stripe_session_id", sessionId)
      .maybeSingle();
    if (existing) {
      return {
        success: true,
        first_name: existing.first_name ?? "",
        last_name: existing.last_name ?? "",
      };
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    if (session.payment_status !== "paid" || !session.amount_total) {
      return { success: false, message: "Payment not completed." };
    }

    const meta = session.metadata ?? {};
    const firstName = (meta.first_name as string) ?? "";
    const lastName = (meta.last_name as string) ?? "";
    const amountDisplay = session.amount_total
      ? `$${(session.amount_total / 100).toFixed(2)}`
      : "";

    const donorEmail = (meta.email as string) ?? "";
    const { error } = await supabase.from("donations").insert({
      first_name: firstName,
      last_name: lastName,
      email: donorEmail,
      amount: amountDisplay,
      message: (meta.message as string) || null,
      stripe_session_id: sessionId,
    });
    if (error) {
      return { success: false, message: error.message };
    }

    if (donorEmail) {
      await sendDonationThankYouEmail(
        donorEmail,
        firstName,
        lastName,
        amountDisplay
      );
    }

    return { success: true, first_name: firstName, last_name: lastName };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not record donation.";
    return { success: false, message };
  }
}

export async function submitContact(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: getString(formData, "name"),
      email: getString(formData, "email"),
      subject: getString(formData, "subject"),
      message: getString(formData, "message"),
    });
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: "Message sent. We will get back to you." };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Submission failed.";
    return { success: false, message };
  }
}

export async function signIn(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const email = getString(formData, "email");
    const password = getString(formData, "password");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      return { success: false, message: error.message };
    }
    return { success: true, message: "Signed in." };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Sign in failed.";
    return { success: false, message };
  }
}

export async function signUp(formData: FormData): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const email = getString(formData, "email");
    const password = getString(formData, "password");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      return { success: false, message: error.message };
    }
    return {
      success: true,
      message:
        "Account created. Check your email to confirm your account, then sign in.",
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Sign up failed.";
    return { success: false, message };
  }
}
