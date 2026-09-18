import { Compass, FileCheck2, Scale, KeyRound } from "lucide-react";

export default function WhyChooseUsSection() {
  const steps = [
    {
      num: "01",
      stage: "Discover",
      subtitle: "Curated Spatial Matching",
      description:
        "We listen to your spatial, financial, and lifestyle priorities before shortlisting properties. You only inspect vetted homes and parcels that truly meet your criteria.",
      icon: Compass,
    },
    {
      num: "02",
      stage: "Verify",
      subtitle: "Sanctioned Plans & Title Vetting",
      description:
        "Every property undergoes strict due diligence: NKDA / KMC sanctioned plans, up-to-date mutation certificates, title chain verification, and zero legal encumbrance.",
      icon: FileCheck2,
    },
    {
      num: "03",
      stage: "Decide",
      subtitle: "Micro-Market Valuation & Counsel",
      description:
        "Transparent per-sq.ft rate analysis and comparative sales data. We provide unbiased, zero-pressure guidance so you commit with absolute market confidence.",
      icon: Scale,
    },
    {
      num: "04",
      stage: "Complete",
      subtitle: "Loan Liaising & ADSR Registration",
      description:
        "From private site visits and fair negotiations to bank legal approvals, stamp duty calculation, ADSR registration support, and key handover, we remain by your side.",
      icon: KeyRound,
    },
  ];

  return (
    <section
      id="why-choose-us"
      aria-labelledby="why-us-title"
      className="scroll-mt-24 pt-24 sm:pt-32 pb-24 sm:pb-32 bg-[var(--surface-canvas)] text-[var(--text-primary)] border-t border-[var(--color-stone-200)]"
    >
      <div className="container-wide">
        {/* Section Eyebrow & Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
            <p className="text-eyebrow text-[var(--color-gold-500)]">
              Movement 06 · The Client Journey
            </p>
          </div>
          <h2
            id="why-us-title"
            className="text-section-title text-[var(--color-stone-900)] mb-5 leading-tight"
          >
            A structured advisory process.{" "}
            <span className="font-editorial italic font-normal text-[var(--color-gold-500)]">
              From exploration to deed.
            </span>
          </h2>
          <p className="text-subhead text-[var(--color-stone-600)] font-light leading-relaxed">
            Property acquisition in Kolkata should be seamless, transparent, and legally unassailable. Here is how we guide every transaction.
          </p>
        </div>

        {/* 4-Stage Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="group relative bg-white p-8 rounded-[3px] border border-[var(--color-stone-200)] shadow-sm hover:shadow-xl hover:border-[var(--color-gold-300)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-11 h-11 rounded-[3px] bg-[var(--surface-canvas-alt)] border border-[var(--color-stone-200)] flex items-center justify-center text-[var(--color-stone-700)] group-hover:bg-[var(--color-stone-900)] group-hover:text-[var(--color-gold-400)] group-hover:border-[var(--color-stone-900)] transition-all duration-300">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <span className="font-editorial text-3xl italic font-light text-[var(--color-gold-400)]">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-medium text-[var(--color-stone-900)] mb-1 group-hover:text-[var(--color-gold-600)] transition-colors">
                    {step.stage}
                  </h3>

                  <p className="text-xs uppercase tracking-wider text-[var(--color-stone-400)] font-medium mb-4">
                    {step.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[var(--color-stone-600)] font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-[var(--color-stone-100)] flex items-center justify-between text-[11px] text-[var(--color-gold-500)] uppercase tracking-wider font-medium">
                  <span>Stage {step.num} Verified</span>
                  <span className="text-xs">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
