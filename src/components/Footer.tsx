import Link from "next/link";

const footerLinks = [
  { href: "/relief-request", label: "Relief Request" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" },
  { href: "/sign-in", label: "Sign In" },
  { href: "/sign-up", label: "Sign Up" },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              UnitedRelief
            </h2>
            <p className="mt-2 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
              Connecting disaster victims with volunteers and resources when every
              second counts.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-700">
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-500">
            UnitedRelief. Built for response.
          </p>
        </div>
      </div>
    </footer>
  );
}
