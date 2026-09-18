"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Eye } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HOMEPAGE_IMAGES, HOMEPAGE_VIDEOS } from "@/lib/site-assets";

export default function ViewSection() {
  const [showVideo, setShowVideo] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const panoFrameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (panoFrameRef.current) {
        gsap.fromTo(
          panoFrameRef.current,
          { scale: 1.04 },
          {
            scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: panoFrameRef.current,
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

  const toggleVideo = () => {
    setShowVideo(!showVideo);
    if (!showVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="chapter-02-title"
      className="pt-28 sm:pt-36 pb-24 sm:pb-32 bg-[#12100C] text-white overflow-hidden border-t border-white/[0.08]"
    >
      <div className="container-wide">
        {/* === CHAPTER HEADER === */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10 mb-12">
          <div>
            <p className="text-eyebrow text-[var(--color-gold-300)] mb-3">
              Chapter 02 · The Horizon
            </p>
            <h2
              id="chapter-02-title"
              className="text-section-title text-white"
            >
              Where the horizon{" "}
              <span className="font-editorial italic font-normal text-[var(--color-gold-300)]">
                belongs to the room.
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleVideo}
              className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-[var(--color-gold-300)] hover:text-white transition-colors cursor-pointer group py-1 border-b border-[var(--color-gold-400)]/40 hover:border-white"
            >
              {showVideo ? (
                <Eye className="w-3.5 h-3.5 text-[var(--color-gold-400)] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              ) : (
                <Play className="w-3.5 h-3.5 text-[var(--color-gold-400)] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              )}
              <span>{showVideo ? "View Still Monograph" : "Play Motion Sequence"}</span>
              <span className="text-xs transition-transform group-hover:translate-x-0.5">→</span>
            </button>
          </div>
        </div>

        {/* === 21:9 CINEMATIC PANORAMA FRAME === */}
        <div ref={panoFrameRef} className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden bg-black shadow-2xl">
          {/* Master Image */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${showVideo ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <Image
              src={HOMEPAGE_IMAGES.terraceViewMaster}
              alt="Deep outdoor living terrace with structural glass balustrades looking out over lush green landscape at golden hour"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Motion Sequence */}
          <div className={`absolute inset-0 transition-opacity duration-700 ${showVideo ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <video
              ref={videoRef}
              src={HOMEPAGE_VIDEOS.livingToView}
              poster={HOMEPAGE_IMAGES.terraceViewMaster}
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover object-center"
              aria-label="Motion sequence traveling from interior living space out toward the terrace view"
            />
          </div>

          {/* Panoramic Scrim for Legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Panorama Sub-Caption */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-10 max-w-lg text-white">
            <p className="text-eyebrow text-[var(--color-gold-300)] mb-1">
              Elevated Terrace
            </p>
            <p className="text-sm sm:text-base text-white/80 font-light">
              Cantilevered over private grounds. Clear glass balustrades preserve an uninterrupted line of sight to the tree canopy.
            </p>
          </div>
        </div>

        {/* === ARCHITECTURAL CAPTIONS & DATA === */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-white/10 mt-10 text-white/70">
          <div>
            <span className="text-eyebrow text-[var(--color-gold-400)] block mb-2">Orientation</span>
            <p className="text-sm font-light text-white/90">Golden hour sunset alignment with deep architectural shading eave.</p>
          </div>
          <div>
            <span className="text-eyebrow text-[var(--color-gold-400)] block mb-2">Outdoor Footprint</span>
            <p className="text-sm font-light text-white/90">Over 600 sq.ft. of private outdoor lounge deck seamlessly connected to the living zone.</p>
          </div>
          <div>
            <span className="text-eyebrow text-[var(--color-gold-400)] block mb-2">Acoustic Shield</span>
            <p className="text-sm font-light text-white/90">Recessed terrace geometry insulates private lounging areas from external sound.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
