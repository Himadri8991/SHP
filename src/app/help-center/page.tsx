import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { SITE_CONFIG } from "@/data/site-config";

export const metadata: Metadata = {
  title: `Help Center & FAQ — ${SITE_CONFIG.name}`,
  description: "Frequently asked questions regarding property purchase, registration, NKDA mutation, and due diligence in Kolkata.",
};

export default function HelpCenterPage() {
  const faqs = [
    {
      category: "Buying in Newtown & Kolkata",
      questions: [
        {
          q: "What documents are required to verify a residential property in Newtown?",
          a: "Key documents include the Sanctioned Plan from NKDA or KMC, Deed of Conveyance (Title Chain), Mutation Certificate, up-to-date Property Tax receipts, and Non-Encumbrance Certificate from the concerned ADSR office.",
        },
        {
          q: "How does Sky-High Properties assist in the registration process?",
          a: "Our team calculates exact stamp duty and registration fees, drafts the Deed of Sale through experienced advocates, books the registration slot at the relevant ADSR/DSR office (such as Salt Lake or Rajarhat), and accompanies you until the execution is complete.",
        },
      ],
    },
    {
      category: "Selling & Resale",
      questions: [
        {
          q: "How do you determine the market value of my property in Newtown / Rajarhat?",
          a: "We perform a comparative market analysis (CMA) benchmarking recent registered transactions in your specific block/action area, considering floor height, corner advantage, facing, and building amenities.",
        },
        {
          q: "Is there an exclusivity requirement when listing with Sky-High?",
          a: "We offer both exclusive advisory and open representation. For high-value residences and penthouses, exclusive mandates receive bespoke architectural photography, dedicated video presentation, and targeted outreach to pre-qualified buyers.",
        },
      ],
    },
    {
      category: "Plots & Land Acquisition",
      questions: [
        {
          q: "Can NRIs purchase residential plots or villas in Newtown?",
          a: "Yes. Under RBI and FEMA regulations, Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) can freely acquire residential and commercial properties in India without prior RBI approval. We facilitate seamless power of attorney (PoA) and NRE/NRO banking procedures.",
        },
        {
          q: "What is the difference between Freehold and Leasehold plots in Salt Lake vs Newtown?",
          a: "Salt Lake plots are primarily 999-year government leaseholds governed by the Urban Development Department (with specific mutation and transfer fees), whereas Newtown offers freehold parcels as well as WBHIDCO/NKDA sanctioned individual residential plots.",
        },
      ],
    },
  ];

  return (
    <>
      <Navigation />
      <main className="pt-24 sm:pt-32 pb-24 bg-[var(--surface-canvas)] min-h-screen">
        <div className="border-b border-[var(--color-stone-200)] pb-12 sm:pb-16 bg-white">
          <div className="container-wide">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-[var(--color-gold-400)]" />
              <p className="text-eyebrow text-[var(--color-gold-500)]">Client Guidance & FAQs</p>
            </div>
            <h1 className="text-section-title text-[var(--color-stone-900)] leading-tight">
              Knowledge Base &{" "}
              <span className="font-editorial italic font-normal text-[var(--color-gold-500)]">
                Property Guides.
              </span>
            </h1>
            <p className="text-subhead text-[var(--color-stone-600)] font-light mt-3 max-w-2xl">
              Essential answers on legal due diligence, municipal mutations, ADSR conveyance, and property transactions across Kolkata.
            </p>
          </div>
        </div>

        <div className="container-wide py-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqs.map((grp, idx) => (
              <div key={idx} className="bg-white p-8 sm:p-10 rounded-[3px] border border-[var(--color-stone-200)] shadow-sm">
                <h2 className="text-xl font-medium text-[var(--color-stone-900)] mb-6 pb-4 border-b border-[var(--color-stone-100)]">
                  {grp.category}
                </h2>
                <div className="space-y-6">
                  {grp.questions.map((item, qIdx) => (
                    <div key={qIdx} className="space-y-2">
                      <h3 className="text-base font-medium text-[var(--color-stone-800)] flex items-start gap-2">
                        <span className="text-[var(--color-gold-500)] font-serif font-bold">Q.</span>
                        {item.q}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--color-stone-600)] font-light leading-relaxed pl-6">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Need Direct Help Banner */}
            <div className="bg-[var(--surface-navy)] text-white p-8 sm:p-12 rounded-[3px] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-light mb-2">Have a specific legal or property query?</h3>
                <p className="text-xs text-white/70 font-light">
                  Our in-house legal and conveyance specialists are available to review your property deeds.
                </p>
              </div>
              <Link href="/contact" className="btn-editorial-gold text-xs whitespace-nowrap">
                Consult an Advisor
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
