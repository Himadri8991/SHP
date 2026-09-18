import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

export default function LocationsSection() {
  return (
    <section
      id="locations"
      aria-labelledby="locations-heading"
      className="scroll-mt-24 pt-24 sm:pt-32 pb-24 sm:pb-32 bg-[var(--surface-canvas-alt)] text-[var(--text-primary)] border-t border-[var(--color-stone-300)]"
    >
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[var(--color-stone-300)] mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
              <p className="text-eyebrow text-[var(--color-gold-500)]">
                Key Destinations · Kolkata & Beyond
              </p>
            </div>
            <h2
              id="locations-heading"
              className="text-section-title text-[var(--color-stone-900)]"
            >
              Explore Kolkata&rsquo;s key property destinations.
            </h2>
          </div>
          <p className="text-subhead text-[var(--color-stone-600)] max-w-md font-light leading-relaxed">
            From the planned modern townships of Newtown to prime Rajarhat, Salt Lake, and South Kolkata corridors.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SITE_CONFIG.locations.map((loc) => (
            <Link
              key={loc.name}
              href={`/properties?location=${encodeURIComponent(loc.name)}`}
              className="group bg-white p-7 rounded-[3px] border border-[var(--color-stone-200)] shadow-sm hover:shadow-lg hover:border-[var(--color-stone-400)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-[var(--color-gold-500)]">
                    <Compass className="w-4 h-4" />
                    <span className="text-eyebrow text-[10px]">Kolkata Territory</span>
                  </div>
                  <span className="px-2.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-[var(--surface-canvas-alt)] text-[var(--color-stone-700)] rounded-[2px] border border-[var(--color-stone-300)]">
                    {loc.count}
                  </span>
                </div>

                <h3 className="font-editorial text-xl sm:text-2xl font-normal text-[var(--color-stone-900)] group-hover:text-[var(--color-navy-900)] transition-colors mb-2">
                  {loc.name}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--color-stone-600)] font-light leading-relaxed">
                  {loc.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--color-stone-100)] flex items-center justify-between text-xs text-[var(--color-stone-700)] group-hover:text-[var(--color-navy-900)] transition-colors">
                <span className="font-medium">Explore Properties</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
