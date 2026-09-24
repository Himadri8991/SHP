"use client";

import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { PROPERTY_LISTINGS } from "@/data/properties";
import { MapPin, ArrowRight } from "lucide-react";

export default function CategoryPage() {
  const listings = PROPERTY_LISTINGS.filter(p => p.category === "resale");

  return (
    <>
      <Navigation />

      <main className="pt-24 sm:pt-32 pb-24 bg-[var(--surface-canvas)] min-h-screen">
        <div className="border-b border-[var(--color-stone-200)] pb-12 sm:pb-16 bg-white">
          <div className="container-wide">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
              <p className="text-eyebrow text-[var(--color-gold-500)]">Resale Residences · Vetted Titles</p>
            </div>
            <h1 className="text-section-title text-[var(--color-stone-900)] leading-tight">
              Curated Resale Residences
            </h1>
            <p className="text-subhead text-[var(--color-stone-600)] font-light mt-3 max-w-2xl">
              Handpicked secondary market homes, townhouses, and penthouses with clean municipal mutation and clear chain of title.
            </p>
          </div>
        </div>

        <div className="container-wide py-12">
          {listings.length === 0 ? (
            <div className="bg-white p-16 text-center rounded-[3px] border border-[var(--color-stone-200)]">
              <p className="text-xl font-light text-[var(--color-stone-800)] mb-2">
                No active public listings currently displayed in this category.
              </p>
              <p className="text-sm text-[var(--color-stone-500)] max-w-md mx-auto mb-6 font-light">
                We manage exclusive off-market opportunities that are kept strictly confidential. Contact our concierge to discuss your bespoke requirements.
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
                      <div className="absolute top-4 left-4">
                        <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-wider text-white font-medium rounded-[2px] border border-white/10">
                          {prop.category.replace("-", " ")}
                        </span>
                      </div>
                    </div>

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
                    </div>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between border-t border-[var(--color-stone-100)]">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[var(--color-stone-400)] font-medium">Pricing</p>
                      <p className="text-lg font-semibold tracking-tight text-[var(--color-navy-900)]">
                        {prop.price || "On Request"}
                      </p>
                    </div>

                    <Link
                      href={`/properties/${prop.slug}`}
                      className="btn-editorial-gold text-xs px-4 py-2"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
