"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Navigation, ArrowRight, TrendingUp, Train, CheckCircle2 } from "lucide-react";
import { HOMEPAGE_IMAGES } from "@/lib/site-assets";

interface Neighbourhood {
  id: string;
  name: string;
  tagline: string;
  character: string;
  connectivity: string[];
  propertyTypes: string;
  listingCount: string;
  imageSrc: string;
  highlights: string[];
}

const NEIGHBOURHOODS: Neighbourhood[] = [
  {
    id: "newtown",
    name: "Newtown",
    tagline: "Planned Smart Township · Action Area I, II & III",
    character:
      "Kolkata’s premier modern corridor characterized by planned wide boulevards, major IT SEZ campuses, Eco Park greenery, and sanctioned residential enclaves.",
    connectivity: ["Upcoming Orange Line Metro", "15 Mins to International Airport", "Major IT SEZ Hubs"],
    propertyTypes: "Signature High-Rises, Luxury Penthouses & Freehold Plots",
    listingCount: "41+ Verified Listings",
    imageSrc: HOMEPAGE_IMAGES.exteriorMaster,
    highlights: ["NKDA Municipal Authority", "100% Underground Utilities", "480-Acre Eco Park Lake"],
  },
  {
    id: "rajarhat",
    name: "Rajarhat Expressway",
    tagline: "Fast-Growing Residential & Gated Communities",
    character:
      "Rapidly appreciating corridor connecting Salt Lake and Newtown to the Airport. Favored for sprawling gated complexes with extensive landscaped clubhouses.",
    connectivity: ["Direct 6-Lane Expressway", "10 Mins to Airport", "Chinar Park Commercial Hub"],
    propertyTypes: "Gated Condominiums, Garden Residences & Commercial Frontage",
    listingCount: "12+ Verified Listings",
    imageSrc: HOMEPAGE_IMAGES.terraceViewMaster,
    highlights: ["High Rental Yield", "Close to Chinar Park", "Comprehensive Sports Clubhouses"],
  },
  {
    id: "salt-lake",
    name: "Salt Lake (Bidhannagar)",
    tagline: "Established Green Sectors & IT Sector V",
    character:
      "Kolkata’s original planned satellite city known for lush residential blocks, central parks, and eastern India’s primary IT and financial employment center.",
    connectivity: ["East-West Metro Corridor", "Direct E.M. Bypass Access", "Sector V Tech Center"],
    propertyTypes: "Independent Houses, Corporate Apartments & Office Floors",
    listingCount: "8+ Verified Listings",
    imageSrc: HOMEPAGE_IMAGES.livingRoomMaster,
    highlights: ["Metro Connected", "Established Social Infrastructure", "Lush Block Parks"],
  },
  {
    id: "alipore",
    name: "Alipore",
    tagline: "Heritage Luxury & Exclusive South Kolkata",
    character:
      "Kolkata’s most prestigious residential address, home to stately bungalows, lush tree-lined avenues, elite social clubs, and super-luxury standalone towers.",
    connectivity: ["Central Kolkata Access", "Premier Healthcare Corridor", "Calcutta South Club"],
    propertyTypes: "Ultra-Luxury Penthouses, Bespoke Floors & Heritage Residences",
    listingCount: "4+ Verified Listings",
    imageSrc: HOMEPAGE_IMAGES.masterBedroomMaster,
    highlights: ["Supreme Prestige", "High Privacy & Security", "Zero Industrial Congestion"],
  },
  {
    id: "ballygunge",
    name: "Ballygunge",
    tagline: "Cultural Elegance & Prime South Enclaves",
    character:
      "Classic South Kolkata charm paired with top educational institutions, premier shopping promenades, and boutique residential developments.",
    connectivity: ["Gariahat Road Connectivity", "Hazra & Southern Avenue Arteries", "Top Schools Proximity"],
    propertyTypes: "Large 4BHK Flats, Boutique Apartments & Penthouses",
    listingCount: "5+ Verified Listings",
    imageSrc: HOMEPAGE_IMAGES.eveningExteriorMaster,
    highlights: ["Premier Schools & Colleges", "Renowned Dining Enclaves", "Walkable Neighborhood"],
  },
  {
    id: "howrah",
    name: "Howrah & Hooghly",
    tagline: "Connected Waterfront & Industrial Growth",
    character:
      "Expanding western gateway featuring modern high-rise riverside townships, excellent bridge and highway connectivity, and competitive price points.",
    connectivity: ["Kona Expressway", "Howrah Railway Hub", "Kolkata Riverfront"],
    propertyTypes: "Riverside High-Rises, Modern 2/3 BHK Flats & Industrial Parcels",
    listingCount: "7+ Verified Listings",
    imageSrc: HOMEPAGE_IMAGES.exteriorMaster,
    highlights: ["Waterfront Views", "Expressway Transit", "Rapid Infrastructure Upgrades"],
  },
  {
    id: "joka",
    name: "Joka & Southern Bypass",
    tagline: "Emerging Metro Corridor & Master-Planned Townships",
    character:
      "High-potential southern suburban corridor anchored by the Purple Line Metro, IIM Calcutta, and expansive integrated residential townships.",
    connectivity: ["Purple Line Metro", "Diamond Harbour Road", "Southern Bypass"],
    propertyTypes: "Affordable & Mid-Luxury Apartments, Gated Enclaves & Residential Plots",
    listingCount: "8+ Verified Listings",
    imageSrc: HOMEPAGE_IMAGES.terraceViewMaster,
    highlights: ["Metro Connectivity", "IIM Calcutta Proximity", "Affordable Entry Pricing"],
  },
];

export default function InteractiveLocationsSection() {
  const [activeId, setActiveId] = useState<string>("newtown");
  const activeArea = NEIGHBOURHOODS.find((n) => n.id === activeId) || NEIGHBOURHOODS[0];

  return (
    <section
      id="locations"
      aria-labelledby="locations-heading"
      className="scroll-mt-24 py-24 sm:py-32 bg-[var(--surface-canvas-alt)] text-[var(--text-primary)] border-t border-[var(--color-stone-200)]"
    >
      <div className="container-wide">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
            <p className="text-eyebrow text-[var(--color-gold-500)] text-[10px]">
              Geographic Intelligence · Kolkata
            </p>
          </div>
          <h2
            id="locations-heading"
            className="text-section-title text-[var(--color-stone-900)] mb-4"
          >
            We don&rsquo;t just know Kolkata.{" "}
            <span className="font-editorial italic font-normal block sm:inline">
              We know its neighbourhoods.
            </span>
          </h2>
          <p className="text-subhead text-[var(--color-stone-600)] font-light leading-relaxed">
            Every micro-market in Kolkata has its own civic authority, price trajectory, and living culture. Select a neighborhood below to explore its character and available opportunities.
          </p>
        </div>

        {/* Interactive Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Neighbourhood Selector List */}
          <div className="lg:col-span-5 space-y-2">
            {NEIGHBOURHOODS.map((item) => {
              const isSelected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveId(item.id)}
                  onMouseEnter={() => setActiveId(item.id)}
                  className={`w-full text-left p-4 sm:p-5 rounded-[3px] border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? "bg-white border-[var(--color-gold-400)] shadow-md translate-x-1"
                      : "bg-white/60 border-[var(--color-stone-200)] hover:bg-white hover:border-[var(--color-stone-300)]"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isSelected ? "bg-[var(--color-gold-400)]" : "bg-[var(--color-stone-300)]"
                      }`}
                    />
                    <div>
                      <h3
                        className={`text-base font-medium transition-colors ${
                          isSelected ? "text-[var(--color-navy-900)]" : "text-[var(--color-stone-800)]"
                        }`}
                      >
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-[var(--color-stone-500)] font-light line-clamp-1">
                        {item.tagline}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-[2px] transition-colors ${
                      isSelected
                        ? "bg-[var(--color-navy-900)] text-white"
                        : "bg-[var(--color-stone-200)] text-[var(--color-stone-600)]"
                    }`}
                  >
                    {item.listingCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Preview Display */}
          <div className="lg:col-span-7 bg-white rounded-[3px] border border-[var(--color-stone-300)] shadow-lg overflow-hidden transition-all duration-400">
            {/* Neighborhood Visual Frame */}
            <div className="relative aspect-[16/9] w-full bg-[var(--color-stone-900)] overflow-hidden">
              <Image
                src={activeArea.imageSrc}
                alt={activeArea.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-white">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[var(--color-gold-300)] font-semibold block mb-1">
                    Featured Neighbourhood
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-editorial font-light text-white">
                    {activeArea.name}
                  </h3>
                </div>
                <span className="px-3 py-1 bg-black/60 backdrop-blur-sm border border-white/20 text-[10px] uppercase tracking-wider text-white/90 rounded-[2px]">
                  {activeArea.listingCount}
                </span>
              </div>
            </div>

            {/* Neighborhood Data & Highlights */}
            <div className="p-7 sm:p-9 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--color-gold-500)] font-semibold mb-2">
                  {activeArea.tagline}
                </p>
                <p className="text-sm text-[var(--color-stone-700)] font-light leading-relaxed">
                  {activeArea.character}
                </p>
              </div>

              {/* Transit & Infrastructure Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--color-stone-200)] text-xs">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-stone-400)] block mb-1 font-semibold">
                    Transit & Access
                  </span>
                  <ul className="space-y-1 text-[var(--color-stone-700)] font-light">
                    {activeArea.connectivity.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-[var(--color-gold-400)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-stone-400)] block mb-1 font-semibold">
                    Key Highlights
                  </span>
                  <ul className="space-y-1 text-[var(--color-stone-700)] font-light">
                    {activeArea.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-5 border-t border-[var(--color-stone-200)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-[var(--color-stone-400)] uppercase block">Primary Typologies</span>
                  <span className="text-xs font-medium text-[var(--color-stone-800)]">{activeArea.propertyTypes}</span>
                </div>

                <Link
                  href={`/properties?location=${encodeURIComponent(activeArea.name)}`}
                  className="btn-editorial-gold text-xs py-2 px-5 whitespace-nowrap self-stretch sm:self-auto text-center"
                >
                  <span>Explore {activeArea.name} Properties</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
