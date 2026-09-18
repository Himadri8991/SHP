import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { SITE_CONFIG } from "@/data/site-config";

export const metadata: Metadata = {
  title: `Privacy Policy — ${SITE_CONFIG.name}`,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 sm:pt-32 pb-24 bg-[var(--surface-canvas)] min-h-screen">
        <div className="container-wide py-12 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[var(--color-gold-400)]" />
            <p className="text-eyebrow text-[var(--color-gold-500)]">Legal & Privacy</p>
          </div>
          <h1 className="text-section-title text-[var(--color-stone-900)] mb-8">
            Privacy Policy
          </h1>
          <div className="bg-white p-8 sm:p-12 rounded-[3px] border border-[var(--color-stone-200)] space-y-6 text-sm text-[var(--color-stone-700)] font-light leading-relaxed">
            <p className="text-xs text-[var(--color-stone-400)] uppercase tracking-wider">
              Last updated: September 2026
            </p>
            <p>
              Sky-High Properties (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), operating from {SITE_CONFIG.address.full}, respects your privacy and is committed to protecting your personal data in accordance with applicable laws of India, including the Digital Personal Data Protection Act.
            </p>
            <h2 className="text-lg font-medium text-[var(--color-stone-900)] pt-4">1. Information We Collect</h2>
            <p>
              When you browse our website, request property viewings, or submit contact inquiries, we may collect your name, phone number, email address, preferred property locations, and investment budgets.
            </p>
            <h2 className="text-lg font-medium text-[var(--color-stone-900)] pt-4">2. Purpose of Collection</h2>
            <p>
              We collect your data solely to arrange property viewings, provide comparative valuation reports, prepare title verification documentation, and communicate with you regarding real estate inquiries. We do not sell or trade your personal information to third-party marketing firms.
            </p>
            <h2 className="text-lg font-medium text-[var(--color-stone-900)] pt-4">3. Data Security & Retention</h2>
            <p>
              We maintain strict technical and administrative safeguards to protect your personal details. Data is retained only as long as necessary to fulfill the real estate consultation services requested.
            </p>
            <h2 className="text-lg font-medium text-[var(--color-stone-900)] pt-4">4. Contact Our Privacy Desk</h2>
            <p>
              For questions regarding this policy or to request deletion of your information, write to us at: <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-[var(--color-gold-600)] underline">{SITE_CONFIG.contact.email}</a>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
