import Link from "next/link";
import { ArrowUp, ChevronDown, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/site";

const SOCIAL_LINKS = [
  { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://youtube.com", label: "YouTube", Icon: Youtube },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
] as const;

const CONTRIBUTORS = [
  {
    name: "Sauel Almonte",
    href: "https://www.linkedin.com/in/sauel-almonte/",
  },
  {
    name: "Michelle Quashie",
    href: "https://www.linkedin.com/in/michellequashie/",
  },
  {
    name: "Imran Masud",
    href: "https://www.linkedin.com/in/imran-masud-im/",
  },
  {
    name: "Jamaal Foster",
    href: "https://www.linkedin.com/in/jw-foster/",
  },
  {
    name: "Ahmet Aygun",
    href: "https://www.linkedin.com/in/ahmet-aygun/",
  },
  {
    name: "Nathnael G. Girma",
    href: "https://www.linkedin.com/in/nathnael-girma/",
  },
] as const;

const GET_INVOLVED_LINKS = [
  { href: "/relief-request", label: "Relief Request" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/donate", label: "Donate" },
  { href: "/#partners", label: "Partners & Sponsors" },
] as const;

const COMPANY_LINKS = [
  { href: "/#about", label: "About Us" },
  { href: "/#impact", label: "Our Impact" },
  { href: "/#testimonials", label: "Success Stories" },
  { href: "/#contact", label: "Contact Us" },
] as const;

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

const linkClass =
  "text-sm text-white/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a2530]";

export function Footer() {
  return (
    <footer
      id="contact"
      className="footer-cinematic relative text-white"
      role="contentinfo"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-16 pb-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold tracking-tight">
              {siteConfig.name}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/85">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-3" aria-label="Social media">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a2530]"
                  aria-label={`${siteConfig.name} on ${label}`}
                >
                  <Icon className="size-5" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Contributors column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contributors
            </h3>
            <ul
              className="mt-5 space-y-3"
              aria-label="Project collaborators"
            >
              {CONTRIBUTORS.map(({ name, href }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                    aria-label={`${name} on LinkedIn`}
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get Involved
            </h3>
            <ul className="mt-5 space-y-3">
              {GET_INVOLVED_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {COMPANY_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider with chevron */}
        <div className="relative mt-14 flex items-center justify-center border-t border-white/15 pt-10">
          <span
            className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a2530] px-2 py-0.5"
            aria-hidden
          >
            <ChevronDown className="size-4 text-white/60" />
          </span>
        </div>

        {/* Bottom bar: copyright + legal + back to top */}
        <div className="flex flex-col items-center justify-between gap-5 py-6 sm:flex-row sm:gap-8">
          <p className="text-center text-sm text-white/70 sm:text-left">
            Copyright &copy; {new Date().getFullYear()} UnitedRelief. All Rights
            Reserved.
          </p>
          <div className="flex items-center gap-6">
            <nav aria-label="Legal links">
              <ul className="flex flex-wrap items-center justify-center gap-6 sm:justify-end sm:gap-8">
                {LEGAL_LINKS.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className={`${linkClass} text-white/70`}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href="#top"
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white/80 shadow-sm shadow-black/40 transition-all duration-150 hover:bg-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a2530]"
            >
              <ArrowUp className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
