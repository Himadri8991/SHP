import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { SITE_CONFIG } from "@/data/site-config";

export const metadata: Metadata = {
  title: `About Us — ${SITE_CONFIG.name}`,
  description: "Learn about Sky-High Properties, Kolkata's trusted real estate consultancy headquartered in Newtown.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Micro-Market Rigor",
      desc: "We analyze every parcel, builder track record, and infrastructure corridor across Newtown, Rajarhat, and South Kolkata with granular street-level depth.",
    },
    {
      title: "Title Transparency",
      desc: "Every residence and plot represented undergoes comprehensive legal scrutiny: sanctioned NKDA/KMC plans, clear mutation records, and unencumbered chain of title.",
    },
    {
      title: "Client-Centric Advocacy",
      desc: "We are advisors, not high-pressure brokers. We prioritize the long-term wealth, spatial harmony, and legal safety of our clients above transactional volume.",
    },
    {
      title: "End-to-End Conveyance",
      desc: "From private site walkthroughs to bank loan liaising, tax calculation, stamp duty clearance, ADSR registration, and handover, we manage the entire process.",
    },
  ];

  return (
    <>
      <Navigation />

      <main className="pt-24 sm:pt-32 pb-24 bg-[var(--surface-canvas)] min-h-screen">
        {/* Editorial Header */}
        <section className="bg-white border-b border-[var(--color-stone-200)] py-16 sm:py-24">
          <div className="container-wide">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
                <p className="text-eyebrow text-[var(--color-gold-500)]">
                  About Sky-High Properties
                </p>
              </div>
              <h1 className="text-section-title text-[var(--color-stone-900)] leading-tight mb-6">
                Your Next Address{" "}
                <span className="font-editorial italic font-normal text-[var(--color-gold-500)]">
                  Starts Here.
                </span>
              </h1>
              <p className="text-subhead text-[var(--color-stone-700)] font-light leading-relaxed">
                Sky-High Properties is a Kolkata-based real estate advisory practice founded on a simple premise: real estate representation should combine deep micro-market intelligence with rigorous legal accountability.
              </p>
            </div>
          </div>
        </section>

        {/* Narrative & Philosophy Grid */}
        <section className="py-20">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <div className="lg:col-span-6 space-y-6">
                <h2 className="text-2xl sm:text-3xl font-light text-[var(--color-stone-900)]">
                  Rooted in Newtown. Serving Greater Kolkata.
                </h2>
                <p className="text-sm sm:text-base text-[var(--color-stone-600)] font-light leading-relaxed">
                  Headquartered in the vibrant center of Newtown Action Area I at the NKDA Market Complex, our firm was established to bring order, clarity, and sophistication to an often fragmented property market.
                </p>
                <p className="text-sm sm:text-base text-[var(--color-stone-600)] font-light leading-relaxed">
                  Whether you are seeking an iconic luxury high-rise apartment in Newtown, an off-market penthouse on the EM Bypass, a commercial floor in Sector V, or a high-yield residential plot in Rajarhat, we act as your trusted fiduciary.
                </p>
                <div className="pt-4 flex items-center gap-4">
                  <div className="border-l-2 border-[var(--color-gold-400)] pl-4">
                    <p className="text-2xl font-editorial italic font-normal text-[var(--color-stone-900)]">
                      10+ Years
                    </p>
                    <p className="text-xs text-[var(--color-stone-500)] uppercase tracking-wider">
                      Regional Advisory Excellence
                    </p>
                  </div>
                  <div className="border-l-2 border-[var(--color-gold-400)] pl-4 ml-6">
                    <p className="text-2xl font-editorial italic font-normal text-[var(--color-stone-900)]">
                      100%
                    </p>
                    <p className="text-xs text-[var(--color-stone-500)] uppercase tracking-wider">
                      Client Satisfaction
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 relative aspect-[4/3] rounded-[3px] overflow-hidden shadow-xl border border-[var(--color-stone-300)]">
                <Image
                  src="/assets/sky-high/homepage/images/01-exterior-master.webp"
                  alt="Sky-High Properties Architectural Advisory"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="py-20 bg-white border-y border-[var(--color-stone-200)]">
          <div className="container-wide">
            <div className="max-w-2xl mb-16">
              <p className="text-eyebrow text-[var(--color-gold-500)] mb-3">The Advisory Standard</p>
              <h3 className="text-section-title text-[var(--color-stone-900)]">
                How we protect and guide your capital.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((v, i) => (
                <div key={i} className="p-8 bg-[var(--surface-canvas)] rounded-[3px] border border-[var(--color-stone-200)] flex flex-col justify-between">
                  <div>
                    <span className="font-editorial text-2xl italic font-light text-[var(--color-gold-500)] mb-4 block">
                      0{i + 1}
                    </span>
                    <h4 className="text-lg font-medium text-[var(--color-stone-900)] mb-2">
                      {v.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--color-stone-600)] font-light leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Operational Base & Physical Presence */}
        <section className="py-20">
          <div className="container-wide">
            <div className="bg-[var(--surface-navy)] text-white p-10 sm:p-16 rounded-[3px] border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-px bg-[var(--color-gold-400)]" />
                  <p className="text-eyebrow text-[var(--color-gold-300)]">Our Physical Presence</p>
                </div>
                <h3 className="text-2xl sm:text-3xl font-light mb-4">
                  Visit us at our Newtown Operational Headquarters.
                </h3>
                <address className="not-italic text-sm sm:text-base text-white/80 font-light leading-relaxed mb-6">
                  {SITE_CONFIG.address.full}
                </address>
                <p className="text-xs text-white/60 font-light leading-relaxed mb-6">
                  We welcome buyers, investors, and property owners for in-person advisory sessions. Enjoy private consultation rooms and complete documentation review over tea.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/contact" className="btn-editorial-gold text-xs">
                    Book an In-Person Consultation
                  </Link>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phonePrimary.replace(/\s/g, "")}`}
                    className="btn-editorial-outline text-xs text-white border-white/20 hover:bg-white/10"
                  >
                    Call: {SITE_CONFIG.contact.phonePrimary}
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/5 p-6 rounded-[3px] border border-white/10">
                <h4 className="text-sm font-medium text-[var(--color-gold-300)] uppercase tracking-wider mb-4">
                  Operational Timings
                </h4>
                <div className="space-y-3 text-xs sm:text-sm text-white/80 font-light">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Monday – Friday</span>
                    <span>10:00 AM – 7:30 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span>Saturday</span>
                    <span>10:00 AM – 6:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-[var(--color-gold-300)]">By Prior Appointment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
