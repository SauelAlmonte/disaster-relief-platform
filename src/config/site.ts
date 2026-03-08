export const siteConfig = {
  name: "UnitedRelief",
  title: "UnitedRelief — Disaster Relief Coordination Platform",
  description:
    "Connect disaster victims with volunteers and resources. Built for response when every second counts.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  nav: [
    { label: "Relief Request", href: "/relief-request" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "About Us", href: "/#about" },
    { label: "Contact Us", href: "/#contact" },
  ] as const,

  /** Section IDs used for scroll-spy (hash links on home page) */
  sectionIds: ["about", "contact"] as const,
} as const;
