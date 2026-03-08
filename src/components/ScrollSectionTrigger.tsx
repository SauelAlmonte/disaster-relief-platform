"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = ["about", "volunteer", "impact", "partners", "testimonials"] as const;

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function ScrollSectionTrigger() {
  const reducedMotion = useReducedMotion();
  const inited = useRef(false);

  useEffect(() => {
    if (inited.current || reducedMotion) return;
    inited.current = true;

    const ctx = gsap.context(() => {
      SECTION_IDS.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;
        const content = section.querySelector<HTMLElement>("[data-scroll-animate]");
        const target = content ?? section;

        gsap.fromTo(
          target,
          {
            opacity: 0,
            y: 56,
            immediateRender: true,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      ScrollTrigger.refresh();
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [reducedMotion]);

  return null;
}
