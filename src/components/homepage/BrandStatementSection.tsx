"use client";

// lucide icons cleaned

export default function BrandStatementSection() {
  return (
    <section
      id="about"
      aria-label="Brand Philosophy"
      className="scroll-mt-24 py-24 sm:py-32 bg-[var(--surface-canvas)] text-[var(--text-primary)] border-t border-[var(--color-stone-200)] relative overflow-hidden"
    >
      <div className="container-wide">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-6 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[var(--color-gold-500)]">
              The Sky-High Perspective
            </span>
            <span className="w-6 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
          </div>

          {/* Major Editorial Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-light text-[var(--color-stone-900)] leading-tight mb-8">
            Property is more than a{" "}
            <span className="font-editorial italic font-normal text-[var(--color-navy-900)]">
              transaction.
            </span>
          </h2>

          {/* Narrative Thesis */}
          <p className="font-editorial text-xl sm:text-2xl lg:text-3xl text-[var(--color-stone-700)] italic font-light leading-relaxed mb-8 max-w-3xl mx-auto">
            &ldquo;It is where you live. Where you work. Where you invest. Where life happens next.&rdquo;
          </p>

          <p className="text-sm sm:text-base text-[var(--color-stone-600)] font-light leading-relaxed max-w-2xl mx-auto mb-10">
            At Sky-High Properties, we approach Kolkata real estate with a deliberate point of view. Rather than overwhelming you with endless unverified listings, we act as personal advisors — filtering out the noise, inspecting every title, and representing your long-term interests in Newtown, Rajarhat, and across the city.
          </p>

          {/* Trust Guarantees */}
          <div className="pt-8 border-t border-[var(--color-stone-300)] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-gold-500)] font-semibold block">01 · Selection</span>
              <p className="text-xs font-medium text-[var(--color-stone-900)]">Curated, Not Mass-Listed</p>
              <p className="text-[11px] text-[var(--color-stone-500)] font-light">Only residences and plots that meet structural & legal criteria.</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-gold-500)] font-semibold block">02 · Diligence</span>
              <p className="text-xs font-medium text-[var(--color-stone-900)]">100% Title Verified</p>
              <p className="text-[11px] text-[var(--color-stone-500)] font-light">Sanctioned municipal plans, clean chain of title, zero surprises.</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-gold-500)] font-semibold block">03 · Valuation</span>
              <p className="text-xs font-medium text-[var(--color-stone-900)]">Honest Market Pricing</p>
              <p className="text-[11px] text-[var(--color-stone-500)] font-light">Ground-level data from actual ADSR registry transactions.</p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-gold-500)] font-semibold block">04 · Support</span>
              <p className="text-xs font-medium text-[var(--color-stone-900)]">Complete Conveyance</p>
              <p className="text-[11px] text-[var(--color-stone-500)] font-light">Dedicated guidance through loan sanction, registry, and keys.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
