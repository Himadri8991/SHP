import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { SITE_CONFIG } from "@/data/site-config";

export const metadata: Metadata = {
  title: `Terms of Service — ${SITE_CONFIG.name}`,
};

export default function TermsOfServicePage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 sm:pt-32 pb-24 bg-[var(--surface-canvas)] min-h-screen">
        <div className="container-wide py-12 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[var(--color-gold-400)]" />
            <p className="text-eyebrow text-[var(--color-gold-500)]">Terms & Conditions</p>
          </div>
          <h1 className="text-section-title text-[var(--color-stone-900)] mb-8">
            Terms of Service
          </h1>
          <div className="bg-white p-8 sm:p-12 rounded-[3px] border border-[var(--color-stone-200)] space-y-6 text-sm text-[var(--color-stone-700)] font-light leading-relaxed">
            <p className="text-xs text-[var(--color-stone-400)] uppercase tracking-wider">
              Effective Date: September 2026
            </p>
            <p>
              By accessing the digital services provided by Sky-High Properties (&quot;Company&quot;), you agree to abide by the terms set forth below.
            </p>
            <h2 className="text-lg font-medium text-[var(--color-stone-900)] pt-4">1. Advisory Role & Representations</h2>
            <p>
              Sky-High Properties functions as a professional real estate consultancy assisting buyers, sellers, and lessees. While we conduct preliminary title and sanction plan vetting, final legal title verification and bank loan sanctions remain subject to municipal, banking, and ADSR statutory checks.
            </p>
            <h2 className="text-lg font-medium text-[var(--color-stone-900)] pt-4">2. Accuracy of Listing Information</h2>
            <p>
              Floorplans, specifications, and prices displayed on this website are indicative and subject to final physical verification and developer/owner confirmation.
            </p>
            <h2 className="text-lg font-medium text-[var(--color-stone-900)] pt-4">3. Intellectual Property</h2>
            <p>
              All branding, typography, photography, and bespoke editorial text are the intellectual property of Sky-High Properties. Reproduction without prior written authorization is strictly prohibited.
            </p>
            <h2 className="text-lg font-medium text-[var(--color-stone-900)] pt-4">4. Governing Law</h2>
            <p>
              These terms are governed by the laws of India, and any disputes shall fall under the jurisdiction of courts in Kolkata, West Bengal.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
