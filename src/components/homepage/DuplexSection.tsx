"use client";

import { HOMEPAGE_VIDEOS, HOMEPAGE_IMAGES } from "@/lib/site-assets";

export default function DuplexSection() {
  return (
    <section
      aria-labelledby="chapter-03-title"
      className="pt-28 sm:pt-36 pb-24 sm:pb-32 bg-[var(--surface-canvas-alt)] text-[var(--text-primary)] border-t border-[var(--color-stone-300)]"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Architectural Thesis */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
              <p className="text-eyebrow text-[var(--color-gold-500)]">
                Chapter 03 · Vertical Architecture
              </p>
            </div>

            <h2
              id="chapter-03-title"
              className="text-section-title text-[var(--color-stone-900)] mb-6"
            >
              Two levels.{" "}
              <span className="font-editorial italic font-normal">
                Connected by light.
              </span>
            </h2>

            <div className="space-y-4 text-[var(--color-stone-700)] text-base sm:text-lg leading-relaxed font-light mb-8">
              <p>
                A luxury residence is defined not merely by expansive floorplates, but by the sensation of unbroken spatial volume and natural light.
              </p>
              <p>
                The central staircase is engineered as a floating architectural spine. Cantilevered solid teak treads and structural laminated glass railings allow light from the upper clerestory to pour into the ground floor living areas without visual obstruction.
              </p>
            </div>

            {/* Architectural Key Specifications */}
            <div className="border-t border-[var(--color-stone-300)] pt-6 space-y-3 text-xs tracking-wider uppercase text-[var(--color-stone-600)]">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--color-stone-200)]">
                <span className="font-medium text-[var(--color-stone-900)]">Vertical Circulation</span>
                <span>Open-Riser Floating Teak</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[var(--color-stone-200)]">
                <span className="font-medium text-[var(--color-stone-900)]">Balustrade</span>
                <span>12mm Laminated Low-Iron Glass</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-[var(--color-stone-900)]">Upper Mezzanine</span>
                <span>Direct Master Suite Bridge</span>
              </div>
            </div>
          </div>

          {/* Right Column: Tall Architectural Motion Frame */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] max-w-xl mx-auto overflow-hidden bg-[#0C0B08] shadow-xl border border-[var(--color-stone-300)]">
              <video
                src={HOMEPAGE_VIDEOS.duplexStaircase}
                poster={HOMEPAGE_IMAGES.livingRoomMaster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover object-center"
                aria-label="Motion sequence showing floating staircase and two-level volume"
              />
              {/* Subtle top/bottom architectural gradient */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.6) 100%)",
                }}
                aria-hidden="true"
              />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white/80 text-xs">
                <span className="tracking-[0.16em] uppercase">Elevation View · Staircase Core</span>
                <span className="text-[var(--color-gold-300)]">Clip 04</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
