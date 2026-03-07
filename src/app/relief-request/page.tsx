import { ReliefRequestForm } from "@/components/ReliefRequestForm";
import { PageTransition } from "@/components/PageTransition";

export const metadata = {
  title: "Relief Request - UnitedRelief",
  description: "Request emergency relief assistance. UnitedRelief connects you with support.",
};

export default function ReliefRequestPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-2xl px-4 py-12">
        <section aria-labelledby="relief-heading">
          <h1 id="relief-heading" className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Request Emergency Relief
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            If you or your community has been affected by a disaster, please fill out
            the form below. UnitedRelief will connect you with the support you need.
          </p>
          <div className="mt-8">
            <ReliefRequestForm />
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
