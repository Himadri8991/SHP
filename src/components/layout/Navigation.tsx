"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, MessageSquare, Phone, Building2, Key, Home, Trees, PlusCircle } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SITE_CONFIG } from "@/data/site-config";
import ListPropertyModal from "@/components/properties/ListPropertyModal";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [propertiesDropdown, setPropertiesDropdown] = useState(false);
  const [companyDropdown, setCompanyDropdown] = useState(false);
  const [mobilePropertiesOpen, setMobilePropertiesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [listModalOpen, setListModalOpen] = useState(false);

  const propertiesRef = useRef<HTMLDivElement>(null);
  const companyRef = useRef<HTMLDivElement>(null);
  const propertiesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const companyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handlePropertiesEnter = () => {
    if (propertiesTimeoutRef.current) {
      clearTimeout(propertiesTimeoutRef.current);
      propertiesTimeoutRef.current = null;
    }
    setPropertiesDropdown(true);
  };

  const handlePropertiesLeave = () => {
    if (propertiesTimeoutRef.current) clearTimeout(propertiesTimeoutRef.current);
    propertiesTimeoutRef.current = setTimeout(() => {
      setPropertiesDropdown(false);
    }, 180);
  };

  const handleCompanyEnter = () => {
    if (companyTimeoutRef.current) {
      clearTimeout(companyTimeoutRef.current);
      companyTimeoutRef.current = null;
    }
    setCompanyDropdown(true);
  };

  const handleCompanyLeave = () => {
    if (companyTimeoutRef.current) clearTimeout(companyTimeoutRef.current);
    companyTimeoutRef.current = setTimeout(() => {
      setCompanyDropdown(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (propertiesTimeoutRef.current) clearTimeout(propertiesTimeoutRef.current);
      if (companyTimeoutRef.current) clearTimeout(companyTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setPropertiesDropdown(false);
    setCompanyDropdown(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (propertiesRef.current && !propertiesRef.current.contains(e.target as Node)) {
        if (propertiesTimeoutRef.current) clearTimeout(propertiesTimeoutRef.current);
        setPropertiesDropdown(false);
      }
      if (companyRef.current && !companyRef.current.contains(e.target as Node)) {
        if (companyTimeoutRef.current) clearTimeout(companyTimeoutRef.current);
        setCompanyDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHomepage = pathname === "/";

  const propertySublinks = [
    { title: "All Properties", href: "/properties", desc: "Complete developer & resale catalog", icon: Home },
    { title: "New Projects", href: "/properties/new-projects", desc: "Srijan, PS Group, Godrej, Shapoorji & more", icon: Building2 },
    { title: "Resale Flats", href: "/resale", desc: "Verified ready-to-move secondary market flats", icon: Key },
    { title: "Rent & Lease", href: "/properties/rent", desc: "Luxury executive residences & corporate leases", icon: Home },
    { title: "Land / Plot", href: "/properties/land-plots", desc: "Freehold residential & commercial plots", icon: Trees },
  ];

  const companySublinks = [
    { title: "About Sky-High", href: "/about", desc: "Our story, advisory philosophy & Kolkata presence" },
    { title: "Contact & Concierge", href: "/contact", desc: "Book private consultation or schedule viewing" },
  ];

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHomepage
            ? "bg-[#0C0B08]/92 backdrop-blur-md border-b border-white/[0.08] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-gradient-to-b from-black/70 via-black/25 to-transparent py-4 sm:py-5"
        }`}
      >
        <div className="container-wide flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            aria-label={`${SITE_CONFIG.name} — Discover`}
            className="flex-shrink-0 transition-opacity hover:opacity-90 py-1"
          >
            <BrandLogo variant="dark" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-7">
            {/* Discover */}
            <Link
              href="/"
              className={`text-[11px] tracking-[0.2em] uppercase font-medium transition-colors py-1 relative group whitespace-nowrap ${
                pathname === "/" ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              Discover
              <span className={`absolute bottom-0 left-0 h-px bg-[var(--color-gold-400)] transition-all duration-300 ${pathname === "/" ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>

            {/* Properties Dropdown */}
            <div
              ref={propertiesRef}
              className="relative"
              onMouseEnter={handlePropertiesEnter}
              onMouseLeave={handlePropertiesLeave}
            >
              <button
                type="button"
                onClick={() => {
                  if (propertiesTimeoutRef.current) clearTimeout(propertiesTimeoutRef.current);
                  setPropertiesDropdown((prev) => !prev);
                  setCompanyDropdown(false);
                }}
                className={`inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors py-1 relative group whitespace-nowrap cursor-pointer ${
                  pathname.startsWith("/properties") ? "text-white" : "text-white/70 hover:text-white"
                }`}
                aria-expanded={propertiesDropdown}
              >
                <span>Properties</span>
                <ChevronDown className={`w-3 h-3 text-[var(--color-gold-400)] transition-transform duration-300 ${propertiesDropdown ? "rotate-180" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-px bg-[var(--color-gold-400)] transition-all duration-300 ${pathname.startsWith("/properties") ? "w-full" : "w-0 group-hover:w-full"}`} />
              </button>

              {/* Mega/Dropdown Menu with seamless padding bridge */}
              <div
                className={`absolute top-full left-0 pt-2 w-72 z-50 transition-all duration-200 ${
                  propertiesDropdown ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="bg-[#12100C]/98 backdrop-blur-xl border border-white/15 rounded-[3px] shadow-[0_15px_40px_rgba(0,0,0,0.6)] p-3 space-y-1">
                  {propertySublinks.map((sub) => {
                    const Icon = sub.icon;
                    return (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => {
                          if (propertiesTimeoutRef.current) clearTimeout(propertiesTimeoutRef.current);
                          setPropertiesDropdown(false);
                        }}
                        className="flex items-start gap-3 p-2.5 rounded-[2px] hover:bg-white/[0.08] transition-colors group"
                      >
                        <div className="w-7 h-7 rounded-[2px] bg-white/[0.04] border border-white/10 flex items-center justify-center text-[var(--color-gold-400)] group-hover:bg-[var(--color-gold-400)] group-hover:text-black transition-colors flex-shrink-0 mt-0.5">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-white group-hover:text-[var(--color-gold-300)] transition-colors">
                            {sub.title}
                          </p>
                          <p className="text-[10px] text-white/50 font-light leading-tight">
                            {sub.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Resale */}
            <Link
              href="/resale"
              className={`text-[11px] tracking-[0.2em] uppercase font-medium transition-colors py-1 relative group whitespace-nowrap ${
                pathname === "/resale" ? "text-white" : "text-white/70 hover:text-white"
              }`}
            >
              Resale
              <span className={`absolute bottom-0 left-0 h-px bg-[var(--color-gold-400)] transition-all duration-300 ${pathname === "/resale" ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>

            {/* Company Dropdown */}
            <div
              ref={companyRef}
              className="relative"
              onMouseEnter={handleCompanyEnter}
              onMouseLeave={handleCompanyLeave}
            >
              <button
                type="button"
                onClick={() => {
                  if (companyTimeoutRef.current) clearTimeout(companyTimeoutRef.current);
                  setCompanyDropdown((prev) => !prev);
                  setPropertiesDropdown(false);
                }}
                className={`inline-flex items-center gap-1.5 text-[11px] tracking-[0.2em] uppercase font-medium transition-colors py-1 relative group whitespace-nowrap cursor-pointer ${
                  pathname === "/about" || pathname === "/contact" ? "text-white" : "text-white/70 hover:text-white"
                }`}
                aria-expanded={companyDropdown}
              >
                <span>Company</span>
                <ChevronDown className={`w-3 h-3 text-[var(--color-gold-400)] transition-transform duration-300 ${companyDropdown ? "rotate-180" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-px bg-[var(--color-gold-400)] transition-all duration-300 ${pathname === "/about" || pathname === "/contact" ? "w-full" : "w-0 group-hover:w-full"}`} />
              </button>

              <div
                className={`absolute top-full left-0 pt-2 w-64 z-50 transition-all duration-200 ${
                  companyDropdown ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="bg-[#12100C]/98 backdrop-blur-xl border border-white/15 rounded-[3px] shadow-[0_15px_40px_rgba(0,0,0,0.6)] p-3 space-y-1">
                  {companySublinks.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => {
                        if (companyTimeoutRef.current) clearTimeout(companyTimeoutRef.current);
                        setCompanyDropdown(false);
                      }}
                      className="block p-2.5 rounded-[2px] hover:bg-white/[0.08] transition-colors group"
                    >
                      <p className="text-xs font-medium text-white group-hover:text-[var(--color-gold-300)] transition-colors">
                        {sub.title}
                      </p>
                      <p className="text-[10px] text-white/50 font-light leading-tight mt-0.5">
                        {sub.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setListModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.16em] uppercase font-medium text-white/90 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-[var(--color-gold-400)]/40 transition-all duration-300 py-2 px-3 rounded-[3px] cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[var(--color-gold-400)]" />
              <span>List Property</span>
            </button>

            <a
              href={SITE_CONFIG.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase font-medium text-[#0C0B08] bg-[var(--color-gold-500)] hover:bg-[var(--color-gold-400)] transition-all duration-300 py-2 px-3.5 rounded-[3px] shadow-sm font-semibold whitespace-nowrap"
              aria-label="Direct WhatsApp Advisory"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0C0B08] animate-pulse" />
              <span>WhatsApp Advisory</span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-50 p-2 text-white hover:text-[var(--color-gold-300)] transition-colors focus-visible:outline-none cursor-pointer"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-end">
              <span
                className={`h-[1.5px] bg-current transition-all duration-300 ${
                  mobileOpen ? "w-6 rotate-45 translate-y-[9px]" : "w-6"
                }`}
              />
              <span
                className={`h-[1.5px] bg-current transition-all duration-300 ${
                  mobileOpen ? "opacity-0 w-0" : "w-4"
                }`}
              />
              <span
                className={`h-[1.5px] bg-current transition-all duration-300 ${
                  mobileOpen ? "w-6 -rotate-45 -translate-y-[9px]" : "w-5"
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer */}
      <div
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className={`fixed inset-0 z-40 bg-[#0C0B08]/98 backdrop-blur-xl transition-all duration-500 lg:hidden flex flex-col justify-between px-7 py-24 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-3 pt-4 overflow-y-auto">
          <p className="text-eyebrow text-[var(--color-gold-400)] mb-1 text-[10px]">
            Navigation
          </p>

          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="text-xl font-light text-white hover:text-[var(--color-gold-300)] transition-colors pb-2 border-b border-white/[0.08]"
          >
            Discover
          </Link>

          <div>
            <button
              type="button"
              onClick={() => setMobilePropertiesOpen(!mobilePropertiesOpen)}
              className="w-full flex items-center justify-between text-xl font-light text-white hover:text-[var(--color-gold-300)] transition-colors pb-2 border-b border-white/[0.08] cursor-pointer"
            >
              <span>Properties</span>
              <ChevronDown className={`w-4 h-4 text-[var(--color-gold-400)] transition-transform duration-300 ${mobilePropertiesOpen ? "rotate-180" : ""}`} />
            </button>

            {mobilePropertiesOpen && (
              <div className="pl-4 py-2 space-y-2 border-b border-white/[0.08] bg-white/[0.02]">
                {propertySublinks.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm text-white/80 hover:text-[var(--color-gold-300)] py-1.5"
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/resale"
            onClick={() => setMobileOpen(false)}
            className="text-xl font-light text-white hover:text-[var(--color-gold-300)] transition-colors pb-2 border-b border-white/[0.08]"
          >
            Resale Marketplace
          </Link>

          <div>
            <button
              type="button"
              onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
              className="w-full flex items-center justify-between text-xl font-light text-white hover:text-[var(--color-gold-300)] transition-colors pb-2 border-b border-white/[0.08] cursor-pointer"
            >
              <span>Company</span>
              <ChevronDown className={`w-4 h-4 text-[var(--color-gold-400)] transition-transform duration-300 ${mobileCompanyOpen ? "rotate-180" : ""}`} />
            </button>

            {mobileCompanyOpen && (
              <div className="pl-4 py-2 space-y-2 border-b border-white/[0.08] bg-white/[0.02]">
                {companySublinks.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm text-white/80 hover:text-[var(--color-gold-300)] py-1.5"
                  >
                    {sub.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              setListModalOpen(true);
            }}
            className="text-left text-xl font-light text-[var(--color-gold-300)] hover:text-white transition-colors pb-2 border-b border-white/[0.08] flex items-center justify-between cursor-pointer"
          >
            <span>+ List Your Property</span>
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Contact & Action */}
        <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
          <a
            href={SITE_CONFIG.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial-gold text-xs text-center justify-center py-3"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <a
            href={`tel:${SITE_CONFIG.contact.phonePrimary.replace(/\s/g, "")}`}
            className="text-xs text-white/70 hover:text-white flex items-center justify-center gap-2 py-1"
          >
            <Phone className="w-3.5 h-3.5 text-[var(--color-gold-400)]" />
            <span>Call: {SITE_CONFIG.contact.phonePrimary}</span>
          </a>
        </div>
      </div>

      {/* Owner Listing Modal */}
      <ListPropertyModal
        isOpen={listModalOpen}
        onClose={() => setListModalOpen(false)}
      />
    </>
  );
}
