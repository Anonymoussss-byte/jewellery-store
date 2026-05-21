"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

export default function MotionOrchestrator() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
      });
      return;
    }

    let context: gsap.Context | undefined;
    let mounted = true;

    const setup = async () => {
      const scrollTriggerModule = await import("gsap/ScrollTrigger");

      if (!mounted) {
        return;
      }

      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      gsap.ticker.lagSmoothing(700, 32);

      context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 44 },
            {
              opacity: 1,
              y: 0,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 82%",
                once: true
              }
            }
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
          gsap.to(element, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8
            }
          });
        });
      });
    };

    void setup();

    return () => {
      mounted = false;
      context?.revert();
    };
  }, []);

  return null;
}
