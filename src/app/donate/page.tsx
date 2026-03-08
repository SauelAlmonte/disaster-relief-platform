import { DonateForm } from "@/components/DonateForm";
import { DonateSuccessModalController } from "@/components/DonateSuccessModal";
import { DonateTestModeInfo } from "@/components/DonateTestModeInfo";

export const metadata = {
  title: "Donate - UnitedRelief",
  description: "Support disaster relief efforts. Donate to UnitedRelief.",
};

type PageProps = {
  searchParams: Promise<{ donation_success?: string; first?: string; last?: string }>;
};

export default async function DonatePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const isStripeTestMode =
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith("pk_test_") ??
    false;

  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-4 pt-24 pb-16">
      <DonateSuccessModalController
        donationSuccess={params.donation_success === "1"}
        first={params.first ?? null}
        last={params.last ?? null}
      />
      <section aria-labelledby="donate-heading">
        <h1 id="donate-heading" className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Donate to UnitedRelief
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Your contribution helps us connect disaster victims with resources and
          support. Every donation makes a difference.
        </p>
        <DonateTestModeInfo isTestMode={isStripeTestMode} />
        <div className="mt-8">
          <DonateForm />
        </div>
      </section>
    </div>
  );
}
