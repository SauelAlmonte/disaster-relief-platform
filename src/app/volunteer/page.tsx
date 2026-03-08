import { VolunteerForm } from "@/components/VolunteerForm";

export const metadata = {
  title: "Volunteer - UnitedRelief",
  description: "Sign up to volunteer with UnitedRelief. Help communities in crisis.",
};

export default function VolunteerPage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-4 pt-24 pb-16">
      <section aria-labelledby="volunteer-heading">
        <h1 id="volunteer-heading" className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Volunteer with UnitedRelief
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Thank you for your interest in helping communities affected by disaster.
          Fill out the form below to get started.
        </p>
        <div className="mt-8">
          <VolunteerForm />
        </div>
      </section>
    </div>
  );
}
