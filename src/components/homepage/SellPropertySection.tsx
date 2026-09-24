"use client";

import { useState } from "react";
import { Building2, TrendingUp, FileCheck2 } from "lucide-react";
import ListPropertyModal from "@/components/properties/ListPropertyModal";

export default function SellPropertySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sellerBenefits = [
    {
      title: "Accurate Market Valuation",
      description: "Data-driven pricing guidance based on recent registered registry transactions in Newtown and Kolkata.",
      icon: TrendingUp,
    },
    {
      title: "Qualified Buyer Network",
      description: "Direct outreach to verified home buyers, corporate clients, and investors actively seeking properties.",
      icon: Building2,
    },
    {
      title: "Legal & Documentation Support",
      description: "Complete assistance with title deed verification, municipal mutation, NOCs, and ADSR registration.",
      icon: FileCheck2,
    },
  ];

  return (
    <section
      id="sell"
      aria-labelledby="sell-title"
      className="scroll-mt-24 pt-24 sm:pt-32 pb-24 sm:pb-32 bg-[var(--color-navy-900)] text-white border-t border-white/10 relative overflow-hidden"
    >
      {/* Background Decorative Accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-gold-400)]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
              <p className="text-eyebrow text-[var(--color-gold-400)]">
                Property Owners · Resale & Valuation Advisory
              </p>
            </div>

            <h2
              id="sell-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6"
            >
              Selling or reselling a{" "}
              <span className="font-editorial italic font-normal text-[var(--color-gold-300)]">
                property in Kolkata?
              </span>
            </h2>

            <p className="text-white/80 text-base sm:text-lg font-light leading-relaxed mb-8">
              Get professional assistance with property positioning, accurate market valuation, targeted marketing, and connecting with serious, verified buyers without the hassle of unvetted inquiries.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="btn-editorial-gold text-[11px] cursor-pointer"
              >
                <span>List / Sell Your Property</span>
                <span className="text-xs">→</span>
              </button>

              <a
                href="#contact"
                className="btn-editorial-outline text-[11px] border-white/20 text-white hover:bg-white hover:text-black"
              >
                <span>Request Valuation Call</span>
              </a>
            </div>
          </div>

          {/* Right Column: Seller Benefits Cards */}
          <div className="lg:col-span-6 space-y-4">
            {sellerBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/[0.04] p-6 rounded-[3px] border border-white/10 hover:border-[var(--color-gold-400)]/40 transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-gold-400)]/10 flex items-center justify-center text-[var(--color-gold-300)] flex-shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-white/70 font-light leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ListPropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultIntent="resale"
      />
    </section>
  );
}
