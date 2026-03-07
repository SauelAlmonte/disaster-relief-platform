import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section
        id="hero"
        className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-zinc-900"
      >
        <div className="absolute inset-0 bg-zinc-900/80" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            UnitedRelief
            <br />
            <span className="text-zinc-300">Built for Response</span>
          </h1>
          <p className="mt-6 text-lg text-zinc-300 sm:text-xl">
            When disaster strikes, we help connect people in need with real-time
            support, verified resources, and compassionate volunteers ready to take
            action.
          </p>
          <Link
            href="/relief-request"
            className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-zinc-900 transition hover:bg-zinc-200"
          >
            Relief Request
          </Link>
        </div>
      </section>

      <section
        id="about"
        className="mx-auto max-w-4xl px-4 py-16"
        aria-labelledby="about-heading"
      >
        <h2 id="about-heading" className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          About UnitedRelief
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          United Relief exists to empower communities in times of crisis. Our
          platform connects disaster victims with volunteers, resources, and relief
          organizations—helping deliver real-time aid when it is needed most.
        </p>
        <h3 className="mt-8 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Our Mission
        </h3>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          We aim to make disaster response seamless and accessible. Whether you are
          a volunteer, a person in need, or an organization offering help, United
          Relief ensures you are connected to the right support when every second
          counts.
        </p>
        <h3 className="mt-8 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          Security and Privacy First
        </h3>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Your privacy and safety matter. We use industry-standard encryption and
          data protection practices to keep your personal information secure.
        </p>
      </section>

      <section
        id="volunteer"
        className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50"
        aria-labelledby="volunteer-heading"
      >
        <div className="mx-auto max-w-4xl px-4 py-16">
          <h2 id="volunteer-heading" className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Get Involved
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Every helping hand counts. Join our community of volunteers to assist in
            emergency response efforts and provide support to those in need.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/volunteer"
              className="rounded-lg bg-zinc-900 px-6 py-3 font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Volunteer
            </Link>
            <Link
              href="/donate"
              className="rounded-lg border border-zinc-300 px-6 py-3 font-semibold text-zinc-900 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              Donate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
