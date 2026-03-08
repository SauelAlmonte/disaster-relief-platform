"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ScrollSectionTrigger } from "@/components/ScrollSectionTrigger";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const VOLUNTEER_IMAGE =
  "https://images.unsplash.com/photo-1588822534638-028d5ddc07ac?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const DONATE_IMAGE =
  "https://images.unsplash.com/photo-1758599668234-68f52db62425?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const PARTNER_LOGOS = [
  { src: "/logos/company-logos/american-red-cross-4.svg", alt: "American Red Cross" },
  { src: "/logos/company-logos/the-travelers-companies-1.svg", alt: "Travelers" },
  { src: "/logos/company-logos/airbnb.svg", alt: "Airbnb" },
  { src: "/logos/company-logos/whatsapp.svg", alt: "WhatsApp" },
  { src: "/logos/company-logos/visa.svg", alt: "Visa" },
  { src: "/logos/company-logos/youtube.svg", alt: "YouTube" },
  { src: "/logos/company-logos/levis.svg", alt: "Levi's" },
  { src: "/logos/company-logos/google.svg", alt: "Google" },
  { src: "/logos/company-logos/liberty-mutual.svg", alt: "Liberty Mutual" },
  { src: "/logos/company-logos/goodwill.svg", alt: "Goodwill" },
  { src: "/logos/company-logos/microsoft.svg", alt: "Microsoft" },
  { src: "/logos/company-logos/coca-cola.svg", alt: "Coca-Cola" },
] as const;

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function HomePage() {
  return (
    <>
      <main className="overflow-hidden">
        <ScrollSectionTrigger />
        {/* Decorative orbs - desktop only */}
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-60 contain-strict lg:block pointer-events-none"
        >
          <div className="absolute left-0 top-0 h-80 w-80 -translate-y-1/2 -rotate-45 rounded-full bg-[radial-gradient(68%_68%_at_55%_31%,var(--color-primary)/15%_0,var(--color-primary)/5%_50%,transparent_80%)]" />
          <div className="absolute left-0 top-0 h-80 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,var(--color-accent)/10%_0,var(--color-accent)/3%_80%,transparent_100%)] [translate:5%_-50%]" />
        </div>

        <section
          id="hero"
          className="section-cinematic-hero relative flex min-h-dvh flex-col bg-background"
        >
          <div className="relative z-10 flex min-h-dvh flex-1 flex-col pt-24 md:pt-36 pb-16 md:pb-24">
            <div className="mx-auto w-full max-w-6xl flex-1 px-4 md:px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    href="/#about"
                    className="bg-muted hover:bg-muted/80 group mx-auto flex w-fit items-center gap-4 rounded-full border border-border p-1 pl-4 shadow-md transition-colors duration-300"
                  >
                    <span className="text-sm text-foreground">
                      When every second counts
                    </span>
                    <span className="block h-4 w-0.5 border-l border-border bg-muted-foreground/30" />
                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" aria-hidden />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" aria-hidden />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedGroup>

                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-bold tracking-tight max-md:font-semibold md:text-7xl lg:mt-16 xl:text-[5.25rem] text-foreground"
                >
                  {siteConfig.name}
                </TextEffect>
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.2}
                  as="p"
                  className="mx-auto mt-4 text-balance text-2xl md:text-3xl text-muted-foreground"
                >
                  Built for Response
                </TextEffect>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground"
                >
                  When disaster strikes, we help connect people in need with
                  real-time support, verified resources, and compassionate
                  volunteers ready to take action.
                </TextEffect>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row"
                >
                  <div className="rounded-[calc(var(--radius-xl)+0.125rem)] border border-border bg-foreground/10 p-0.5">
                    <Link
                      href="/relief-request"
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "rounded-xl px-6"
                      )}
                    >
                      <span className="text-nowrap">Relief Request</span>
                    </Link>
                  </div>
                  <Link
                    href="/volunteer"
                    className={cn(
                      buttonVariants({ size: "lg", variant: "outline" }),
                      "rounded-xl px-6"
                    )}
                  >
                    <span className="text-nowrap">Volunteer</span>
                  </Link>
                  <Link
                    href="/donate"
                    className={cn(
                      buttonVariants({ size: "lg", variant: "ghost" }),
                      "rounded-xl px-6"
                    )}
                  >
                    <span className="text-nowrap">Donate</span>
                  </Link>
                </AnimatedGroup>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <a
              href="#about"
              aria-label="Scroll to about section"
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
            >
              <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
              <span className="w-px h-8 bg-linear-to-b from-primary to-transparent group-hover:h-12 transition-all duration-300" />
              <ArrowDown className="h-4 w-4 motion-reduce:animate-none animate-bounce" aria-hidden />
            </a>
          </div>
        </section>

        <section
          id="about"
          className="section-cinematic-about relative bg-muted flex min-h-dvh w-full flex-col justify-center overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
          aria-labelledby="about-heading"
          aria-label="About UnitedRelief"
        >
          <div className="relative z-10 mx-auto w-full max-w-6xl space-y-8" data-scroll-animate>
            <SectionHeading
              headingId="about-heading"
              label="About"
              title="About UnitedRelief"
              subtitle="United Relief exists to empower communities in times of crisis. Our platform connects disaster victims with volunteers, resources, and relief organizations—helping deliver real-time aid when it is needed most."
            />
            <div className="space-y-8 text-muted-foreground">
            <div>
            <h3 id="about-mission" className="text-xl font-semibold text-foreground">
              Our Mission
            </h3>
            <p className="mt-2">
              We aim to make disaster response seamless and accessible. Whether
              you are a volunteer, a person in need, or an organization offering
              help, United Relief ensures you are connected to the right support
              when every second counts.
            </p>
            </div>
            <div>
            <h3 id="about-security" className="text-xl font-semibold text-foreground">
              Security and Privacy First
            </h3>
            <p className="mt-2">
              Your privacy and safety matter. We use industry-standard encryption
              and data protection practices to keep your personal information
              secure.
            </p>
            </div>
            </div>
          </div>
        </section>

        <section
          id="volunteer"
          className="section-cinematic-volunteer relative border-t border-border bg-muted/50 flex min-h-dvh w-full flex-col justify-center overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
          aria-labelledby="volunteer-heading"
          aria-label="Get Involved"
        >
          <div className="relative z-10 mx-auto w-full max-w-6xl space-y-16 lg:space-y-24" data-scroll-animate>
            <SectionHeading
              headingId="volunteer-heading"
              label="Get Involved"
              title="Volunteer or Donate"
              subtitle="Every helping hand counts. Join our community of volunteers to assist in emergency response efforts and provide support to those in need."
            />

            {/* Row 1: Volunteer — image left, content right */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-muted">
                <Image
                  src={DONATE_IMAGE}
                  alt="Volunteers working together during disaster relief efforts"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={false}
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <h3 id="get-involved-volunteer" className="text-2xl font-semibold text-foreground sm:text-3xl">
                  Volunteer
                </h3>
                <p className="text-muted-foreground">
                  Lend your time and skills when it matters most. From on-the-ground support to remote coordination, there are many ways to help communities in crisis.
                </p>
                <div>
                  <Link
                    href="/volunteer"
                    className={cn(buttonVariants({ size: "lg" }), "rounded-lg px-6")}
                  >
                    Volunteer
                  </Link>
                </div>
              </div>
            </div>

            {/* Row 2: Donate — content left, image right */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
              <div className="flex flex-col justify-center space-y-4 text-left lg:items-end lg:text-right">
                <h3 id="get-involved-donate" className="text-2xl font-semibold text-foreground sm:text-3xl">
                  Donate
                </h3>
                <p className="text-muted-foreground">
                  Financial support helps us deploy resources quickly and sustain long-term recovery programs. Every contribution makes a difference.
                </p>
                <div>
                  <Link
                    href="/donate"
                    className={cn(
                      buttonVariants({ size: "lg", variant: "outline" }),
                      "rounded-lg px-6"
                    )}
                  >
                    Donate
                  </Link>
                </div>
              </div>
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-muted">
                <Image
                  src={VOLUNTEER_IMAGE}
                  alt="Community support and donations for disaster relief"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="impact"
          className="section-impact-bg relative flex min-h-dvh w-full flex-col justify-center overflow-hidden border-t border-white/10 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
          aria-labelledby="impact-heading"
          aria-label="Our Impact and Results"
        >
          <div className="relative z-10 mx-auto w-full max-w-6xl space-y-10 text-white [&_.text-primary]:text-white/90! [&_.text-foreground]:text-white! [&_.text-muted-foreground]:text-white/90!" data-scroll-animate>
            <SectionHeading
              headingId="impact-heading"
              label="Impact"
              title="Our Impact and Results"
              subtitle="At United Relief, our mission is to make a real, measurable difference in times of crisis. We are proud to share the impact we have had so far. With the support of our community, partners, and volunteers, we have been able to provide life-saving assistance to those who need it the most."
            />
            <div className="space-y-6">
              <h3 id="impact-achievements" className="text-center text-xl font-semibold sm:text-2xl">
                Key Achievements
              </h3>
              <ul
                className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2"
                aria-labelledby="impact-achievements"
              >
                <li className="flex gap-3 rounded-lg bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <span className="shrink-0 font-bold text-white">50,000+</span>
                  <span className="text-white/95">
                    people helped: Through the efforts of our dedicated volunteers and partners, we have provided immediate aid to over 50,000 disaster victims.
                  </span>
                </li>
                <li className="flex gap-3 rounded-lg bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <span className="shrink-0 font-bold text-white">1,000+</span>
                  <span className="text-white/95">
                    volunteers mobilized: Volunteers have given thousands of hours to support emergency response and relief operations.
                  </span>
                </li>
                <li className="flex gap-3 rounded-lg bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <span className="shrink-0 font-bold text-white">$2 million</span>
                  <span className="text-white/95">
                    in donations: Thanks to generous donors, we have raised over $2 million to fund relief operations across the globe.
                  </span>
                </li>
                <li className="flex gap-3 rounded-lg bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <span className="shrink-0 font-bold text-white">500+</span>
                  <span className="text-white/95">
                    organizations involved: We have collaborated with over 500 organizations worldwide to provide essential resources and services during emergencies.
                  </span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 id="impact-ongoing" className="text-center text-xl font-semibold sm:text-2xl">
                Our Ongoing Efforts
              </h3>
              <p className="mx-auto max-w-3xl text-center text-white/95 text-base leading-relaxed sm:text-lg">
                Our work does not stop here. We are constantly striving to expand our reach, improve our systems, and enhance our services to ensure we can respond effectively during the next crisis.
              </p>
            </div>
          </div>
        </section>

        <section
          id="partners"
          className="section-partners-bg relative flex min-h-dvh w-full flex-col justify-center overflow-hidden border-t border-border px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
          aria-labelledby="partners-heading"
          aria-label="Our Partners and Sponsors"
        >
          <div className="relative z-10 mx-auto w-full max-w-6xl space-y-10" data-scroll-animate>
            <SectionHeading
              headingId="partners-heading"
              label="Partners"
              title="Our Partners and Sponsors"
              subtitle="United Relief is proud to work with a dedicated network of partners and sponsors who help make our mission possible. Together, we combine our resources, expertise, and networks to provide life-saving support to those in need during emergencies."
            />
            <div className="space-y-4">
              <h3 className="text-center text-xl font-semibold text-foreground sm:text-2xl">
                Our Trusted Partners and Sponsors
              </h3>
              <p className="text-center text-muted-foreground text-sm sm:text-base">
                We are proud to collaborate with these incredible partners and sponsors.
              </p>
            </div>
            <div className="relative -mx-4 overflow-hidden py-6 sm:-mx-6 lg:-mx-8">
              <div className="partner-carousel-track flex w-max gap-12 px-4 sm:gap-16 sm:px-6 lg:gap-20 lg:px-8">
                {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
                  <div
                    key={i}
                    className="flex h-16 w-24 shrink-0 items-center justify-center sm:h-20 sm:w-28"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={112}
                      height={80}
                      className="size-full object-contain object-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="section-cinematic-testimonials relative flex min-h-dvh w-full flex-col justify-center overflow-hidden border-t border-border bg-background px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
          aria-labelledby="testimonials-heading"
          aria-label="Success Stories and Testimonials"
        >
          <div className="relative z-10 mx-auto w-full max-w-6xl space-y-10" data-scroll-animate>
            <SectionHeading
              headingId="testimonials-heading"
              label="Stories"
              title="Success Stories and Testimonials"
              subtitle="At United Relief, we are privileged to have helped countless individuals and families during their most difficult times. Here are some stories from the people whose lives have been impacted by our disaster relief efforts."
            />
            <div className="space-y-6">
              <h3 id="testimonials-quotes" className="text-center text-xl font-semibold text-accent sm:text-2xl">
                What Our Volunteers and Recipients Say
              </h3>
              <ul className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch" aria-labelledby="testimonials-quotes">
                <li className="flex min-h-0">
                  <blockquote className="flex min-h-full w-full flex-col rounded-xl border border-border bg-muted/50 px-5 py-4 shadow-sm sm:px-6 sm:py-5">
                    <p className="text-foreground flex-1 italic leading-relaxed">
                      United Relief was there when we needed them the most. The support we received after the hurricane saved lives, and the volunteers were so kind and dedicated. Thank you for everything!
                    </p>
                    <footer className="mt-3 shrink-0 text-right text-muted-foreground text-sm not-italic">
                      — Sarah M., Hurricane Relief Recipient
                    </footer>
                  </blockquote>
                </li>
                <li className="flex min-h-0">
                  <blockquote className="flex min-h-full w-full flex-col rounded-xl border border-border bg-muted/50 px-5 py-4 shadow-sm sm:px-6 sm:py-5">
                    <p className="text-foreground flex-1 italic leading-relaxed">
                      As a volunteer with United Relief, I have seen the power of helping hands firsthand. It is amazing to be part of something that makes such a huge difference in people&apos;s lives. I am proud to be a part of this community!
                    </p>
                    <footer className="mt-3 shrink-0 text-right text-muted-foreground text-sm not-italic">
                      — John D., Volunteer
                    </footer>
                  </blockquote>
                </li>
                <li className="flex min-h-0">
                  <blockquote className="flex min-h-full w-full flex-col rounded-xl border border-border bg-muted/50 px-5 py-4 shadow-sm sm:px-6 sm:py-5">
                    <p className="text-foreground flex-1 italic leading-relaxed">
                      United Relief helped us provide food and medical supplies to thousands of people in need. Their quick response and organization were key to our success during the crisis.
                    </p>
                    <footer className="mt-3 shrink-0 text-right text-muted-foreground text-sm not-italic">
                      — Jane K., NGO Partner
                    </footer>
                  </blockquote>
                </li>
              </ul>
            </div>
            <div className="space-y-3 text-center">
              <h3 className="text-xl font-semibold text-accent sm:text-2xl">
                Share Your Story
              </h3>
              <p className="mx-auto max-w-2xl text-muted-foreground text-base leading-relaxed sm:text-lg">
                If you have been part of our relief efforts and would like to share your experience, please reach out to us. Your story could inspire others to get involved or help those in need.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
