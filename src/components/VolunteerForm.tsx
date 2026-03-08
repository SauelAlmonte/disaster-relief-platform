"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitVolunteer } from "@/lib/actions";
import { useState } from "react";
import { FormSuccessModal } from "@/components/FormSuccessModal";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  skills: z.string().optional(),
  availability: z.string().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function VolunteerForm() {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setMessage(null);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, String(value));
    });
    const result = await submitVolunteer(formData);
    if (result.success) {
      setSubmittedName(`${data.firstName} ${data.lastName}`.trim());
      setShowSuccess(true);
      reset();
    } else {
      setMessage({ type: "error", text: result.message ?? "Submission failed." });
    }
  }

  return (
    <>
      {showSuccess && (
        <FormSuccessModal
          title="Volunteer form received"
          body={
            submittedName
              ? `Thank you, ${submittedName}. Our team will review your information and contact you with next steps.`
              : "Thank you for volunteering. Our team will review your information and contact you with next steps."
          }
          onClose={() => setShowSuccess(false)}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            {...register("firstName")}
            placeholder="e.g. Jordan"
            className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName && (
            <span id="firstName-error" role="alert" className="mt-1 block text-sm text-red-600">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            {...register("lastName")}
            placeholder="e.g. Rivera"
            className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName && (
            <span id="lastName-error" role="alert" className="mt-1 block text-sm text-red-600">
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="you@example.com"
            className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" role="alert" className="mt-1 block text-sm text-red-600">
              {errors.email.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="e.g. (555) 555-1234"
            className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <span id="phone-error" role="alert" className="mt-1 block text-sm text-red-600">
              {errors.phone.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Skills (optional)
        </label>
        <input
          id="skills"
          type="text"
          {...register("skills")}
          placeholder="e.g. First aid, logistics, translation"
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
        />
      </div>

      <div>
        <label htmlFor="availability" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Availability (optional)
        </label>
        <input
          id="availability"
          type="text"
          {...register("availability")}
          placeholder="e.g. Weekends, evenings"
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Location (optional)
        </label>
        <input
          id="location"
          type="text"
          {...register("location")}
          placeholder="City, State"
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Additional Notes (optional)
        </label>
        <textarea
          id="notes"
          rows={4}
          {...register("notes")}
          placeholder="Share anything else we should know about your availability or skills."
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
        />
      </div>

      {message && message.type === "error" && (
        <div
          role="alert"
          className="rounded-md p-4 bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300"
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-zinc-900 px-6 py-3 font-semibold text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {isSubmitting ? "Submitting..." : "Submit Volunteer Form"}
      </button>
      </form>
    </>
  );
}
