"use client";

import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

interface DeveloperCard {
  name: string;
  tagline: string;
  signatureProjects: string;
  query: string;
}

const DEVELOPERS: DeveloperCard[] = [
  {
    name: "PS Group",
    tagline: "Innovative High-Rise Luxury",
    signatureProjects: "PS One10, PS Aurus, PS Vyoma",
    query: "PS Group",
  },
  {
    name: "Srijan Realty",
    tagline: "Landmark Urban Living",
    signatureProjects: "Srijan Solus, The Royal Ganges",
    query: "Srijan",
  },
  {
    name: "Godrej Properties",
    tagline: "National Legacy & Greenery",
    signatureProjects: "Godrej Prakriti, Godrej Sevens",
    query: "Godrej Properties",
  },
  {
    name: "Shapoorji Pallonji",
    tagline: "150+ Years Engineering Heritage",
    signatureProjects: "Joyville Newtown, Sukhobrishti",
    query: "Shapoorji Pallonji",
  },
  {
    name: "Eden Realty",
    tagline: "Contemporary Community Living",
    signatureProjects: "Eden Richmond Park, Solaris City",
    query: "Eden Realty",
  },
  {
    name: "Vinayak Group",
    tagline: "Refined Modern Residences",
    signatureProjects: "Vinayak Golden Acres, Riverview",
    query: "Vinayak Group",
  },
  {
    name: "DTC Group",
    tagline: "Integrated Township Excellence",
    signatureProjects: "DTC Southern Heights, Capital City",
    query: "DTC Group",
  },
];

export default function DeveloperShowcaseSection() {
  return (
    <section
      aria-label="Developer Alliances"
      className="py-20 sm:py-28 bg-[#0E0C0A] text-white border-t border-white/10 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--color-gold-400)]/5 blur-[140px] pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-[var(--color-gold-400)]" />
              <p className="text-eyebrow text-[var(--color-gold-400)]">Developer Alliances</p>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light leading-tight">
              Direct Advisory Across <br />
              <span className="font-editorial italic font-normal text-[var(--color-gold-300)]">
                Kolkata&apos;s Foremost Developers
              </span>
            </h2>
          </div>
          <p className="text-sm text-white/60 font-light max-w-md leading-relaxed">
            We represent your interests across premier under-construction and ready developments with transparent pricing and comprehensive inventory access.
          </p>
        </div>

        {/* Developers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DEVELOPERS.map((dev) => (
            <Link
              key={dev.name}
              href={`/properties?developer=${encodeURIComponent(dev.query)}`}
              className="group p-6 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[var(--color-gold-400)]/50 rounded-[3px] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-[2px] bg-white/[0.05] border border-white/10 flex items-center justify-center text-[var(--color-gold-400)] group-hover:bg-[var(--color-gold-400)] group-hover:text-black transition-colors mb-4">
                  <Building2 className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-medium text-white group-hover:text-[var(--color-gold-300)] transition-colors">
                  {dev.name}
                </h3>
                <p className="text-[11px] uppercase tracking-wider text-white/40 font-light mt-1">
                  {dev.tagline}
                </p>
                <p className="text-xs text-white/70 font-light mt-4 line-clamp-2">
                  <strong className="text-white/90">Projects:</strong> {dev.signatureProjects}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-[var(--color-gold-400)] group-hover:text-white transition-colors">
                <span>View Inventory</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}

          {/* Concierge Inquiry Card */}
          <div className="p-6 bg-gradient-to-br from-[var(--color-gold-500)]/15 to-white/[0.02] border border-[var(--color-gold-400)]/30 rounded-[3px] flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-gold-400)] font-semibold block mb-2">
                Bespoke Sourcing
              </span>
              <h3 className="text-lg font-medium text-white mb-2">
                Seeking Another Developer?
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                Connect with our advisory desk for confidential allocations across any registered developer in Newtown, Rajarhat, and Kolkata.
              </p>
            </div>
            <Link
              href="/contact"
              className="btn-editorial-gold text-xs text-center justify-center py-2.5 mt-6"
            >
              Inquire With Desk
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
