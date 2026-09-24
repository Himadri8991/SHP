"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { PROPERTY_LISTINGS, TOP_DEVELOPERS, PropertyListing } from "@/data/properties";
import { SITE_CONFIG } from "@/data/site-config";
import { Search, MapPin, ArrowRight, Phone, ShieldCheck } from "lucide-react";
import { fetchLiveProperties } from "@/lib/property-store";

type CategoryFilter = "all" | "new-project" | "resale" | "rent" | "land-plot" | "commercial";

function parsePrice(price?: string | null): number {
  if (!price) return 0;
  const clean = price.replace(/₹|,|\s|\/.*$/g, "");
  if (price.includes("Cr")) {
    const num = parseFloat(clean.replace("Cr", ""));
    return isNaN(num) ? 0 : num * 10000000;
  }
  if (price.includes("L")) {
    const num = parseFloat(clean.replace("L", ""));
    return isNaN(num) ? 0 : num * 100000;
  }
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
}

const LOCATIONS_LIST = [
  "all",
  "Newtown",
  "Rajarhat",
  "Salt Lake",
  "Alipore",
  "Ballygunge",
  "Dum Dum",
  "Joka",
  "EM Bypass",
];

function PropertiesCatalogContent() {
  const searchParams = useSearchParams();
  const [liveListings, setLiveListings] = useState<PropertyListing[]>(PROPERTY_LISTINGS);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedDeveloper, setSelectedDeveloper] = useState<string>("all");
  const [selectedBhk, setSelectedBhk] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");

  useEffect(() => {
    fetchLiveProperties().then((data) => {
      if (data && data.length > 0) {
        setLiveListings(data);
      }
    });
  }, []);

  const categories = [
    { id: "all", label: "All Properties", count: liveListings.length },
    { id: "new-project", label: "New Projects", count: liveListings.filter(p => p.category === "new-project").length },
    { id: "resale", label: "Resale", count: liveListings.filter(p => p.category === "resale").length },
    { id: "rent", label: "Luxury Rent", count: liveListings.filter(p => p.category === "rent").length },
    { id: "land-plot", label: "Land & Plots", count: liveListings.filter(p => p.category === "land-plot").length },
    { id: "commercial", label: "Commercial", count: liveListings.filter(p => p.type === "commercial").length },
  ];

  const locations = LOCATIONS_LIST;

  useEffect(() => {
    const locParam = searchParams.get("location");
    const catParam = searchParams.get("category");
    const devParam = searchParams.get("developer");
    const purposeParam = searchParams.get("purpose");
    const typeParam = searchParams.get("type");
    const qParam = searchParams.get("q");

    if (locParam) {
      const match = LOCATIONS_LIST.find(l => l.toLowerCase().includes(locParam.toLowerCase()) || locParam.toLowerCase().includes(l.toLowerCase()));
      if (match) setSelectedLocation(match);
    }

    if (devParam) {
      const match = TOP_DEVELOPERS.find(d => d.toLowerCase().includes(devParam.toLowerCase()) || devParam.toLowerCase().includes(d.toLowerCase()));
      if (match) setSelectedDeveloper(match);
    }

    if (catParam && ["new-project", "resale", "rent", "land-plot", "commercial"].includes(catParam)) {
      setSelectedCategory(catParam as CategoryFilter);
    } else if (purposeParam === "rent") {
      setSelectedCategory("rent");
    } else if (typeParam === "commercial") {
      setSelectedCategory("commercial");
    }

    if (qParam) {
      setSearchQuery(qParam);
    }
  }, [searchParams]);

  const filteredProperties = useMemo(() => {
    const filtered = liveListings.filter((prop) => {
      // Category filter
      if (selectedCategory !== "all") {
        if (selectedCategory === "commercial") {
          if (prop.type !== "commercial") return false;
        } else if (prop.category !== selectedCategory) {
          return false;
        }
      }
      // Location filter
      if (selectedLocation !== "all" && !prop.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
        return false;
      }
      // Developer filter
      if (selectedDeveloper !== "all" && (!prop.developer || !prop.developer.toLowerCase().includes(selectedDeveloper.toLowerCase()))) {
        return false;
      }
      // BHK filter
      if (selectedBhk !== "all") {
        if (selectedBhk === "4+" && (prop.bedrooms === null || prop.bedrooms < 4)) return false;
        if (selectedBhk !== "4+" && prop.bedrooms !== parseInt(selectedBhk)) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesLoc = prop.location.toLowerCase().includes(q);
        const matchesDev = prop.developer?.toLowerCase().includes(q) ?? false;
        const matchesType = prop.type.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLoc && !matchesDev && !matchesType) return false;
      }
      return true;
    });

    if (sortBy === "price-asc") {
      return [...filtered].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    }
    if (sortBy === "price-desc") {
      return [...filtered].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }
    return filtered;
  }, [liveListings, selectedCategory, selectedLocation, selectedDeveloper, selectedBhk, searchQuery, sortBy]);

  return (
    <>
      <Navigation />

      <main className="pt-24 sm:pt-32 pb-24 bg-[var(--surface-canvas)] min-h-screen">
        {/* Header Movement */}
        <div className="border-b border-[var(--color-stone-200)] pb-12 sm:pb-16 bg-white">
          <div className="container-wide">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
              <p className="text-eyebrow text-[var(--color-gold-500)]">
                The Curated Portfolio · Kolkata & Newtown
              </p>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <h1 className="text-section-title text-[var(--color-stone-900)] leading-tight">
                  Verified residences &{" "}
                  <span className="font-editorial italic font-normal text-[var(--color-gold-500)]">
                    prime parcels.
                  </span>
                </h1>
                <p className="text-subhead text-[var(--color-stone-600)] font-light mt-3 max-w-2xl">
                  Explore hand-picked residential villas, luxury apartments, commercial floors, and sanctioned plots vetted by Sky-High Properties.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="#contact-concierge"
                  className="btn-editorial-gold text-xs whitespace-nowrap"
                >
                  Request Off-Market Search
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="container-wide py-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-[var(--color-stone-200)]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-[3px] transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-[var(--color-stone-900)] text-white shadow-sm"
                    : "bg-white text-[var(--color-stone-600)] border border-[var(--color-stone-200)] hover:border-[var(--color-gold-400)]"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          {/* Search, Location, Developer & Sort Filters */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mt-6">
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-[var(--color-stone-400)] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by neighborhood, project name, or BHK..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-[var(--color-stone-200)] rounded-[3px] text-xs sm:text-sm text-[var(--color-stone-800)] placeholder:text-[var(--color-stone-400)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-[var(--color-stone-200)] rounded-[3px] text-xs sm:text-sm text-[var(--color-stone-800)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors cursor-pointer"
              >
                <option value="all">All Locations</option>
                {locations.filter(l => l !== "all").map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedDeveloper}
                onChange={(e) => setSelectedDeveloper(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-[var(--color-stone-200)] rounded-[3px] text-xs sm:text-sm text-[var(--color-stone-800)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors cursor-pointer"
              >
                <option value="all">All Developers</option>
                {TOP_DEVELOPERS.map((dev) => (
                  <option key={dev} value={dev}>{dev}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "featured" | "price-asc" | "price-desc")}
                className="w-full px-3 py-3 bg-white border border-[var(--color-stone-200)] rounded-[3px] text-xs sm:text-sm text-[var(--color-stone-800)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Quick BHK Filter Pills */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[var(--color-stone-200)] overflow-x-auto pb-1">
            <span className="text-[11px] uppercase tracking-wider text-[var(--color-stone-400)] font-medium mr-2 flex-shrink-0">
              BHK:
            </span>
            {["all", "2", "3", "4+"].map((bhk) => (
              <button
                key={bhk}
                onClick={() => setSelectedBhk(bhk)}
                className={`px-3 py-1 text-xs rounded-[2px] transition-colors flex-shrink-0 cursor-pointer ${
                  selectedBhk === bhk
                    ? "bg-[var(--color-stone-900)] text-white font-medium"
                    : "bg-white text-[var(--color-stone-600)] border border-[var(--color-stone-200)] hover:border-[var(--color-stone-400)]"
                }`}
              >
                {bhk === "all" ? "All Configurations" : `${bhk} BHK`}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="container-wide pb-20">
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs text-[var(--color-stone-500)] uppercase tracking-wider font-medium">
              Showing <span className="text-[var(--color-stone-900)] font-semibold">{filteredProperties.length}</span> Verified Properties
            </p>
            {(selectedCategory !== "all" || selectedLocation !== "all" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedLocation("all");
                  setSearchQuery("");
                }}
                className="text-xs text-[var(--color-gold-600)] hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>

          {filteredProperties.length === 0 ? (
            <div className="bg-white p-16 text-center rounded-[3px] border border-[var(--color-stone-200)]">
              <p className="text-xl font-light text-[var(--color-stone-800)] mb-2">
                No properties match your current criteria.
              </p>
              <p className="text-sm text-[var(--color-stone-500)] max-w-md mx-auto mb-6 font-light">
                We continuously source private off-market listings across Newtown and Kolkata that are not publicly displayed.
              </p>
              <a
                href="#contact-concierge"
                className="btn-editorial-gold text-xs"
              >
                Inquire for Private Listings
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((prop) => (
                <article
                  key={prop.id}
                  className="group bg-white rounded-[3px] border border-[var(--color-stone-200)] overflow-hidden shadow-sm hover:shadow-xl hover:border-[var(--color-gold-300)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-canvas-alt)]">
                      <Image
                        src={prop.imageSrc || "/assets/sky-high/homepage/images/01-exterior-master.webp"}
                        alt={prop.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-wider text-white font-medium rounded-[2px] border border-white/10">
                          {prop.category.replace("-", " ")}
                        </span>
                        {prop.developer && (
                          <span className="px-2.5 py-1 bg-[var(--color-gold-500)] text-[10px] uppercase tracking-wider text-black font-semibold rounded-[2px]">
                            {prop.developer}
                          </span>
                        )}
                      </div>

                      {/* Verified Badge */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/90 text-xs font-light">
                        <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-gold-300)]" />
                        <span>Verified Title & Plan</span>
                      </div>
                    </div>

                    {/* Content Box */}
                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-[var(--color-gold-600)] text-xs mb-2">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{prop.location}</span>
                      </div>

                      <h2 className="text-xl font-medium text-[var(--color-stone-900)] mb-2 group-hover:text-[var(--color-gold-600)] transition-colors leading-snug">
                        {prop.title}
                      </h2>

                      <p className="text-xs text-[var(--color-stone-600)] font-light line-clamp-2 mb-6 leading-relaxed">
                        {prop.description}
                      </p>

                      {/* Specs Strip */}
                      <div className="grid grid-cols-3 gap-2 py-3 border-y border-[var(--color-stone-100)] text-center text-xs text-[var(--color-stone-700)]">
                        <div>
                          <p className="text-[10px] uppercase text-[var(--color-stone-400)] tracking-wider">Layout</p>
                          <p className="font-medium mt-0.5">{prop.bedrooms ? `${prop.bedrooms} BHK` : prop.type}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-[var(--color-stone-400)] tracking-wider">Bathrooms</p>
                          <p className="font-medium mt-0.5">{prop.bathrooms ? `${prop.bathrooms} Baths` : "—"}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase text-[var(--color-stone-400)] tracking-wider">Built-up</p>
                          <p className="font-medium mt-0.5">{prop.areaSqft ? `${prop.areaSqft.toLocaleString()} sq.ft` : "On Request"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Strip */}
                  <div className="p-6 pt-0 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[var(--color-stone-400)] font-medium">Pricing</p>
                      <p className="text-lg font-semibold tracking-tight text-[var(--color-navy-900)]">
                        {prop.price || "Contact for Price"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/properties/${prop.slug}`}
                        className="btn-editorial-gold text-xs px-4 py-2"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Off-Market Concierge Banner */}
          <div id="contact-concierge" className="mt-16 bg-[var(--surface-navy)] text-white p-8 sm:p-12 rounded-[3px] border border-white/10 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-px bg-[var(--color-gold-400)]" />
                <p className="text-eyebrow text-[var(--color-gold-300)]">Concierge Service</p>
              </div>
              <h3 className="text-2xl sm:text-3xl font-light mb-4">
                Seeking a bespoke residence or off-market parcel?
              </h3>
              <p className="text-sm text-white/75 font-light leading-relaxed mb-6">
                Many of Kolkata&apos;s most distinguished residential villas, penthouses, and commercial parcels are transacted confidentially without public advertising. Connect directly with our founding advisory team.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=Hello%20Sky-High%20Properties,%20I%20am%20looking%20for%20a%20confidential%20property%20consultation`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-gold text-xs"
                >
                  Consult via WhatsApp
                </a>
                <a
                  href={`tel:${SITE_CONFIG.contact.phonePrimary.replace(/\s/g, "")}`}
                  className="btn-editorial-outline text-xs text-white border-white/20 hover:bg-white/10"
                >
                  <Phone className="w-3.5 h-3.5 mr-1.5 inline" />
                  Call: {SITE_CONFIG.contact.phonePrimary}
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--surface-canvas)] flex items-center justify-center">
          <p className="text-sm font-light text-[var(--color-stone-500)] tracking-widest uppercase">
            Loading Curated Portfolio...
          </p>
        </div>
      }
    >
      <PropertiesCatalogContent />
    </Suspense>
  );
}
