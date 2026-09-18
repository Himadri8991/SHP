import Link from "next/link";
import { MessageSquare, PhoneCall } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

export default function EnquiryBannerSection() {
  return (
    <section
      aria-labelledby="off-market-heading"
      className="bg-[#0C0B08] text-white py-16 sm:py-20 border-t border-b border-white/[0.08] relative overflow-hidden"
    >
      {/* Background Architectural Accent Line */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-gold-400)]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-wide relative z-10">
        <div className="bg-[#14120E] border border-white/10 p-8 sm:p-14 rounded-[3px] shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
              <p className="text-eyebrow text-[var(--color-gold-300)]">
                Off-Market Acquisition & Bespoke Mandates
              </p>
            </div>
            <h2
              id="off-market-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-normal font-editorial text-white mb-4 leading-snug"
            >
              Don&rsquo;t see what you need?
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
              Many of Kolkata&rsquo;s most prestigious duplexes, panoramic penthouses, and prime plots in Newtown are represented privately to protect owner confidentiality. Share your spatial brief directly with our leadership team.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-shrink-0">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${encodeURIComponent(
                "Hello Sky-High Properties, I am looking for off-market or customized property options in Kolkata."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-gold text-[11px] text-center flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquire Off-Market</span>
            </a>

            <Link
              href="#contact"
              className="btn-editorial text-[11px] text-center flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[var(--color-gold-300)]" />
              <span>Book Consultation</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
