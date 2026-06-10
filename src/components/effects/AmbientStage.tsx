"use client";

import { useEffect, useMemo, useRef } from "react";

const particleSeeds = [
  [8, 18, 0.9, 0],
  [18, 74, 0.65, 1.4],
  [26, 38, 0.7, 2.1],
  [41, 16, 0.55, 0.8],
  [52, 81, 0.75, 1.8],
  [67, 31, 0.6, 0.4],
  [78, 68, 0.8, 2.8],
  [88, 22, 0.52, 1.1],
  [94, 54, 0.68, 2.5],
  [12, 48, 0.48, 2.2],
  [34, 90, 0.44, 0.2],
  [73, 9, 0.5, 1.6]
];

export default function AmbientStage() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const particles = useMemo(
    () =>
      particleSeeds.map(([left, top, opacity, delay], index) => ({
        id: index,
        left,
        top,
        opacity,
        delay
      })),
    []
  );

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      return;
    }

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const tick = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;

      // Only update DOM if distance is significant
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        if (glowRef.current) {
          // 56rem = 896px, half is 448px
          glowRef.current.style.transform = `translate3d(${currentX - 448}px, ${currentY - 448}px, 0)`;
        }

        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${currentX - 22}px, ${currentY - 22}px, 0)`;
        }
        
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${targetX - 3}px, ${targetY - 3}px, 0)`;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const isInteractive = target?.closest("a, button, input, select, textarea");
      cursorRef.current?.classList.toggle("scale-150", Boolean(isInteractive));
      cursorRef.current?.classList.toggle("border-gold-200/70", Boolean(isInteractive));
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div aria-hidden="true" className="noise-overlay" />
      
      {/* GPU Accelerated Mouse Glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="gpu-layer pointer-events-none fixed left-0 top-0 z-0 hidden h-[56rem] w-[56rem] rounded-full md:block"
        style={{
          background: "radial-gradient(circle, rgba(215, 166, 61, 0.12) 0%, transparent 28rem)"
        }}
      />

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="gpu-layer absolute left-[-12%] top-0 h-[46rem] w-[82rem] -rotate-12 bg-[radial-gradient(ellipse_at_center,rgba(215,166,61,0.12)_0%,transparent_60%)] animate-aurora" />
        <div className="gpu-layer absolute bottom-[-10rem] right-[-18%] h-[38rem] w-[70rem] rotate-12 bg-[radial-gradient(ellipse_at_center,rgba(220,232,247,0.09)_0%,transparent_60%)] animate-aurora [animation-delay:4s]" />
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="sparkle animate-sparkle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              opacity: particle.opacity,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-11 w-11 rounded-full border border-gold-300/35 transition-[border-color,transform] duration-200 md:block"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[71] hidden h-1.5 w-1.5 rounded-full bg-gold-200 shadow-glow md:block"
      />
    </>
  );
}
