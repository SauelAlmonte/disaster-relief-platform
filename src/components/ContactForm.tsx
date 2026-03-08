"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContact } from "@/lib/actions";
import { useState } from "react";
import { FormSuccessModal } from "@/components/FormSuccessModal";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
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
    Object.entries(data).forEach(([key, value]) => formData.append(key, String(value)));
    const result = await submitContact(formData);
    if (result.success) {
      setSubmittedName(data.name);
      setShowSuccess(true);
      reset();
    } else {
      setMessage({ type: "error", text: result.message ?? "Failed to send." });
    }
  }

  return (
    <>
      {showSuccess && (
        <FormSuccessModal
          title="Message sent"
          body={
            submittedName
              ? `Thank you, ${submittedName}. We have received your message and will get back to you soon.`
              : "Thank you. We have received your message and will get back to you soon."
          }
          onClose={() => setShowSuccess(false)}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          placeholder="e.g. Jordan Rivera"
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <span id="name-error" role="alert" className="mt-1 block text-sm text-red-600">
            {errors.name.message}
          </span>
        )}
      </div>

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
        <label htmlFor="subject" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          {...register("subject")}
          placeholder="Brief summary of your question or request"
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject && (
          <span id="subject-error" role="alert" className="mt-1 block text-sm text-red-600">
            {errors.subject.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          placeholder="Share details about how we can help."
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <span id="message-error" role="alert" className="mt-1 block text-sm text-red-600">
            {errors.message.message}
          </span>
        )}
      </div>

      {message && message.type === "error" && (
        <div
          role="alert"
          className={`rounded-md p-4 ${
            message.type === "success"
              ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-zinc-900 px-6 py-3 font-semibold text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
      </form>
    </>
  );
}
