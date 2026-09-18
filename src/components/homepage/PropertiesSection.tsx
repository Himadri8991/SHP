import Image from "next/image";
import Link from "next/link";
import { HOMEPAGE_IMAGES } from "@/lib/site-assets";
import { SITE_CONFIG } from "@/data/site-config";

export default function PropertiesSection() {
  return (
    <section
      id="flagship"
      aria-labelledby="flagship-title"
      className="scroll-mt-24 sm:scroll-mt-28 pt-28 sm:pt-36 pb-24 sm:pb-32 bg-[var(--surface-canvas-alt)] text-[var(--text-primary)] border-t border-[var(--color-stone-300)]"
    >
      <div className="container-wide">
        {/* === SECTION HEADER === */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[var(--color-stone-300)] mb-14">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
              <p className="text-eyebrow text-[var(--color-gold-500)]">
                Flagship Residence · Architectural Spotlight
              </p>
            </div>
            <h2
              id="flagship-title"
              className="text-section-title text-[var(--color-stone-900)]"
            >
              The flagship residence standard.
            </h2>
          </div>
          <p className="text-subhead text-[var(--color-stone-600)] max-w-md font-light leading-relaxed">
            Representing modern residential landmarks in Newtown with verifiable titles and architectural distinction.
          </p>
        </div>

        {/* === FEATURED RESIDENCE PRESENTATION (NO BOXED SAAS CARDS) === */}
        <div className="bg-white border border-[var(--color-stone-200)] p-6 sm:p-10 shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Primary Visual */}
            <div className="lg:col-span-7">
              <div className="arch-frame aspect-[16/10] w-full relative overflow-hidden">
                <Image
                  src={HOMEPAGE_IMAGES.exteriorMaster}
                  alt="PS One10 signature luxury tower in Action Area I, Newtown, Kolkata"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Architectural Data & Private Advisory Action */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-gold-400)]" />
                  <span className="text-eyebrow text-[var(--color-stone-500)]">
                    Newtown · Action Area I
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-light text-[var(--color-stone-900)] mb-4 leading-snug">
                  PS One10 — Signature Tower
                </h3>

                <p className="text-sm sm:text-base text-[var(--color-stone-600)] font-light leading-relaxed mb-6">
                  Two floors of expansive living spaces featuring double-height travertine masonry, open-riser teak staircase, and deep west-facing viewing terrace.
                </p>

                {/* Verified Architectural Specifications */}
                <div className="border-t border-b border-[var(--color-stone-200)] py-4 my-6 grid grid-cols-2 gap-4 text-xs uppercase tracking-wider text-[var(--color-stone-600)]">
                  <div>
                    <span className="block text-[var(--color-stone-400)] text-[10px] mb-1">Typology</span>
                    <span className="font-medium text-[var(--color-stone-900)]">High-Rise Apartment</span>
                  </div>
                  <div>
                    <span className="block text-[var(--color-stone-400)] text-[10px] mb-1">Location</span>
                    <span className="font-medium text-[var(--color-stone-900)]">Action Area I</span>
                  </div>
                  <div>
                    <span className="block text-[var(--color-stone-400)] text-[10px] mb-1">Status</span>
                    <span className="font-medium text-[var(--color-stone-900)]">Private Representation</span>
                  </div>
                  <div>
                    <span className="block text-[var(--color-stone-400)] text-[10px] mb-1">Inquiry</span>
                    <span className="font-medium text-[var(--color-stone-900)]">Verified Advisory</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${encodeURIComponent("Hello Sky-High Properties, I am interested in receiving the architectural dossier for PS One10 in Newtown.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-gold text-[11px]"
                >
                  <span>Request Property Dossier</span>
                  <span className="text-xs">→</span>
                </a>

                <Link
                  href="/#contact"
                  className="editorial-link text-[11px]"
                >
                  <span>Schedule Private Viewing</span>
                  <span className="text-xs">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* === PRIVATE ADVISORY PROTOCOL (Honest Curation Note) === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[var(--color-stone-300)] text-[var(--color-stone-700)]">
          <div>
            <p className="text-eyebrow text-[var(--color-gold-500)] mb-2">01 · Off-Market Discretion</p>
            <p className="text-sm font-light leading-relaxed">
              Many of Kolkata&rsquo;s distinguished residences are represented under private advisory to preserve owner confidentiality.
            </p>
          </div>
          <div>
            <p className="text-eyebrow text-[var(--color-gold-500)] mb-2">02 · Full Legal Verification</p>
            <p className="text-sm font-light leading-relaxed">
              Every property in our private registry is verified for sanctioned NKDA municipal plans, clear mutation, and clean chain of title.
            </p>
          </div>
          <div>
            <p className="text-eyebrow text-[var(--color-gold-500)] mb-2">03 · Tailored Acquisition</p>
            <p className="text-sm font-light leading-relaxed">
              Share your specific spatial and locational requirements to receive matching dossiers directly from our senior consultants.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
