import { Star, Quote } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

export default function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-24 sm:py-32 bg-[#0C0B08] text-white border-t border-white/[0.08] relative overflow-hidden"
    >
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
            <p className="text-eyebrow text-[var(--color-gold-300)]">
              Client Confidence & Proven Track Record
            </p>
          </div>
          <h2
            id="testimonials-heading"
            className="text-section-title text-white mb-4"
          >
            Real stories,{" "}
            <span className="font-editorial italic font-normal text-[var(--color-gold-300)]">
              real satisfaction.
            </span>
          </h2>
          <p className="text-subhead text-white/70 font-light leading-relaxed">
            Read how Kolkata buyers, executives, and families experienced our private property advisory.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {SITE_CONFIG.testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#14120E] p-8 sm:p-10 rounded-[3px] border border-white/10 shadow-xl flex flex-col justify-between relative group hover:border-[var(--color-gold-400)]/40 transition-colors duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* 5-star rating */}
                  <div className="flex items-center gap-1 text-[var(--color-gold-400)]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-white/10 group-hover:text-[var(--color-gold-400)]/30 transition-colors" />
                </div>

                <p className="font-editorial text-lg sm:text-xl text-white/90 font-normal italic leading-relaxed mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white text-base">
                    {item.author}
                  </h3>
                  <p className="text-xs text-white/50 font-light">
                    {item.role}
                  </p>
                </div>

                <span className="px-2.5 py-1 text-[9px] uppercase tracking-widest font-semibold bg-[var(--color-gold-400)]/15 text-[var(--color-gold-300)] rounded-[2px] border border-[var(--color-gold-400)]/30">
                  Verified Client
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
