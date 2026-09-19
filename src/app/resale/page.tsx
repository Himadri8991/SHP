"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import ListPropertyModal from "@/components/properties/ListPropertyModal";
import { PROPERTY_LISTINGS, PropertyListing } from "@/data/properties";
import { SITE_CONFIG } from "@/data/site-config";
import { fetchLiveProperties } from "@/lib/property-store";
import {
  MapPin,
  ArrowRight,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  Building2,
  TrendingUp,
  FileCheck2,
  Users,
  Search,
  PlusCircle,
  MessageSquare,
  CheckCircle2,
  X
} from "lucide-react";

export default function ResalePage() {
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [bhkFilter, setBhkFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const [resaleListings, setResaleListings] = useState<PropertyListing[]>(() =>
    PROPERTY_LISTINGS.filter((p) => p.category === "resale")
  );

  useEffect(() => {
    fetchLiveProperties().then((data) => {
      if (data && data.length > 0) {
        setResaleListings(data.filter((p) => p.category === "resale"));
      }
    });
  }, []);

  // Filtered listings based on search, BHK, and price
  const filteredListings = useMemo(() => {
    return resaleListings.filter((prop) => {
      // Search query filter (title, location, developer, description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesLoc = prop.location.toLowerCase().includes(q);
        const matchesDev = (prop.developer || "").toLowerCase().includes(q);
        const matchesDesc = prop.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLoc && !matchesDev && !matchesDesc) {
          return false;
        }
      }

      // BHK filter
      if (bhkFilter !== "all") {
        if (bhkFilter === "2" && prop.bedrooms !== 2) return false;
        if (bhkFilter === "3" && prop.bedrooms !== 3) return false;
        if (bhkFilter === "4+" && (prop.bedrooms === null || prop.bedrooms < 4)) return false;
      }

      // Price filter
      if (priceFilter !== "all") {
        const priceStr = prop.price || "";
        let priceInLakh = 0;
        if (priceStr.includes("Cr")) {
          const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
          priceInLakh = (num || 0) * 100;
        } else if (priceStr.includes("Lakh")) {
          const num = parseFloat(priceStr.replace(/[^0-9.]/g, ""));
          priceInLakh = num || 0;
        }

        if (priceFilter === "under-75" && priceInLakh > 75) return false;
        if (priceFilter === "75-120" && (priceInLakh < 75 || priceInLakh > 120)) return false;
        if (priceFilter === "above-120" && priceInLakh < 120) return false;
      }

      return true;
    });
  }, [resaleListings, searchQuery, bhkFilter, priceFilter]);

  const hasActiveFilters = searchQuery.trim() !== "" || bhkFilter !== "all" || priceFilter !== "all";

  const resetFilters = () => {
    setSearchQuery("");
    setBhkFilter("all");
    setPriceFilter("all");
  };

  const sellerBenefits = [
    {
      title: "Municipal & Legal Due Diligence",
      description: "Complete vetting of original sale deed, chain documents, mutation certificates, and tax receipts before any transaction.",
      icon: FileCheck2,
    },
    {
      title: "Registered Valuation Accuracy",
      description: "Realistic pricing recommendations grounded in actual ADSR registered circle rates and recent transactions in Newtown & Kolkata.",
      icon: TrendingUp,
    },
    {
      title: "Pre-Approved HNI Buyers",
      description: "Direct matchmaking with bank-sanctioned buyers and genuine end-users, bypassing casual inquiries and public listing spam.",
      icon: Users,
    },
    {
      title: "ADSR Conveyance Assistance",
      description: "End-to-end guidance through deed drafting, stamp duty assessment, and official presence during final biometric registration.",
      icon: ShieldCheck,
    },
  ];

  return (
    <>
      <Navigation />

      <main className="pt-24 sm:pt-32 pb-24 bg-[var(--surface-canvas)] min-h-screen">
        {/* === HERO SECTION === */}
        <section className="border-b border-[var(--color-stone-200)] bg-gradient-to-b from-[#FAF8F5] to-white py-16 sm:py-20">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
                  <p className="text-eyebrow text-[var(--color-gold-500)]">
                    Resale Marketplace & Owner Representation Desk
                  </p>
                </div>
                <h1 className="text-section-title text-[var(--color-stone-900)] leading-tight mb-5">
                  Verified Resale Residences &{" "}
                  <span className="font-editorial italic font-normal text-[var(--color-gold-500)]">
                    Owner Advisory.
                  </span>
                </h1>
                <p className="text-subhead text-[var(--color-stone-600)] font-light max-w-2xl leading-relaxed">
                  Discover ready-to-move secondary market flats and luxury residences across Newtown, Rajarhat, and Kolkata’s prime corridors. Clear municipal titles, authentic market valuations, and direct representation.
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-8">
                  <a
                    href="#inventory"
                    className="btn-editorial-gold text-xs px-6 py-3"
                  >
                    <span>Browse Resale Inventory</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsListModalOpen(true)}
                    className="btn-editorial-outline text-xs px-6 py-3 inline-flex items-center gap-2 cursor-pointer bg-white"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-[var(--color-gold-500)]" />
                    <span>List Your Property</span>
                  </button>
                </div>
              </div>

              {/* Quick Seller Stat Card */}
              <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-[4px] border border-[var(--color-gold-300)] shadow-lg">
                <div className="flex items-center gap-2 mb-2 text-[var(--color-gold-600)]">
                  <Building2 className="w-4 h-4" />
                  <span className="text-[11px] uppercase tracking-wider font-semibold">
                    Owner Listing Service
                  </span>
                </div>
                <h3 className="text-lg font-medium text-[var(--color-stone-900)] mb-2">
                  Selling your apartment in Kolkata?
                </h3>
                <p className="text-xs text-[var(--color-stone-600)] font-light leading-relaxed mb-6">
                  Get discrete representation, fair registry valuation, and direct access to pre-qualified buyers without spam or public listing exposure.
                </p>
                <button
                  type="button"
                  onClick={() => setIsListModalOpen(true)}
                  className="w-full btn-editorial-gold text-xs py-3 justify-center cursor-pointer"
                >
                  <span>Submit Property for Valuation</span>
                  <span className="text-xs">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* === 4 TRUST PILLARS === */}
        <section className="border-b border-[var(--color-stone-200)] bg-white py-12">
          <div className="container-wide">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {sellerBenefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-[3px] border border-[var(--color-stone-200)] bg-[var(--surface-canvas)] hover:border-[var(--color-gold-300)] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-[var(--color-gold-500)]/10 text-[var(--color-gold-600)] flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-medium text-[var(--color-stone-900)] mb-1.5">
                      {b.title}
                    </h4>
                    <p className="text-xs text-[var(--color-stone-600)] font-light leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* === RESALE INVENTORY SECTION === */}
        <section id="inventory" className="container-wide py-16 scroll-mt-24">
          {/* Header & Filter Controls */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-eyebrow text-[var(--color-gold-500)] text-[10px] mb-1">
                  Active Secondary Portfolio
                </p>
                <h2 className="text-2xl sm:text-3xl font-light text-[var(--color-stone-900)]">
                  Available Resale Flats & Residences
                </h2>
              </div>
              <div className="text-xs text-[var(--color-stone-500)]">
                Showing <strong className="text-[var(--color-stone-900)] font-medium">{filteredListings.length}</strong> verified properties
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-[4px] border border-[var(--color-stone-200)] shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[var(--color-stone-400)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by society, locality, or developer (e.g. Srijan, Eden, DTC, Newtown)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-900)] placeholder:text-[var(--color-stone-400)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
                />
              </div>

              {/* BHK Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                <span className="text-[10px] uppercase tracking-wider text-[var(--color-stone-400)] font-medium mr-1 hidden sm:inline">
                  BHK:
                </span>
                {[
                  { label: "All BHKs", val: "all" },
                  { label: "2 BHK", val: "2" },
                  { label: "3 BHK", val: "3" },
                  { label: "4+ BHK", val: "4+" },
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setBhkFilter(item.val)}
                    className={`px-3 py-2 text-xs rounded-[3px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      bhkFilter === item.val
                        ? "bg-[var(--color-stone-900)] text-white"
                        : "bg-[var(--surface-canvas)] text-[var(--color-stone-600)] hover:bg-[var(--color-stone-200)]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Price Filter Dropdown */}
              <div className="w-full lg:w-48">
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-900)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors cursor-pointer"
                >
                  <option value="all">All Budgets</option>
                  <option value="under-75">Under ₹ 75 Lakh</option>
                  <option value="75-120">₹ 75 Lakh – ₹ 1.2 Cr</option>
                  <option value="above-120">Above ₹ 1.2 Cr</option>
                </select>
              </div>

              {/* Reset Filters */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-3 py-2 text-xs text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-[3px] transition-colors inline-flex items-center gap-1 cursor-pointer"
                  title="Clear all filters"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Listings Grid */}
          {filteredListings.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-[3px] border border-[var(--color-stone-200)] my-6">
              <p className="text-lg font-light text-[var(--color-stone-800)] mb-2">
                No resale residences match your filter criteria.
              </p>
              <p className="text-xs text-[var(--color-stone-500)] max-w-md mx-auto mb-6 font-light">
                We have off-market private resale homes available across Newtown and Kolkata that owners prefer not to display publicly.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={resetFilters}
                  className="btn-editorial-gold text-xs px-5 py-2.5 cursor-pointer"
                >
                  Reset Filters
                </button>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${encodeURIComponent("Hello Sky-High Properties, I am looking for resale apartments in Kolkata with specific requirements.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-outline text-xs px-5 py-2.5"
                >
                  Inquire Off-Market Resales
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredListings.map((prop) => {
                const waPropertyMsg = encodeURIComponent(
                  `Hello Sky-High Properties, I would like to inquire about the resale property: ${prop.title} (${prop.location}) listed at ${prop.price || "On Request"}.`
                );

                return (
                  <article
                    key={prop.id}
                    className="group bg-white rounded-[3px] border border-[var(--color-stone-200)] overflow-hidden shadow-sm hover:shadow-xl hover:border-[var(--color-gold-300)] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-canvas-alt)]">
                        <Image
                          src={prop.imageSrc || "/assets/sky-high/homepage/images/01-exterior-master.webp"}
                          alt={prop.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className="px-2.5 py-1 bg-emerald-900/90 backdrop-blur-sm text-[10px] uppercase tracking-wider text-emerald-200 font-medium rounded-[2px] border border-emerald-500/30 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Direct Resale</span>
                          </span>
                          <span className="px-2.5 py-1 bg-black/70 backdrop-blur-sm text-[10px] uppercase tracking-wider text-white font-medium rounded-[2px] border border-white/10">
                            Ready to Move
                          </span>
                        </div>

                        {prop.developer && (
                          <div className="absolute bottom-3 left-3">
                            <span className="px-2 py-0.5 bg-[var(--color-gold-500)] text-[#0E0C0A] text-[10px] font-semibold tracking-wider uppercase rounded-[2px]">
                              {prop.developer}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-1.5 text-[var(--color-gold-600)] text-xs mb-2">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{prop.location}</span>
                        </div>

                        <h3 className="text-xl font-medium text-[var(--color-stone-900)] mb-2 group-hover:text-[var(--color-gold-600)] transition-colors leading-snug">
                          {prop.title}
                        </h3>

                        <p className="text-xs text-[var(--color-stone-600)] font-light line-clamp-2 mb-4 leading-relaxed">
                          {prop.description}
                        </p>

                        {/* Specs row */}
                        <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-[var(--color-stone-100)] text-xs text-[var(--color-stone-700)]">
                          {prop.bedrooms && (
                            <div className="flex items-center gap-1.5">
                              <Bed className="w-3.5 h-3.5 text-[var(--color-gold-500)] flex-shrink-0" />
                              <span>{prop.bedrooms} BHK</span>
                            </div>
                          )}
                          {prop.bathrooms && (
                            <div className="flex items-center gap-1.5">
                              <Bath className="w-3.5 h-3.5 text-[var(--color-gold-500)] flex-shrink-0" />
                              <span>{prop.bathrooms} Bath</span>
                            </div>
                          )}
                          {prop.areaSqft && (
                            <div className="flex items-center gap-1.5">
                              <Maximize2 className="w-3.5 h-3.5 text-[var(--color-gold-500)] flex-shrink-0" />
                              <span>{prop.areaSqft} sqft</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Pricing & Action */}
                    <div className="p-6 pt-0">
                      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-stone-100)] mb-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-[var(--color-stone-400)] font-medium">
                            Expected Price
                          </p>
                          <p className="text-lg font-editorial italic font-normal text-[var(--color-stone-900)]">
                            {prop.price || "On Request"}
                          </p>
                        </div>
                        <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                          Clear Mutation
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/properties/${prop.slug}`}
                          className="btn-editorial-outline text-[11px] py-2 px-3 justify-center text-center"
                        >
                          <span>Details</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>

                        <a
                          href={`https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${waPropertyMsg}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-editorial-gold text-[11px] py-2 px-3 justify-center text-center"
                        >
                          <MessageSquare className="w-3 h-3" />
                          <span>Inquire</span>
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* === OWNER CONVEYANCE & SELLER SECTION === */}
        <section className="container-wide py-12">
          <div className="bg-[#14120E] text-white rounded-[4px] p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-gold-500)]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-px bg-[var(--color-gold-400)]" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold-400)] font-semibold">
                    Owner Representation & Resale Desk
                  </p>
                </div>
                <h3 className="text-2xl sm:text-4xl font-light text-white leading-tight">
                  Looking to sell or exit your property in{" "}
                  <span className="font-editorial italic text-[var(--color-gold-300)]">
                    Newtown or Kolkata?
                  </span>
                </h3>
                <p className="text-sm text-white/70 font-light leading-relaxed max-w-xl">
                  Sky-High Properties represents homeowners with complete discretion, certified registry valuation, and dedicated legal conveyance. We match your property with verified buyers without cold callers or unvetted walk-ins.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
                  <div className="flex items-start gap-2 text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-gold-400)] flex-shrink-0 mt-0.5" />
                    <span>Free on-site assessment & registry rate check</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-gold-400)] flex-shrink-0 mt-0.5" />
                    <span>Private showcase to pre-qualified buyers</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80">
                    <CheckCircle2 className="w-4 h-4 text-[var(--color-gold-400)] flex-shrink-0 mt-0.5" />
                    <span>Complete ADSR registration & deed support</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => setIsListModalOpen(true)}
                  className="btn-editorial-gold text-xs py-4 px-6 justify-center shadow-lg cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  <span>List Your Resale Apartment Now</span>
                </button>

                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${encodeURIComponent("Hello Sky-High Properties, I want to consult on selling my resale flat in Kolkata.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-outline text-xs py-3.5 px-6 justify-center border-white/20 text-white hover:bg-white hover:text-black transition-colors"
                >
                  <MessageSquare className="w-4 h-4 mr-2 text-[var(--color-gold-400)]" />
                  <span>WhatsApp Senior Valuation Consultant</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />

      {/* Interactive Modal for Listing Resale Property */}
      <ListPropertyModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        defaultIntent="resale"
      />
    </>
  );
}
