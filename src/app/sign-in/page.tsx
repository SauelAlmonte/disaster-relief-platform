import { SignInForm } from "@/components/SignInForm";

export const metadata = {
  title: "Sign In - UnitedRelief",
  description: "Sign in to your UnitedRelief account.",
};

export default function SignInPage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col px-4 pt-24 pb-16">
      <section aria-labelledby="signin-heading">
        <h1 id="signin-heading" className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Sign In
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Sign in to your UnitedRelief account to manage your submissions.
        </p>
        <div className="mt-8">
          <SignInForm />
        </div>
      </section>
    </div>
  );
}
