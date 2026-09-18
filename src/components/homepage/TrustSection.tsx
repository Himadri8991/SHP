import { SITE_CONFIG } from "@/data/site-config";

export default function TrustSection() {
  const principles = [
    {
      num: "01",
      title: "Micro-Market Authority",
      desc: "Deep geographic focus across Newtown (Action Area I, II, III) and Rajarhat. We understand parcel valuations, infrastructure corridors, and builder reputations at the street level.",
    },
    {
      num: "02",
      title: "Title & Regulatory Rigor",
      desc: "Every residence represented undergoes preliminary title vetting, sanctioned plan checks with NKDA/municipal bodies, and clear ownership audit before any client presentation.",
    },
    {
      num: "03",
      title: "Selective Representation",
      desc: "We prioritize architectural distinction and functional floorplans over sheer listing volume. We actively decline properties that fail our spatial or construction criteria.",
    },
    {
      num: "04",
      title: "Comprehensive Conveyance",
      desc: "From initial confidential viewings to documentation, tax structuring, home loan coordination, and registration at the ADSR, we represent your interests until physical handover.",
    },
  ];

  return (
    <section
      id="trust"
      aria-labelledby="trust-title"
      className="scroll-mt-24 sm:scroll-mt-28 pt-28 sm:pt-36 pb-24 sm:pb-32 bg-[var(--surface-navy)] text-white overflow-hidden border-t border-white/10"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Brand Credibility Manifesto */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
                <p className="text-eyebrow text-[var(--color-gold-300)]">
                  The Advisory Standard
                </p>
              </div>

              <h2
                id="trust-title"
                className="text-section-title text-white mb-6"
              >
                Built on trust. Driven by excellence.
              </h2>

              <p className="text-subhead text-white/75 font-light leading-relaxed mb-8">
                Property consultancy in Kolkata requires more than showing floor plans.
                It demands market discretion, strict legal vigilance, and genuine client advocacy.
              </p>
            </div>

            {/* Verified Operational Headquarters */}
            <div className="pt-8 border-t border-white/15">
              <p className="text-eyebrow text-[var(--color-gold-300)] mb-2">
                Operational Headquarters
              </p>
              <address className="not-italic text-sm text-white/70 font-light leading-relaxed">
                {SITE_CONFIG.address.full}
              </address>
            </div>
          </div>

          {/* Right Column: Editorial Principles (Typography & Rules, Zero SaaS Boxes) */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-white/15">
              {principles.map((item) => (
                <div key={item.num} className="py-8 first:pt-0 last:pb-0">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-eyebrow text-[var(--color-gold-300)] font-editorial italic text-base">
                      {item.num}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-light text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed pl-8">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
