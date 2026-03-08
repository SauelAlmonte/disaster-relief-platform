"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitReliefRequest } from "@/lib/actions";
import { useState } from "react";
import { FormSuccessModal } from "@/components/FormSuccessModal";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  assistanceType: z.string().min(1, "Type of assistance is required"),
  description: z.string().min(1, "Describe your situation"),
  confirmed: z.boolean().refine((v) => v === true, { message: "You must confirm" }),
});

type FormData = z.infer<typeof schema>;

export function ReliefRequestForm() {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { confirmed: false },
  });

  async function onSubmit(data: FormData) {
    setMessage(null);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "confirmed" && value !== undefined) formData.append(key, String(value));
    });
    const result = await submitReliefRequest(formData);
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
          title="Relief request submitted"
          body={
            submittedName
              ? `Thank you, ${submittedName}. Our team is reviewing your request and will follow up as soon as possible.`
              : "Thank you. Our team is reviewing your request and will follow up as soon as possible."
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

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            City
          </label>
          <input
            id="city"
            type="text"
            {...register("city")}
            placeholder="e.g. Houston"
            className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? "city-error" : undefined}
          />
          {errors.city && (
            <span id="city-error" role="alert" className="mt-1 block text-sm text-red-600">
              {errors.city.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            State
          </label>
          <input
            id="state"
            type="text"
            {...register("state")}
            placeholder="e.g. TX"
            className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
            aria-invalid={!!errors.state}
            aria-describedby={errors.state ? "state-error" : undefined}
          />
          {errors.state && (
            <span id="state-error" role="alert" className="mt-1 block text-sm text-red-600">
              {errors.state.message}
            </span>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="assistanceType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Type of Assistance Needed
        </label>
        <input
          id="assistanceType"
          type="text"
          {...register("assistanceType")}
          placeholder="e.g. Food, Shelter, Medical"
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          aria-invalid={!!errors.assistanceType}
          aria-describedby={errors.assistanceType ? "assistanceType-error" : undefined}
        />
        {errors.assistanceType && (
          <span id="assistanceType-error" role="alert" className="mt-1 block text-sm text-red-600">
            {errors.assistanceType.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Describe Your Situation
        </label>
        <textarea
          id="description"
          rows={5}
          {...register("description")}
          placeholder="Provide details about the disaster, who is affected, and what support is needed."
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? "description-error" : undefined}
        />
        {errors.description && (
          <span id="description-error" role="alert" className="mt-1 block text-sm text-red-600">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="flex items-start gap-3">
        <input
          id="confirmed"
          type="checkbox"
          {...register("confirmed")}
          className="mt-1 h-4 w-4 rounded border-zinc-300"
          aria-invalid={!!errors.confirmed}
          aria-describedby={errors.confirmed ? "confirmed-error" : undefined}
        />
        <label htmlFor="confirmed" className="text-sm text-zinc-700 dark:text-zinc-300">
          I confirm that the information provided is accurate.
        </label>
        {errors.confirmed && (
          <span id="confirmed-error" role="alert" className="block text-sm text-red-600">
            {errors.confirmed.message}
          </span>
        )}
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
        {isSubmitting ? "Submitting..." : "Submit Relief Request"}
      </button>
      </form>
    </>
  );
}
