import Link from "next/link";
import { MessageSquare, PhoneCall } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

export default function FinalCtaSection() {
  return (
    <section
      aria-label="Final Consultation Call to Action"
      className="bg-[var(--surface-navy)] text-white py-20 sm:py-28 border-t border-white/15 relative overflow-hidden"
    >
      <div className="container-wide text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-[2px] bg-white/10 border border-white/20 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-400)] animate-pulse" />
          <span className="text-eyebrow text-white text-[10px]">Property Advisory · Kolkata & Newtown</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-normal text-white mb-6 leading-tight">
          Looking for your{" "}
          <span className="italic text-[var(--color-gold-300)]">
            next property?
          </span>
        </h2>

        <p className="text-sm sm:text-base text-white/80 font-light max-w-xl mx-auto mb-10 leading-relaxed">
          Tell us what you&rsquo;re looking for and our team will help you find relevant options — with verified documentation, transparent guidance, and zero pressure.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#portfolio"
            className="btn-editorial text-[11px] w-full sm:w-auto flex items-center justify-center gap-2 border-white/30 hover:border-white text-white"
          >
            <span>Explore Properties</span>
            <span className="text-xs">→</span>
          </Link>

          <a
            href={SITE_CONFIG.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial-gold text-[11px] w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <div className="pt-10 mt-10 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-white/60 font-light">
          <span>✓ Verified Properties</span>
          <span>✓ Direct Title Checks</span>
          <span>✓ End-to-End Assistance</span>
        </div>
      </div>
    </section>
  );
}
