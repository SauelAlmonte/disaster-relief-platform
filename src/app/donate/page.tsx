import { DonateForm } from "@/components/DonateForm";

export const metadata = {
  title: "Donate - UnitedRelief",
  description: "Support disaster relief efforts. Donate to UnitedRelief.",
};

export default function DonatePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <section aria-labelledby="donate-heading">
        <h1 id="donate-heading" className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Donate to UnitedRelief
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Your contribution helps us connect disaster victims with resources and
          support. Every donation makes a difference.
        </p>
        <div className="mt-8">
          <DonateForm />
        </div>
      </section>
    </div>
  );
}
