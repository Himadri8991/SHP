"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface DeveloperCard {
  name: string;
  tagline: string;
  signatureProjects: string;
  query: string;
  logo: string;
}

const DEVELOPERS: DeveloperCard[] = [
  {
    name: "PS Group",
    tagline: "Innovative High-Rise Luxury",
    signatureProjects: "PS One10, PS Aurus, PS Vyoma, PS Navyom",
    query: "PS Group",
    logo: "/assets/Developer logos/ps blue.svg",
  },
  {
    name: "Srijan Realty",
    tagline: "Landmark Urban Living",
    signatureProjects: "Srijan Solus, The Royal Ganges, Laguna Bay",
    query: "Srijan",
    logo: "/assets/Developer logos/srijan blue.svg",
  },
  {
    name: "Godrej Properties",
    tagline: "National Legacy & Greenery",
    signatureProjects: "Godrej Prakriti, Godrej Sevens, Godrej Horizon",
    query: "Godrej Properties",
    logo: "/assets/Developer logos/godrej.svg",
  },
  {
    name: "Shapoorji Pallonji",
    tagline: "150+ Years Engineering Heritage",
    signatureProjects: "Joyville Newtown, Sukhobrishti",
    query: "Shapoorji Pallonji",
    logo: "/assets/Developer logos/shapoorji.svg",
  },
  {
    name: "TATA Realty",
    tagline: "Unmatched Trust & Modern Excellence",
    signatureProjects: "Tata Avenida, Tata Eden Court, Tata Riva",
    query: "TATA Realty",
    logo: "/assets/Developer logos/tata_logo.png",
  },
  {
    name: "Merlin Group",
    tagline: "A Home For Every Indian",
    signatureProjects: "Merlin The One, Merlin Acropolis, Merlin 5th Avenue",
    query: "Merlin Group",
    logo: "/assets/Developer logos/merlin logo.webp",
  },
  {
    name: "Ambuja Neotia",
    tagline: "Crafting Spaces with Soul & Art",
    signatureProjects: "Utalika Luxury, The Condoville, Ecospace, Udayan",
    query: "Ambuja Neotia",
    logo: "/assets/Developer logos/Ambuja logo.svg",
  },
  {
    name: "Mani Group",
    tagline: "Iconic Landmarks & Ultra Luxury",
    signatureProjects: "Mani Vista, Swarnamani, Mani Casa, Vivara",
    query: "Mani Group",
    logo: "/assets/Developer logos/mani_logo.png",
  },
  {
    name: "Emami Realty",
    tagline: "Transforming Urban Landscapes",
    signatureProjects: "Emami City, Emami Nature, Emami Tejomaya",
    query: "Emami Realty",
    logo: "/assets/Developer logos/emami logo.png",
  },
  {
    name: "Siddha Group",
    tagline: "Skywalk Living & Modern Habitats",
    signatureProjects: "Siddha Sky, Siddha Galaxia, Siddha Suburbia",
    query: "Siddha Group",
    logo: "/assets/Developer logos/siddha-group-logo.png",
  },
  {
    name: "Shrachi Realty",
    tagline: "Dreamer. Doer. Delivering Trust.",
    signatureProjects: "Greenwood Elements, Rosedale Garden, Synthesis",
    query: "Shrachi Realty",
    logo: "/assets/Developer logos/shrachi logo.png",
  },
  {
    name: "Purti Realty",
    tagline: "Building Value & Enriching Lives",
    signatureProjects: "Purti Planet, Purti Veda, Purti Aqua, Purti Nest",
    query: "Purti Realty",
    logo: "/assets/Developer logos/purti-logo-navy.png",
  },
  {
    name: "Vinayak Group",
    tagline: "Refined Modern Residences",
    signatureProjects: "Vinayak Golden Acres, Riverview, Citrus Cove",
    query: "Vinayak Group",
    logo: "/assets/Developer logos/Vinayak logo.webp",
  },
  {
    name: "Ruchi Realty",
    tagline: "Creating Worlds of Joy",
    signatureProjects: "Active Acres, Waterfront, Active Town",
    query: "Ruchi Realty",
    logo: "/assets/Developer logos/ruchi_logo.png",
  },
  {
    name: "Peerless",
    tagline: "Enduring Heritage & Community Value",
    signatureProjects: "Peerless Anupama, Peerless Nagar, Residency",
    query: "Peerless",
    logo: "/assets/Developer logos/peerless logo.png",
  },
  {
    name: "Eden Realty",
    tagline: "Contemporary Community Living",
    signatureProjects: "Eden Richmond Park, Solaris City, Solaris Joka",
    query: "Eden Realty",
    logo: "/assets/Developer logos/eden.webp",
  },
  {
    name: "DTC Group",
    tagline: "Integrated Township Excellence",
    signatureProjects: "DTC Southern Heights, DTC Capital City",
    query: "DTC Group",
    logo: "/assets/Developer logos/DTC logo.png",
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {DEVELOPERS.map((dev) => (
            <Link
              key={dev.name}
              href={`/properties?developer=${encodeURIComponent(dev.query)}`}
              className="group p-5 sm:p-6 bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[var(--color-gold-400)]/50 rounded-[4px] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Official Developer Logo Tile */}
                <div className="h-12 w-full max-w-[145px] px-3 py-1.5 rounded-[4px] bg-white flex items-center justify-center mb-4 shadow-xs border border-white/20 group-hover:border-[var(--color-gold-400)]/60 transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={dev.logo}
                    alt={`${dev.name} logo`}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>

                <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-[var(--color-gold-300)] transition-colors">
                  {dev.name}
                </h3>
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white/45 font-light mt-1">
                  {dev.tagline}
                </p>
                <p className="text-xs text-white/70 font-light mt-3.5 line-clamp-2 leading-relaxed">
                  <strong className="text-white/90 font-medium">Projects:</strong> {dev.signatureProjects}
                </p>
              </div>

              <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between text-xs text-[var(--color-gold-400)] group-hover:text-white transition-colors">
                <span>View Inventory</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}

          {/* Concierge Inquiry Card */}
          <div className="p-5 sm:p-6 bg-gradient-to-br from-[var(--color-gold-500)]/15 to-white/[0.02] border border-[var(--color-gold-400)]/30 rounded-[4px] flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-gold-400)] font-semibold block mb-2">
                Bespoke Sourcing
              </span>
              <h3 className="text-base sm:text-lg font-medium text-white mb-2">
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
