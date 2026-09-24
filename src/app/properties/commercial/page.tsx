"use client";

import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { PROPERTY_LISTINGS } from "@/data/properties";
import { SITE_CONFIG } from "@/data/site-config";
import { MapPin, ArrowRight, Building2, ShieldCheck, CheckCircle2, MessageSquare } from "lucide-react";

export default function CommercialPage() {
  const listings = PROPERTY_LISTINGS.filter(
    (p) => p.category === "commercial" || p.type === "commercial" || p.title.toLowerCase().includes("commercial")
  );

  return (
    <>
      <Navigation />

      <main className="pt-24 sm:pt-32 pb-24 bg-[var(--surface-canvas)] min-h-screen">
        {/* Page Header */}
        <div className="border-b border-[var(--color-stone-200)] pb-12 sm:pb-16 bg-white">
          <div className="container-wide">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
              <p className="text-eyebrow text-[var(--color-gold-500)]">
                Commercial Real Estate · Sector V, Newtown & Rajarhat
              </p>
            </div>
            <h1 className="text-section-title text-[var(--color-stone-900)] leading-tight">
              Grade-A Commercial Spaces & Retail Assets
            </h1>
            <p className="text-subhead text-[var(--color-stone-600)] font-light mt-3 max-w-2xl leading-relaxed">
              Curated corporate office floors, high-street retail showrooms, and prime commercial corridors across Kolkata&apos;s leading business corridors with verified title deeds and sanctioned FAR.
            </p>

            {/* Quick Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-[var(--color-stone-700)]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--color-gold-500)]" />
                <span>Sanctioned Commercial Approvals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-gold-500)]" />
                <span>100% Mutation & Title Clearance</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[var(--color-gold-500)]" />
                <span>Sector V & Newtown IT Corridor Hubs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Listings Section */}
        <div className="container-wide py-12">
          {listings.length === 0 ? (
            <div className="bg-white p-16 text-center rounded-[3px] border border-[var(--color-stone-200)]">
              <p className="text-xl font-light text-[var(--color-stone-800)] mb-2">
                Confidential Off-Market Commercial Portfolios
              </p>
              <p className="text-sm text-[var(--color-stone-500)] max-w-md mx-auto mb-6 font-light">
                Many of Kolkata&apos;s prime corporate leases and commercial floors are transacted privately without public advertising. Connect with our commercial advisory desk.
              </p>
              <Link href="/contact" className="btn-editorial-gold text-xs">
                Inquire With Concierge
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {listings.map((prop) => (
                <article
                  key={prop.id}
                  className="group bg-white rounded-[3px] border border-[var(--color-stone-200)] overflow-hidden shadow-sm hover:shadow-xl hover:border-[var(--color-gold-300)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface-canvas-alt)]">
                      <Image
                        src={prop.imageSrc || "/assets/sky-high/homepage/images/01-exterior-master.webp"}
                        alt={prop.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-wider text-white font-medium rounded-[2px] border border-white/10">
                          Commercial
                        </span>
                        {prop.developer && (
                          <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[10px] uppercase tracking-wider text-[var(--color-navy-900)] font-semibold rounded-[2px]">
                            {prop.developer}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-[var(--color-gold-600)] text-xs mb-2">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{prop.location}</span>
                      </div>

                      <h2 className="text-xl font-medium text-[var(--color-stone-900)] mb-2 group-hover:text-[var(--color-navy-900)] transition-colors leading-snug">
                        {prop.title}
                      </h2>

                      <p className="text-xs text-[var(--color-stone-600)] font-light line-clamp-2 mb-4 leading-relaxed">
                        {prop.description}
                      </p>

                      {prop.areaSqft && (
                        <div className="pt-2 pb-3 border-t border-[var(--color-stone-100)] flex items-center justify-between text-xs text-[var(--color-stone-600)]">
                          <span>Super Built-up Area</span>
                          <span className="font-medium text-[var(--color-stone-900)]">{prop.areaSqft.toLocaleString()} sq.ft</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between border-t border-[var(--color-stone-100)]">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[var(--color-stone-400)] font-medium">Pricing</p>
                      <p className="text-lg font-light tracking-tight text-[var(--color-navy-900)]">
                        {prop.price || "On Request"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${encodeURIComponent(`Hi Sky-High Properties, I would like to inquire about the commercial asset: ${prop.title} in ${prop.location}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[var(--color-stone-500)] hover:text-emerald-600 transition-colors"
                        aria-label="WhatsApp Inquiry"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                      <Link
                        href={`/properties/${prop.slug}`}
                        className="btn-editorial-gold text-xs px-4 py-2"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Commercial Concierge Advisory Banner */}
        <div className="container-wide mt-12">
          <div className="bg-[var(--surface-navy)] text-white p-8 sm:p-12 rounded-[3px] border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-eyebrow text-[var(--color-gold-400)] mb-2 block">
                Bespoke Corporate Mandates
              </span>
              <h3 className="text-2xl sm:text-3xl font-light leading-tight mb-3">
                Looking for large-floor office plates or high-visibility retail?
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                We represent institutional corporate tenants, IT companies, and medical networks for lease acquisition, lease renewals, and pre-leased commercial investments with verified ROI models.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
              <Link href="/contact" className="btn-editorial-gold text-xs">
                Book Corporate Consultation
              </Link>
              <a
                href={SITE_CONFIG.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial text-xs border-white/20 hover:bg-white hover:text-black"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
