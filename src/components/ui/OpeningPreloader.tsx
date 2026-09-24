"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function OpeningPreloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isZooming, setIsZooming] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock body scrolling during intro sequence
    document.body.style.overflow = "hidden";

    let animationFrameId: number;
    const duration = 2100; // 2.1s duration for crisp, elegant progression
    const startTime = performance.now();

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);

      // Smooth ease-out curve for deceleration into 100%
      const easedProgress = Math.round((1 - Math.pow(1 - progressFraction, 2.5)) * 100);
      setProgress(easedProgress);

      if (progressFraction < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Guarantee 100% display
        setProgress(100);

        // Brief 200ms hold at 100%, then trigger majestic logo zoom-in and landing page open
        setTimeout(() => {
          setIsZooming(true);

          // Complete removal from DOM after zoom-through transition
          setTimeout(() => {
            setIsVisible(false);
            document.body.style.overflow = "";
            window.scrollTo(0, 0);
          }, 1000);
        }, 200);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    // Failsafe timer: unlock body scroll under any circumstance
    const failsafe = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 3800);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(failsafe);
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkip = () => {
    setIsZooming(true);
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 350);
  };

  if (!isVisible) return null;

  return (
    <div
      id="shp-preloader"
      className={`fixed inset-0 z-[9999] bg-[#080705] flex flex-col items-center justify-center select-none overflow-hidden transition-opacity duration-900 ease-out ${
        isZooming ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Loading Sky-High Properties"
      role="dialog"
      aria-modal="true"
    >
      {/* Pure Floating Logo (NO background card, NO container bg, NO borders) */}
      <div
        className={`relative w-48 h-36 sm:w-60 sm:h-44 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isZooming
            ? "scale-[3.2] opacity-0 filter blur-[2px]"
            : "scale-100 opacity-100"
        }`}
      >
        <Image
          src="/assets/sky-high/brand/Sky-High-Properties-logo-transparent.png"
          alt="Sky-High Properties"
          fill
          priority
          sizes="(max-width: 640px) 192px, 240px"
          className="object-contain drop-shadow-[0_4px_30px_rgba(212,175,55,0.3)]"
        />
      </div>

      {/* Brand Typography & Progress (Fades away cleanly when logo zooms in) */}
      <div
        className={`flex flex-col items-center text-center px-6 mt-4 transition-all duration-500 ease-out ${
          isZooming ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        {/* Subtitle */}
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[var(--color-gold-300)] font-medium mb-6">
          Kolkata • Private Advisory
        </p>

        {/* 0 to 100% Progress Line */}
        <div className="w-48 sm:w-56 mb-3">
          <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[var(--color-gold-500)] via-[#F7E7A9] to-[var(--color-gold-400)] transition-[width] duration-75 ease-out shadow-[0_0_12px_rgba(212,175,55,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Percentage Counter */}
        <div className="text-[11px] uppercase tracking-[0.25em] font-mono text-white/50">
          <span className="text-[var(--color-gold-300)] font-semibold">{progress}%</span>
        </div>
      </div>

      {/* Subtle Skip Pill */}
      <button
        onClick={handleSkip}
        type="button"
        className={`absolute bottom-8 z-20 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/35 hover:text-white/80 transition-all duration-300 py-1.5 px-4 rounded-full border border-white/10 hover:border-[var(--color-gold-400)]/40 hover:bg-white/[0.03] cursor-pointer ${
          isZooming ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Skip introduction animation"
      >
        <span>Skip Intro</span>
        <span className="text-[8px] text-[var(--color-gold-400)]/60">✕</span>
      </button>
    </div>
  );
}
