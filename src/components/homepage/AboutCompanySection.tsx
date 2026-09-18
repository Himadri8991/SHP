"use client";

import Link from "next/link";
import { Search, ShieldCheck, Compass, Handshake, ArrowRight } from "lucide-react";

export default function AboutCompanySection() {
  const steps = [
    {
      number: "01",
      title: "Understand",
      subtitle: "Requirements & Goals",
      description:
        "We listen to your specific spatial, budget, and lifestyle priorities before shortlisting properties, ensuring your time is spent only on relevant opportunities.",
      icon: Search,
    },
    {
      number: "02",
      title: "Verify",
      subtitle: "Titles & Legal Clearances",
      description:
        "Every listing undergoes rigorous checks: sanctioned municipal plans, clean mutation records, and registered title deeds with zero ambiguities.",
      icon: ShieldCheck,
    },
    {
      number: "03",
      title: "Advise",
      subtitle: "Honest Market Pricing",
      description:
        "We provide transparent micro-market valuation, comparative price analysis, and objective guidance to ensure you make an informed decision.",
      icon: Compass,
    },
    {
      number: "04",
      title: "Assist",
      subtitle: "Conveyance to Possession",
      description:
        "From private site visits and fair negotiations to bank loan liaising, ADSR registry, and key handover, our team assists you at every step.",
      icon: Handshake,
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-24 pt-24 sm:pt-32 pb-24 sm:pb-32 bg-[var(--surface-canvas)] text-[var(--text-primary)] border-t border-[var(--color-stone-300)]"
    >
      <div className="container-wide">
        {/* === HEADER === */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-16 border-b border-[var(--color-stone-300)] mb-16">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
              <p className="text-eyebrow text-[var(--color-gold-500)]">
                About Sky-High Properties · Real Estate Advisory
              </p>
            </div>
            <h2
              id="about-title"
              className="text-section-title text-[var(--color-stone-900)] leading-tight"
            >
              More than{" "}
              <span className="font-editorial italic font-normal">
                property listings.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <p className="text-base sm:text-lg text-[var(--color-stone-700)] font-light leading-relaxed mb-6">
              Sky-High Properties is a Kolkata-based real estate consultancy helping clients discover residential, commercial, and investment opportunities across Newtown, Rajarhat, and key growth corridors across Kolkata.
            </p>
            <p className="text-sm text-[var(--color-stone-600)] font-light leading-relaxed mb-6">
              Whether you are buying your first home, upgrading to a luxury penthouse, leasing commercial space, or seeking high-yield land, we bring transparency, legal rigor, and deep neighborhood knowledge to your property journey.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#contact"
                className="btn-editorial-gold text-[11px]"
              >
                <span>Talk to an Advisor</span>
                <span className="text-xs">→</span>
              </a>
              <Link
                href="/#portfolio"
                className="editorial-link text-[11px]"
              >
                <span>Browse Listings</span>
                <span className="text-xs">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* === 4-STEP CONSULTANCY PROCESS === */}
        <div className="mb-8">
          <p className="text-eyebrow text-[var(--color-gold-500)] mb-2 uppercase tracking-widest text-[11px]">
            How We Work · Simple & Transparent Process
          </p>
          <h3 className="text-2xl sm:text-3xl font-light text-[var(--color-stone-900)] mb-10">
            A structured approach from search to settlement.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white p-7 rounded-[3px] border border-[var(--color-stone-200)] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-light text-[var(--color-gold-500)] font-editorial">
                      {step.number}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[var(--surface-canvas-alt)] flex items-center justify-center text-[var(--color-stone-700)] border border-[var(--color-stone-200)]">
                      <Icon className="w-4 h-4 text-[var(--color-gold-500)]" />
                    </div>
                  </div>

                  <h4 className="text-lg font-medium text-[var(--color-stone-900)] mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs uppercase tracking-wider text-[var(--color-stone-400)] font-medium mb-3">
                    {step.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--color-stone-600)] font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
