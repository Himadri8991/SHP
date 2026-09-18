"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SITE_CONFIG } from "@/data/site-config";
import { Phone, Mail, MapPin, ArrowRight, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      aria-label="Site Footer"
      className="bg-[#0A0907] text-white border-t border-white/10 pt-20 pb-12"
    >
      <div className="container-wide">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-14 pb-16 border-b border-white/10">
          {/* Brand & Address Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link
                href="/"
                aria-label={`${SITE_CONFIG.name} — Homepage`}
                className="inline-block mb-6 transition-opacity hover:opacity-90"
              >
                <BrandLogo variant="dark" />
              </Link>
              <p className="text-sm text-white/70 font-light leading-relaxed mb-6 max-w-sm">
                Sky-High Properties is a premier Kolkata real-estate consultancy providing verified residential, commercial, and investment property advisory across Newtown, Rajarhat, and key city corridors.
              </p>
            </div>

            <div className="text-xs text-white/60 space-y-1.5 pt-4 border-t border-white/10 font-light">
              <p className="font-medium text-white/80">Operational Office:</p>
              <p>{SITE_CONFIG.address.shop}, {SITE_CONFIG.address.market}</p>
              <p>{SITE_CONFIG.address.block}, {SITE_CONFIG.address.area}</p>
              <p>{SITE_CONFIG.address.city} – {SITE_CONFIG.address.pin}</p>
            </div>
          </div>

          {/* Column 2: Properties Catalog */}
          <div className="lg:col-span-3">
            <p className="text-eyebrow text-[var(--color-gold-400)] mb-5 text-[10px]">
              Properties Portfolio
            </p>
            <ul className="space-y-3 text-xs tracking-wider uppercase text-white/70">
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/properties/new-projects" className="hover:text-white transition-colors">
                  New Projects
                </Link>
              </li>
              <li>
                <Link href="/properties/resale" className="hover:text-white transition-colors">
                  Resale Properties
                </Link>
              </li>
              <li>
                <Link href="/properties/rent" className="hover:text-white transition-colors">
                  Rent & Lease
                </Link>
              </li>
              <li>
                <Link href="/properties/land-plots" className="hover:text-white transition-colors">
                  Land & Plots
                </Link>
              </li>
              <li>
                <Link href="/properties/ps-one10-signature-tower-newtown" className="hover:text-[var(--color-gold-300)] transition-colors">
                  PS One10 — Signature Tower
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Information */}
          <div className="lg:col-span-2">
            <p className="text-eyebrow text-[var(--color-gold-400)] mb-5 text-[10px]">
              Company & Help
            </p>
            <ul className="space-y-3 text-xs tracking-wider uppercase text-white/70">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/#sell" className="hover:text-white transition-colors">
                  Sell Property
                </Link>
              </li>
              <li>
                <Link href="/help-center" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & WhatsApp */}
          <div className="lg:col-span-3">
            <p className="text-eyebrow text-[var(--color-gold-400)] mb-5 text-[10px]">
              Direct Inquiries
            </p>
            <div className="space-y-3 text-sm font-light text-white/80 mb-6">
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">Telephones</span>
                <div className="flex flex-col gap-1">
                  <a href={`tel:${SITE_CONFIG.contact.phonePrimary.replace(/\s/g, "")}`} className="hover:text-[var(--color-gold-300)] transition-colors">
                    {SITE_CONFIG.contact.phonePrimary}
                  </a>
                  <a href={`tel:${SITE_CONFIG.contact.phoneSecondary.replace(/\s/g, "")}`} className="hover:text-[var(--color-gold-300)] transition-colors">
                    {SITE_CONFIG.contact.phoneSecondary}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-[10px] text-white/40 uppercase tracking-wider block mb-1">Email</span>
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-[var(--color-gold-300)] transition-colors break-all">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>

              <div className="pt-3">
                <a
                  href={SITE_CONFIG.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-[var(--color-gold-300)] hover:text-white border-b border-[var(--color-gold-400)]/40 pb-1 group"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[var(--color-gold-400)]" />
                  <span>Chat on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Rail */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-light">
          <p>© 2026 Sky-High Properties. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[11px]">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/help-center" className="hover:text-white transition-colors">
              Help Center
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
