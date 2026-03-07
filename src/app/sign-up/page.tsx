import { SignUpForm } from "@/components/SignUpForm";

export const metadata = {
  title: "Sign Up - UnitedRelief",
  description: "Create a UnitedRelief account.",
};

export default function SignUpPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <section aria-labelledby="signup-heading">
        <h1 id="signup-heading" className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Sign Up
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Create an account to get started with UnitedRelief.
        </p>
        <div className="mt-8">
          <SignUpForm />
        </div>
      </section>
    </div>
  );
}
