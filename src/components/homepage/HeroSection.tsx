"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HOMEPAGE_IMAGES, HOMEPAGE_VIDEOS } from "@/lib/site-assets";
import { SITE_CONFIG } from "@/data/site-config";

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const bgMediaRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power2.out", delay: 0.15 }
      );
      gsap.fromTo(
        actionsRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", delay: 0.35 }
      );

      if (bgMediaRef.current) {
        gsap.to(bgMediaRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Flagship Property Campaign Opening"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#0C0B08] text-white pt-24 sm:pt-28 pb-8"
    >
      {/* === ARCHITECTURAL BACKGROUND VIDEO === */}
      <div ref={bgMediaRef} className="absolute inset-0 z-0">
        <video
          src={HOMEPAGE_VIDEOS.exteriorApproach}
          poster={HOMEPAGE_IMAGES.exteriorMaster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="video-cover object-cover object-center scale-[1.01]"
        />
        {/* Architectural Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(12,11,8,0.1) 0%, rgba(12,11,8,0.4) 65%, rgba(12,11,8,0.85) 100%), linear-gradient(to top, rgba(12,11,8,0.95) 0%, transparent 45%, rgba(12,11,8,0.55) 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* === TOP METADATA === */}
      <div className="relative z-10 container-wide pt-2 sm:pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-3 sm:pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-400)]" aria-hidden="true" />
            <p className="text-[10px] sm:text-eyebrow text-white/90">
              Kolkata · Newtown · Rajarhat
            </p>
          </div>
          <p className="text-[10px] sm:text-eyebrow text-white/70 hidden md:block">
            Residential · Commercial · Investment Properties
          </p>
        </div>
      </div>

      {/* === INTEGRATED HERO STATEMENT === */}
      <div className="relative z-10 container-wide my-auto py-8 sm:py-16">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="w-6 sm:w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
            <span className="text-[10px] sm:text-eyebrow text-[var(--color-gold-300)]">
              Real Estate Consultancy · Kolkata & Newtown
            </span>
          </div>

          {/* Main Headline */}
          <h1
            ref={headlineRef}
            className="text-hero text-white mb-5 sm:mb-6"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.7)" }}
          >
            Your Next Address{" "}
            <span className="font-editorial italic font-normal text-[var(--color-gold-300)]">
              Starts Here.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-subhead text-white/85 max-w-xl font-light mb-8 sm:mb-10 leading-relaxed">
            Residential, commercial and investment properties across Newtown, Rajarhat and Kolkata — carefully selected, clearly presented.
          </p>

          {/* Editorial Actions (Mobile Friendly Stacking) */}
          <div
            ref={actionsRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5"
          >
            <Link
              href="#portfolio"
              className="btn-editorial-gold text-[10px] sm:text-[11px] text-center group"
            >
              <span>Explore Properties</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                <path d="M2.5 6h7M6 2.5l3.5 3.5-3.5 3.5" />
              </svg>
            </Link>

            <a
              href={SITE_CONFIG.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial text-[10px] sm:text-[11px] text-center group"
            >
              <span>Talk to an Advisor</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-0.5 text-[var(--color-gold-300)]"
                aria-hidden="true"
              >
                <path d="M2.5 6h7M6 2.5l3.5 3.5-3.5 3.5" />
              </svg>
            </a>

            <Link
              href="#about"
              className="editorial-link editorial-link-light text-[11px] sm:text-[12px] group py-1.5 self-center sm:self-auto sm:ml-2"
            >
              <span>About Sky-High</span>
              <span className="text-xs text-[var(--color-gold-300)] group-hover:translate-y-0.5 transition-transform">↓</span>
            </Link>
          </div>
        </div>
      </div>

      {/* === BOTTOM STATUS RAIL === */}
      <div className="relative z-10 container-wide">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-white/15 text-white/60">
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] tracking-[0.14em] uppercase">
            <span>Office: Shop No. 40, NKDA Market, Newtown</span>
            <span className="text-white/30">|</span>
            <span>Verified Listings & Consultancy</span>
          </div>

          <Link
            href="#portfolio"
            className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-white/70 hover:text-white transition-colors"
          >
            <span>Explore Listings</span>
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="animate-bounce"
            >
              <path d="M5 1v8M1 5l4 4 4-4" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
