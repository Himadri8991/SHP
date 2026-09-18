"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { HOMEPAGE_IMAGES, HOMEPAGE_VIDEOS } from "@/lib/site-assets";

export default function EveningSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startPlayback = () => {
    if (!videoRef.current) return;
    setIsPlaying(true);
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };

  const handleVideoEnded = () => {
    // Hold cleanly on final frame
  };

  return (
    <section
      aria-labelledby="chapter-05-title"
      className="pt-28 sm:pt-36 pb-24 sm:pb-32 bg-[#090B12] text-white overflow-hidden border-t border-white/[0.08]"
    >
      <div className="container-wide">
        {/* === CHAPTER HEADER === */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10 mb-12">
          <div>
            <p className="text-eyebrow text-[var(--color-gold-300)] mb-3">
              Chapter 05 · The Finale
            </p>
            <h2
              id="chapter-05-title"
              className="text-section-title text-white"
            >
              When twilight settles, the{" "}
              <span className="font-editorial italic font-normal text-[var(--color-gold-300)]">
                architecture awakens.
              </span>
            </h2>
          </div>
          <p className="text-subhead text-white/70 max-w-md font-light leading-relaxed">
            The transition from day to evening reveals the warm amber heart of the residence against the indigo sky.
          </p>
        </div>

        {/* === MASTER EVENING ARCHITECTURAL FRAME === */}
        <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden bg-black shadow-2xl">
          {/* Still Master Image (Default state) */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <Image
              src={HOMEPAGE_IMAGES.eveningExteriorMaster}
              alt="Luxury residence at blue hour twilight with glowing amber interior lighting against indigo sky"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Video Sequence */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <video
              ref={videoRef}
              src={HOMEPAGE_VIDEOS.eveningFinale}
              poster={HOMEPAGE_IMAGES.eveningExteriorMaster}
              muted
              playsInline
              preload="metadata"
              onEnded={handleVideoEnded}
              className="w-full h-full object-cover object-center"
              aria-label="Evening twilight closing video sequence"
            />
          </div>

          {/* Editorial Gradient & Play Action */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(9,11,18,0.85) 0%, transparent 40%, rgba(9,11,18,0.3) 100%)",
            }}
            aria-hidden="true"
          />

          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 right-6 sm:right-10 z-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-md text-white">
              <p className="text-eyebrow text-[var(--color-gold-300)] mb-1">
                Plate 05 · Dusk Illumination
              </p>
              <p className="text-xs sm:text-sm text-white/80 font-light">
                Concealed warm LED cove lighting and architectural downlights accentuate the natural texture of the exterior stone masonry.
              </p>
            </div>

            {!isPlaying && (
              <button
                type="button"
                onClick={startPlayback}
                className="btn-editorial text-[11px] group"
              >
                <span>Play Twilight Sequence</span>
                <span className="text-xs">▶</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
