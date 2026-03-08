"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { useScrolled } from "@/hooks/useScrolled";
import { useActiveSection } from "@/hooks/useActiveSection";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolled = useScrolled(50);
  const activeSection = useActiveSection([...siteConfig.sectionIds]);

  const isHashLink = (href: string) => href.startsWith("/#");
  const getSectionId = (href: string) => href.replace("/#", "");
  const isNavItemActive = (href: string) =>
    isHashLink(href) ? activeSection === getSectionId(href) : pathname === href;

  return (
    <header id="top">
      <nav
        data-state={menuOpen ? "active" : undefined}
        className="fixed z-20 w-full px-2"
        aria-label="Main navigation"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-4 transition-all duration-300 lg:px-12",
            isScrolled &&
              "max-w-4xl rounded-2xl border border-border bg-background/80 backdrop-blur-lg lg:px-6"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                className="text-xl font-semibold text-foreground hover:text-muted-foreground"
                aria-label={`${siteConfig.name} home`}
              >
                {siteConfig.name}
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="header-menu"
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Menu
                  className="m-auto size-6 duration-200 data-[state=active]:pointer-events-none data-[state=active]:rotate-180 data-[state=active]:scale-0 data-[state=active]:opacity-0"
                  data-state={menuOpen ? "active" : undefined}
                  aria-hidden
                />
                <X
                  className="absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200 data-[state=active]:rotate-0 data-[state=active]:scale-100 data-[state=active]:opacity-100"
                  data-state={menuOpen ? "active" : undefined}
                  aria-hidden
                />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm" role="list">
                {siteConfig.nav.map((item) => {
                  const isActive = isNavItemActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "relative block px-1 py-2 text-sm font-medium duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                        {isActive && (
                          <span
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"
                            aria-hidden
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div
              className={cn(
                "mb-6 hidden w-full flex-wrap items-center justify-end gap-4 rounded-3xl border border-border bg-card p-6 shadow-lg md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:rounded-none lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none",
                "data-[state=active]:flex"
              )}
              data-state={menuOpen ? "active" : undefined}
              id="header-menu"
            >
              <div className="lg:hidden w-full">
                <ul className="space-y-6 text-base" role="list">
                  {siteConfig.nav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground block duration-150 py-2"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end md:w-fit">
                <ThemeSwitcher />
                <Link
                  href="/donate"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "w-full sm:w-auto"
                  )}
                >
                  Donate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
