import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "Contact - UnitedRelief",
  description: "Get in touch with UnitedRelief. We are here to help.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <section aria-labelledby="contact-heading">
        <h1 id="contact-heading" className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Contact Us
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Have questions or need assistance? Send us a message and we will get back
          to you as soon as possible.
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
