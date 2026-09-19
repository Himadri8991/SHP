import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { getServerProperties, getPropertyBySlug } from "@/data/properties";
import { SITE_CONFIG } from "@/data/site-config";
import { MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import PropertyInquirySidebar from "@/components/properties/PropertyInquirySidebar";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return getServerProperties().map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Property Not Found" };
  return {
    title: `${property.title} — ${SITE_CONFIG.name}`,
    description: property.description,
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <>
      <Navigation />

      <main className="pt-24 sm:pt-32 pb-24 bg-[var(--surface-canvas)] min-h-screen">
        {/* Breadcrumb Header */}
        <div className="bg-white border-b border-[var(--color-stone-200)] py-8">
          <div className="container-wide">
            <nav className="flex items-center gap-2 text-xs text-[var(--color-stone-500)] mb-4">
              <Link href="/" className="hover:text-[var(--color-stone-900)]">Home</Link>
              <span>/</span>
              <Link href="/properties" className="hover:text-[var(--color-stone-900)]">Properties</Link>
              <span>/</span>
              <span className="text-[var(--color-stone-900)] font-medium truncate">{property.title}</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 bg-[var(--color-stone-900)] text-white text-[10px] uppercase tracking-wider rounded-[2px]">
                    {property.category.replace("-", " ")}
                  </span>
                  <span className="text-xs text-[var(--color-gold-600)] font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {property.location}
                  </span>
                </div>
                <h1 className="text-section-title text-[var(--color-stone-900)] leading-tight">
                  {property.title}
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="text-left sm:text-right">
                  <p className="text-xs uppercase tracking-wider text-[var(--color-stone-400)]">Offered At</p>
                  <p className="text-2xl sm:text-3xl font-editorial italic font-normal text-[var(--color-stone-900)]">
                    {property.price || "Contact for Price"}
                  </p>
                </div>
                <a
                  href="#book-viewing"
                  className="btn-editorial-gold text-xs px-6 py-3"
                >
                  Schedule Private Viewing
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="container-wide py-10">
          <div className="relative aspect-[16/9] rounded-[3px] overflow-hidden bg-[var(--surface-canvas-alt)] shadow-md">
            <Image
              src={property.imageSrc || "/assets/sky-high/homepage/images/01-exterior-master.webp"}
              alt={property.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Specs & Key Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-12">
              {/* Specs Bar */}
              <div className="bg-white p-6 rounded-[3px] border border-[var(--color-stone-200)] grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--color-stone-400)]">Configuration</p>
                  <p className="text-base font-medium text-[var(--color-stone-900)] mt-1">
                    {property.bedrooms ? `${property.bedrooms} BHK` : property.type}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--color-stone-400)]">Baths / Washrooms</p>
                  <p className="text-base font-medium text-[var(--color-stone-900)] mt-1">
                    {property.bathrooms ? `${property.bathrooms} Baths` : "Custom"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--color-stone-400)]">Super Built-Up</p>
                  <p className="text-base font-medium text-[var(--color-stone-900)] mt-1">
                    {property.areaSqft ? `${property.areaSqft.toLocaleString()} sq.ft` : "On Request"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--color-stone-400)]">Listing Status</p>
                  <p className="text-base font-medium text-[var(--color-stone-900)] mt-1">
                    Verified Advisory Listing
                  </p>
                </div>
              </div>

              {/* Property Overview */}
              <div>
                <h2 className="text-2xl font-light text-[var(--color-stone-900)] mb-4">
                  The Residence Overview
                </h2>
                <p className="text-base text-[var(--color-stone-700)] font-light leading-relaxed mb-6">
                  {property.description}
                </p>
              </div>

              {/* Highlights */}
              {property.highlights && property.highlights.length > 0 && (
                <div>
                  <h3 className="text-xl font-light text-[var(--color-stone-900)] mb-6">
                    Curated Highlights & Finishes
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {property.highlights.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-[3px] border border-[var(--color-stone-200)]">
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-gold-500)] flex-shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-[var(--color-stone-700)] font-light">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Title & Due Diligence Banner */}
              <div className="bg-[var(--surface-canvas-alt)] p-6 rounded-[3px] border border-[var(--color-stone-300)]">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-5 h-5 text-[var(--color-gold-500)]" />
                  <h4 className="text-sm font-medium text-[var(--color-stone-900)] uppercase tracking-wider">
                    Sky-High Legal Verification Vetted
                  </h4>
                </div>
                <p className="text-xs text-[var(--color-stone-600)] font-light leading-relaxed">
                  Sanctioned building plans verified with the respective municipal body (NKDA / KMC). Title chain inspected for zero encumbrances, registered deeds, and clean mutation records.
                </p>
              </div>
            </div>

            {/* Sticky Sidebar Column */}
            <div className="lg:col-span-4">
              <PropertyInquirySidebar
                propertyTitle={property.title}
                propertyPrice={property.price}
                propertyLocation={property.location}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
