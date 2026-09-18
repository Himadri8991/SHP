"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ZoomIn, Info } from "lucide-react";
import { HOMEPAGE_IMAGES } from "@/lib/site-assets";

interface MaterialCallout {
  id: string;
  title: string;
  description: string;
  top: string;
  left: string;
}

const callouts: MaterialCallout[] = [
  {
    id: "travertine",
    title: "Travertine Stone Masonry",
    description: "Monolithic dry-stacked natural travertine acting as both thermal regulator and textural spine.",
    top: "32%",
    left: "64%",
  },
  {
    id: "teak",
    title: "Fluted Teak Millwork",
    description: "Custom solid Burmese teak vertical slatting counterbalancing the cool masonry palette.",
    top: "22%",
    left: "52%",
  },
  {
    id: "glazing",
    title: "Acoustic Thermal Glazing",
    description: "Double-glazed low-emissivity glass framing panoramic horizon views while sealing exterior sound.",
    top: "45%",
    left: "22%",
  },
  {
    id: "staircase",
    title: "Floating Cantilever Treads",
    description: "Open-riser solid timber treads suspended with structural laminated glass railings for unbroken light penetration.",
    top: "40%",
    left: "86%",
  },
];

export function ArchitecturalLoupeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeCallout, setActiveCallout] = useState<MaterialCallout | null>(callouts[0]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Architectural Materiality & Detail Inspection"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#090806]/95 backdrop-blur-md p-4 sm:p-8"
    >
      <div className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-[#11100D] border border-white/15 text-white shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161410]">
          <div className="flex items-center gap-3">
            <ZoomIn className="w-4 h-4 text-[var(--color-gold-400)]" strokeWidth={1.5} />
            <h3 className="text-xs sm:text-sm tracking-[0.2em] uppercase font-medium text-white/90">
              Materiality & Craftsmanship Inspection · Living Pavilion
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close Material Inspection"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Modal Body: Interactive Image & Hotspots */}
        <div className="relative flex-1 min-h-[380px] sm:min-h-[500px] bg-black overflow-hidden group">
          <Image
            src={HOMEPAGE_IMAGES.livingRoomMaster}
            alt="High-resolution inspection view of the double-height living room and materials"
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover object-center"
            priority
          />

          {/* Interactive Material Hotspots */}
          {callouts.map((c) => {
            const isSelected = activeCallout?.id === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCallout(c)}
                style={{ top: c.top, left: c.left }}
                aria-label={`Inspect ${c.title}`}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none ${
                  isSelected
                    ? "bg-[var(--color-gold-400)] text-black scale-110 shadow-[0_0_20px_rgba(201,162,39,0.8)]"
                    : "bg-black/75 text-white hover:bg-[var(--color-gold-400)] hover:text-black border border-white/40"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-ping absolute opacity-50" />
                <span className="text-[10px] font-bold">●</span>
              </button>
            );
          })}
        </div>

        {/* Modal Footer: Active Material Dossier */}
        {activeCallout && (
          <div className="px-6 py-4 bg-[#14120E] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3 max-w-2xl">
              <Info className="w-4 h-4 text-[var(--color-gold-400)] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--color-gold-300)] font-medium">
                  {activeCallout.title}
                </p>
                <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed mt-0.5">
                  {activeCallout.description}
                </p>
              </div>
            </div>

            <p className="text-[10px] tracking-widest uppercase text-white/40 whitespace-nowrap">
              Select Hotspot to Explore
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
