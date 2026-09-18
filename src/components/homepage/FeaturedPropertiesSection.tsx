"use client";

import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize2, ShieldCheck, ArrowRight, MessageSquare, MapPin } from "lucide-react";
import { PROPERTY_LISTINGS } from "@/data/properties";
import { SITE_CONFIG } from "@/data/site-config";

export default function FeaturedPropertiesSection() {
  const flagship = PROPERTY_LISTINGS[0]; // PS One10 — Signature Tower
  const secondaryListings = PROPERTY_LISTINGS.slice(1, 4); // Next 3 featured listings

  return (
    <section
      id="portfolio"
      aria-labelledby="featured-portfolio-title"
      className="scroll-mt-24 py-24 sm:py-32 bg-[var(--surface-canvas)] text-[var(--text-primary)] border-t border-[var(--color-stone-200)]"
    >
      <div className="container-wide">
        {/* === SECTION HEADER === */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[var(--color-stone-300)] mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
              <p className="text-eyebrow text-[var(--color-gold-500)] text-[10px]">
                Curated Collection · Kolkata Prime
              </p>
            </div>
            <h2
              id="featured-portfolio-title"
              className="text-section-title text-[var(--color-stone-900)]"
            >
              Featured properties.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-subhead text-[var(--color-stone-600)] max-w-md font-light">
              Carefully selected residences combining architectural integrity, clear title registry, and premier connectivity.
            </p>
            <Link
              href="/properties"
              className="editorial-link text-[11px] whitespace-nowrap self-start sm:self-auto"
            >
              <span>View All Properties</span>
              <span className="text-xs">→</span>
            </Link>
          </div>
        </div>

        {/* === 01: HERO ASYMMETRIC SPOTLIGHT (PS One10 — Signature Tower) === */}
        {flagship && (
          <div className="bg-white rounded-[3px] border border-[var(--color-stone-300)] p-6 sm:p-10 lg:p-12 shadow-md mb-16 hover:shadow-xl transition-shadow duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* Primary Showcase Image */}
              <div className="lg:col-span-7">
                <Link
                  href={`/properties/${flagship.slug}`}
                  className="block relative aspect-[16/10] w-full rounded-[2px] overflow-hidden group"
                >
                  <Image
                    src={flagship.imageSrc}
                    alt={flagship.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 text-[10px] tracking-widest uppercase font-semibold bg-[#0C0B08]/90 text-white rounded-[2px] backdrop-blur-sm">
                      Flagship Feature
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] tracking-wider uppercase font-medium bg-emerald-950/80 text-emerald-200 rounded-[2px] border border-emerald-500/30 backdrop-blur-sm">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Verified Project</span>
                    </span>
                  </div>
                </Link>
              </div>

              {/* Editorial Details */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-[var(--color-gold-500)] text-xs uppercase tracking-wider font-semibold mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{flagship.location}</span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-light text-[var(--color-stone-900)] mb-3 leading-snug">
                    <Link
                      href={`/properties/${flagship.slug}`}
                      className="hover:text-[var(--color-navy-900)] transition-colors"
                    >
                      {flagship.title}
                    </Link>
                  </h3>

                  <div className="text-2xl sm:text-3xl font-light text-[var(--color-navy-900)] mb-4 font-editorial">
                    {flagship.price}
                  </div>

                  <p className="text-sm sm:text-base text-[var(--color-stone-600)] font-light leading-relaxed mb-6">
                    {flagship.description}
                  </p>

                  {/* Specs Strip */}
                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-[var(--color-stone-200)] text-xs text-[var(--color-stone-700)] mb-8">
                    <div>
                      <span className="text-[10px] uppercase text-[var(--color-stone-400)] block">Configuration</span>
                      <span className="font-medium text-sm text-[var(--color-stone-900)]">{flagship.bedrooms} BHK</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[var(--color-stone-400)] block">Bathrooms</span>
                      <span className="font-medium text-sm text-[var(--color-stone-900)]">{flagship.bathrooms} Baths</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[var(--color-stone-400)] block">Built-up Area</span>
                      <span className="font-medium text-sm text-[var(--color-stone-900)]">{flagship.areaSqft} sq.ft</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={`/properties/${flagship.slug}`}
                    className="btn-editorial-gold text-xs py-2.5 px-6"
                  >
                    <span>View Property Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${encodeURIComponent(`Hi Sky-High Properties, I am interested in ${flagship.title} in Newtown (${flagship.price}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-editorial text-xs py-2.5 px-5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[var(--color-gold-500)]" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === 02: REFINED SECONDARY PROPERTY ROW === */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl sm:text-2xl font-light text-[var(--color-stone-900)]">
              Additional Handpicked Residences
            </h4>
            <Link
              href="/properties"
              className="editorial-link text-[11px]"
            >
              <span>See All ({PROPERTY_LISTINGS.length})</span>
              <span className="text-xs">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {secondaryListings.map((property) => (
              <article
                key={property.id}
                className="group bg-white rounded-[3px] border border-[var(--color-stone-200)] shadow-sm hover:shadow-xl transition-all duration-400 flex flex-col overflow-hidden"
              >
                {/* Image */}
                <Link
                  href={`/properties/${property.slug}`}
                  className="relative aspect-[16/10] overflow-hidden bg-[var(--color-stone-200)] block"
                >
                  <Image
                    src={property.imageSrc}
                    alt={property.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 text-[10px] tracking-widest uppercase font-semibold bg-[#0C0B08]/80 backdrop-blur-sm text-white rounded-[2px]">
                      {property.type}
                    </span>
                    {property.developer && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] tracking-wider uppercase font-medium bg-[var(--color-gold-500)] text-black rounded-[2px] font-semibold">
                        <span>{property.developer}</span>
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1 text-xs font-semibold tracking-wide bg-[#0C0B08]/90 backdrop-blur-sm text-[var(--color-gold-300)] rounded-[2px]">
                      {property.price}
                    </span>
                  </div>
                </Link>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[var(--color-gold-500)] font-semibold mb-1">
                      {property.location}
                    </p>
                    <h5 className="text-lg font-medium text-[var(--color-stone-900)] group-hover:text-[var(--color-navy-900)] transition-colors mb-2">
                      <Link href={`/properties/${property.slug}`}>
                        {property.title}
                      </Link>
                    </h5>
                    <p className="text-xs text-[var(--color-stone-600)] font-light line-clamp-2 mb-4 leading-relaxed">
                      {property.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between py-2.5 border-t border-b border-[var(--color-stone-100)] text-xs text-[var(--color-stone-600)] mb-4">
                      {property.bedrooms && (
                        <span>{property.bedrooms} BHK</span>
                      )}
                      {property.bathrooms && (
                        <span>{property.bathrooms} Baths</span>
                      )}
                      {property.areaSqft && (
                        <span>{property.areaSqft} sq.ft</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href={`/properties/${property.slug}`}
                        className="text-xs font-medium text-[var(--color-navy-900)] hover:text-[var(--color-gold-500)] transition-colors flex items-center gap-1"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>

                      <a
                        href={`https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${encodeURIComponent(`Hi Sky-High Properties, I would like to inquire about ${property.title} in ${property.location}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-[var(--color-stone-500)] hover:text-[var(--color-gold-500)] transition-colors flex items-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3 text-emerald-600" />
                        <span>Inquire</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
