"use client";

import Image from "next/image";
import { HOMEPAGE_IMAGES, HOMEPAGE_VIDEOS } from "@/lib/site-assets";

export default function PrivateSection() {
  return (
    <section
      aria-labelledby="chapter-04-title"
      className="pt-28 sm:pt-36 pb-24 sm:pb-32 bg-[var(--surface-canvas)] text-[var(--text-primary)] border-t border-[var(--color-stone-200)]"
    >
      <div className="container-wide">
        {/* === CHAPTER HEADER === */}
        <div className="max-w-2xl mb-16">
          <p className="text-eyebrow text-[var(--color-gold-500)] mb-3">
            Chapter 04 · The Private Quarters
          </p>
          <h2
            id="chapter-04-title"
            className="text-section-title text-[var(--color-stone-900)] mb-5"
          >
            The room that{" "}
            <span className="font-editorial italic font-normal">
              earns its quiet.
            </span>
          </h2>
          <p className="text-subhead text-[var(--color-stone-600)] font-light leading-relaxed">
            A sanctuary calibrated to morning illumination, acoustic isolation, and understated materiality.
          </p>
        </div>

        {/* === GALLERY PAIRING: MASTER PHOTOGRAPH + MOTION STUDY === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Master Bedroom Photograph (Plate 04) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="arch-frame aspect-[16/11] w-full flex-1 relative overflow-hidden shadow-sm">
              <Image
                src={HOMEPAGE_IMAGES.masterBedroomMaster}
                alt="Master bedroom suite with slatted walnut headboard, floor-to-ceiling glass and soft morning light"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
            </div>
            <div className="flex items-center justify-between pt-4 text-xs text-[var(--color-stone-500)] uppercase tracking-wider">
              <span>Plate 04 · Master Bedroom Suite</span>
              <span>Morning Light Study</span>
            </div>
          </div>

          {/* Intimate Suite Narrative + Video Loop */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[var(--surface-canvas-alt)] p-8 border border-[var(--color-stone-200)]">
            <div className="space-y-4 mb-8 text-[var(--color-stone-700)] text-sm sm:text-base leading-relaxed font-light">
              <p className="text-[var(--color-stone-900)] font-medium text-lg leading-snug">
                Separated from social areas by an acoustic buffer corridor.
              </p>
              <p>
                The primary bedroom suite occupies the secluded upper wing. Fluted walnut wall panels conceal integrated dressing joinery, while full-height acoustic glazing frames private morning views across the landscape.
              </p>
            </div>

            {/* Inset Suite Video Loop */}
            <div>
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black shadow-inner mb-3">
                <video
                  src={HOMEPAGE_VIDEOS.masterSuite}
                  poster={HOMEPAGE_IMAGES.masterBedroomMaster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                  aria-label="Motion sequence through master suite interior"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-[var(--color-stone-500)] tracking-wider uppercase">
                <span>Clip 05 · Suite Walkthrough</span>
                <span>Interior Perspective</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
