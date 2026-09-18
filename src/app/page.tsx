import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import StatsSection from "@/components/homepage/StatsSection";
import BrandStatementSection from "@/components/homepage/BrandStatementSection";
import DiscoverySection from "@/components/homepage/DiscoverySection";
import FeaturedPropertiesSection from "@/components/homepage/FeaturedPropertiesSection";
import InteractiveLocationsSection from "@/components/homepage/InteractiveLocationsSection";
import DeveloperShowcaseSection from "@/components/homepage/DeveloperShowcaseSection";
import WhyChooseUsSection from "@/components/homepage/WhyChooseUsSection";
import SellPropertySection from "@/components/homepage/SellPropertySection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import TrustSection from "@/components/homepage/TrustSection";
import FinalCtaSection from "@/components/homepage/FinalCtaSection";
import EnquirySection from "@/components/homepage/EnquirySection";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { SITE_CONFIG } from "@/data/site-config";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — Real Estate Consultancy in Kolkata & Newtown`,
  description: SITE_CONFIG.seo.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Navigation />

      <main id="main-content" aria-label="Sky-High Properties Homepage">
        {/* MOVEMENT 01 — HERO & POSITIONING */}
        <HeroSection />

        {/* TRUST STATS TICKER STRIP */}
        <StatsSection />

        {/* MOVEMENT 02 — BRAND STATEMENT & PHILOSOPHY */}
        <BrandStatementSection />

        {/* MOVEMENT 03 — CONCIERGE PROPERTY DISCOVERY INSTRUMENT */}
        <DiscoverySection />

        {/* MOVEMENT 04 — CURATED PROPERTIES (ASYMMETRIC SHOWCASE + GRID) */}
        <FeaturedPropertiesSection />

        {/* PREMIER DEVELOPER ALLIANCES */}
        <DeveloperShowcaseSection />

        {/* MOVEMENT 05 — INTERACTIVE KOLKATA NEIGHBORHOODS */}
        <InteractiveLocationsSection />

        {/* MOVEMENT 06 — WHY SKY-HIGH: 4-STAGE CLIENT JOURNEY */}
        <WhyChooseUsSection />

        {/* MOVEMENT 07 — RESALE & SELL YOUR PROPERTY */}
        <SellPropertySection />

        {/* MOVEMENT 08 — EDITORIAL CLIENT TESTIMONIALS */}
        <TestimonialsSection />

        {/* MOVEMENT 09 — BUILT AROUND TRUST & OPERATIONAL BASE */}
        <TrustSection />

        {/* MOVEMENT 10 — FINAL MOMENT & CONSULTATION */}
        <FinalCtaSection />

        {/* CLIENT INQUIRY & CONSULTATION PORTAL */}
        <EnquirySection />
      </main>

      <Footer />

      {/* Persistent Floating WhatsApp Advisory Trigger */}
      <FloatingWhatsApp />
    </>
  );
}
