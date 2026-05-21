"use client";

import { useEffect, useRef, useState } from "react";
import { Gem } from "lucide-react";
import { gsap } from "gsap";

const INTRO_KEY = "aurelia-intro-complete-v1";

const particles = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: 8 + ((index * 17) % 84),
  top: 12 + ((index * 29) % 74),
  delay: (index % 9) * 0.12,
  scale: 0.55 + (index % 5) * 0.14
}));

export default function BootIntro() {
  const [isVisible, setIsVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasSeenIntro = window.sessionStorage.getItem(INTRO_KEY) === "true";

    if (reducedMotion || hasSeenIntro) {
      window.sessionStorage.setItem(INTRO_KEY, "true");
      return;
    }

    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!isVisible || !rootRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          window.sessionStorage.setItem(INTRO_KEY, "true");
          setIsVisible(false);
        }
      });

      timeline
        .fromTo(".intro-vault", { scaleY: 1 }, { scaleY: 0.92, duration: 0.5 })
        .fromTo(".intro-mark", { opacity: 0, scale: 0.72, rotate: -12 }, { opacity: 1, scale: 1, rotate: 0, duration: 0.8 }, "-=0.15")
        .fromTo(".intro-title", { opacity: 0, y: 28, letterSpacing: "0.75em" }, { opacity: 1, y: 0, letterSpacing: "0.32em", duration: 0.9 }, "-=0.45")
        .fromTo(".intro-line", { scaleX: 0 }, { scaleX: 1, duration: 0.7 }, "-=0.35")
        .fromTo(".intro-particle", { opacity: 0, y: 18, scale: 0.4 }, { opacity: 1, y: 0, scale: 1, stagger: 0.018, duration: 0.75 }, "-=0.65")
        .to(".intro-glow", { opacity: 0.95, scale: 1.12, duration: 0.9 }, "-=0.65")
        .to(rootRef.current, { opacity: 0, scale: 1.035, duration: 0.75, ease: "power2.inOut" }, "+=0.85");
    }, rootRef);

    return () => context.revert();
  }, [isVisible]);

  const skipIntro = () => {
    window.sessionStorage.setItem(INTRO_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      className="intro-vault fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-obsidian text-diamond-100"
      role="dialog"
      aria-label="Aurelia Maison intro"
      aria-modal="true"
    >
      <div className="intro-glow absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/18 opacity-40 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,248,213,0.18),transparent_34%),linear-gradient(120deg,rgba(255,255,255,0.05),transparent_45%,rgba(215,166,61,0.08))]" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="intro-particle sparkle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            transform: `scale(${particle.scale})`,
            transitionDelay: `${particle.delay}s`
          }}
        />
      ))}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="intro-mark luxury-border mb-8 grid h-24 w-24 place-items-center rounded-full bg-black/50 shadow-glow">
          <Gem className="h-12 w-12 text-gold-200 drop-shadow-[0_0_24px_rgba(249,231,167,0.55)]" strokeWidth={1.2} />
        </div>
        <p className="intro-title metallic-text font-display text-4xl uppercase tracking-[0.32em] sm:text-6xl">
          Aurelia
        </p>
        <div className="intro-line my-6 h-px w-64 origin-center bg-gold-line" />
        <p className="max-w-md text-xs uppercase tracking-[0.45em] text-diamond-200/80">
          High jewelry atelier
        </p>
      </div>
      <button
        type="button"
        onClick={skipIntro}
        className="absolute bottom-8 right-8 z-20 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.24em] text-diamond-200/75 transition hover:border-gold-300/50 hover:text-gold-100"
      >
        Enter
      </button>
    </div>
  );
}
