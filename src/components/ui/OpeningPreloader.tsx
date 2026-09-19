"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function OpeningPreloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user has already seen the preloader during this browser session
    try {
      const hasSeen = sessionStorage.getItem("shp_preloader_seen");
      if (hasSeen === "true") {
        setIsVisible(false);
        return;
      }
    } catch {
      // Ignore storage access errors in private/incognito mode
    }

    // Lock body scrolling during intro sequence
    document.body.style.overflow = "hidden";

    // Progress counter with smooth easing for organic cinematic feel
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const step = prev < 60 ? 4 : prev < 90 ? 3 : 2;
        return Math.min(prev + step, 100);
      });
    }, 60);

    // Trigger graceful cinematic dissolve
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
      try {
        sessionStorage.setItem("shp_preloader_seen", "true");
      } catch {}
    }, 2500);

    // Complete removal from DOM after transition
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 3400);

    // Absolute failsafe (never block the user under any circumstance)
    const failsafe = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 3900);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      clearTimeout(failsafe);
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem("shp_preloader_seen", "true");
      } catch {}
    }, 350);
  };

  if (!isVisible) return null;

  // Dynamic luxury micro-status text
  const getStatusText = () => {
    if (progress < 45) return "CURATING PRIME PORTFOLIO";
    if (progress < 85) return "CALIBRATING ARCHITECTURAL ENCLAVES";
    return "WELCOME TO SKY-HIGH PROPERTIES";
  };

  return (
    <div
      id="shp-luxury-preloader"
      className={`fixed inset-0 z-[9999] bg-[#070605] flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-900 ease-out ${
        isFadingOut
          ? "opacity-0 scale-105 pointer-events-none filter blur-sm"
          : "opacity-100 scale-100"
      }`}
      aria-label="Loading Sky-High Properties"
      role="dialog"
      aria-modal="true"
    >
      {/* Background Radial Luxury Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(212,175,55,0.12) 0%, rgba(18,16,13,0.7) 50%, #070605 100%)",
        }}
      />

      {/* Pulsing Warm Amber Ambient Aura */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] pointer-events-none animate-luxury-halo" />

      {/* Architectural Corner Framing Accents (Luxury Certificate / Watchmaker aesthetic) */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-[var(--color-gold-400)]/30 pointer-events-none" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-[var(--color-gold-400)]/30 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-[var(--color-gold-400)]/30 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-[var(--color-gold-400)]/30 pointer-events-none" />

      {/* Main Brand Core */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md">
        {/* Crest & Logo Enclosure with Golden Light Shimmer */}
        <div className="relative w-44 h-32 sm:w-56 sm:h-36 mb-6 overflow-hidden flex items-center justify-center">
          {/* Logo with gold drop glow */}
          <div className="relative w-full h-full">
            <Image
              src="/assets/sky-high/brand/Sky-High-Properties-logo-transparent.png"
              alt="Sky-High Properties"
              fill
              priority
              sizes="(max-width: 640px) 176px, 224px"
              className="object-contain drop-shadow-[0_8px_30px_rgba(212,175,55,0.35)]"
            />
          </div>

          {/* Diagonal Golden Shimmer Sheen */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="w-[120%] h-full bg-gradient-to-r from-transparent via-[rgba(255,245,200,0.35)] to-transparent animate-gold-shimmer" />
          </div>
        </div>

        {/* Brand Name in Haute Serif */}
        <h2 className="font-serif text-lg sm:text-xl text-white/95 tracking-[0.22em] font-normal uppercase mb-2 animate-luxury-text">
          Sky-High Properties
        </h2>

        {/* Diamond Architectural Filigree */}
        <div className="flex items-center gap-3 mb-3 w-full max-w-[220px]">
          <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold-400)]/60 to-transparent" />
          <span className="text-[9px] text-[var(--color-gold-400)] tracking-widest">◆</span>
          <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-gold-400)]/60 to-transparent" />
        </div>

        {/* Haute Subtitle */}
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[var(--color-gold-300)] font-medium mb-8">
          Kolkata • Private Advisory
        </p>

        {/* Prestige Progress Track */}
        <div className="w-56 sm:w-64 relative mb-3">
          {/* Track background */}
          <div className="h-[1.5px] w-full bg-white/10 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[var(--color-gold-500)] via-[#F7E7A9] to-[var(--color-gold-400)] transition-all duration-100 ease-out shadow-[0_0_12px_rgba(212,175,55,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Glowing Bead */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -ml-1 w-2 h-2 rounded-full bg-[#FFF3C4] shadow-[0_0_10px_#D4AF37,0_0_18px_#D4AF37] pointer-events-none transition-all duration-100"
            style={{ left: `${progress}%` }}
          />
        </div>

        {/* Dynamic Micro-Status & Percentage */}
        <div className="flex items-center justify-between w-56 sm:w-64 text-[9px] uppercase tracking-[0.22em] font-mono text-white/40">
          <span className="truncate pr-2">{getStatusText()}</span>
          <span className="text-[var(--color-gold-300)] font-medium">{progress}%</span>
        </div>
      </div>

      {/* Subtle Skip Pill */}
      <button
        onClick={handleSkip}
        type="button"
        className="absolute bottom-8 z-20 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-white/35 hover:text-white/85 transition-all duration-300 py-1.5 px-4 rounded-full border border-white/10 hover:border-[var(--color-gold-400)]/40 hover:bg-white/[0.03] cursor-pointer"
        aria-label="Skip introduction animation"
      >
        <span>Skip Intro</span>
        <span className="text-[8px] text-[var(--color-gold-400)]/60">✕</span>
      </button>
    </div>
  );
}
