"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HOMEPAGE_IMAGES, HOMEPAGE_VIDEOS } from "@/lib/site-assets";
import { ArchitecturalLoupeModal } from "./ArchitecturalLoupeModal";

export default function ResidenceSection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoupeOpen, setIsLoupeOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const masterImageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (masterImageRef.current) {
        gsap.fromTo(
          masterImageRef.current,
          { scale: 1.05 },
          {
            scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: masterImageRef.current,
              start: "top bottom",
              end: "bottom center",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="residences"
      aria-labelledby="chapter-01-title"
      className="scroll-mt-24 sm:scroll-mt-28 pt-28 sm:pt-36 pb-24 sm:pb-32 bg-[var(--surface-canvas)] text-[var(--text-primary)] border-t border-[var(--border-hairline-dark)]"
    >
      <div className="container-wide">
        {/* === CHAPTER HEADER === */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[var(--color-stone-200)] mb-14">
          <div>
            <p className="text-eyebrow text-[var(--color-gold-500)] mb-3">
              Chapter 01 · Spatial Volume
            </p>
            <h2
              id="chapter-01-title"
              className="text-section-title text-[var(--color-stone-900)]"
            >
              The double-height{" "}
              <span className="font-editorial italic font-normal">
                living pavilion.
              </span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3 max-w-md">
            <p className="text-subhead text-[var(--color-stone-600)] font-light leading-relaxed">
              Where 18-foot travertine stone meets unbroken natural light and landscaped horizons.
            </p>
            <button
              type="button"
              onClick={() => setIsLoupeOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-[var(--color-stone-900)] hover:text-[var(--color-gold-500)] transition-colors group cursor-pointer pt-1"
            >
              <ZoomIn className="w-3.5 h-3.5 text-[var(--color-gold-500)] transition-transform group-hover:scale-110" strokeWidth={1.5} />
              <span className="font-medium underline underline-offset-4 decoration-[var(--color-gold-400)]">Inspect Materiality & Craft</span>
              <span className="text-xs transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>

        {/* === MASTER ARCHITECTURAL PHOTOGRAPH === */}
        <div className="arch-frame aspect-[16/9] sm:aspect-[21/9] w-full mb-14 shadow-sm overflow-hidden">
          <div ref={masterImageRef} className="w-full h-full relative">
            <Image
              src={HOMEPAGE_IMAGES.livingRoomMaster}
              alt="Double-height living room with natural travertine wall, slatted wood paneling and glass staircase"
              fill
              sizes="100vw"
              priority={false}
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* === EDITORIAL SPREAD: ARCHITECTURAL ESSAY & MOTION STUDY === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Architectural Thesis */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-[var(--color-stone-700)] text-base sm:text-lg leading-relaxed font-light">
            <p className="text-[var(--color-stone-900)] font-normal text-xl sm:text-2xl leading-snug">
              A residence should be understood through proportion, materiality, and how the eye travels across space.
            </p>
            <p>
              In this signature floorplan, the primary social pavilion is conceived as a soaring light conservatory.
              The monolithic limestone feature wall acts as a thermal mass and visual anchor, counterbalanced by
              warm teak slatting and floating open-riser stairs.
            </p>
            <p>
              Full-height acoustic glazing dissolves the boundary between the living room and the exterior terrace,
              allowing the ambient greenery of Newtown&rsquo;s outskirts to frame the daily interior experience.
            </p>

            <div className="pt-6 border-t border-[var(--color-stone-200)] grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs tracking-wider uppercase text-[var(--color-stone-500)]">
              <div>
                <span className="block text-[var(--color-stone-900)] font-medium text-sm mb-1">18 Feet</span>
                Clear Ceiling Height
              </div>
              <div>
                <span className="block text-[var(--color-stone-900)] font-medium text-sm mb-1">Travertine</span>
                Natural Stone Masonry
              </div>
              <div>
                <span className="block text-[var(--color-stone-900)] font-medium text-sm mb-1">Low-E Glass</span>
                Acoustic Glazing
              </div>
            </div>
          </div>

          {/* Right Column: Intimate Motion Study Window */}
          <div className="lg:col-span-5 bg-[var(--surface-canvas-alt)] p-6 sm:p-8 border border-[var(--color-stone-200)]">
            <div className="flex items-center justify-between mb-4">
              <p className="text-eyebrow text-[var(--color-stone-600)]">
                Motion Study · Arrival Sequence
              </p>
              <button
                type="button"
                onClick={togglePlay}
                className="text-[10px] tracking-[0.14em] uppercase text-[var(--color-gold-500)] hover:underline"
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden bg-black mb-4">
              <video
                ref={videoRef}
                src={HOMEPAGE_VIDEOS.exteriorToLiving}
                poster={HOMEPAGE_IMAGES.livingRoomMaster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                aria-label="Video of arrival sequence moving from exterior into living pavilion"
              />
            </div>

            <p className="text-xs text-[var(--color-stone-500)] leading-relaxed">
              Clip 02 · Steady camera movement following the entrance path from the private terrace through the sliding thermal glass into the great room.
            </p>
          </div>
        </div>
      </div>

      <ArchitecturalLoupeModal
        isOpen={isLoupeOpen}
        onClose={() => setIsLoupeOpen(false)}
      />
    </section>
  );
}
