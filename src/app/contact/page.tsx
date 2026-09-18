"use client";

import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { SITE_CONFIG } from "@/data/site-config";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    intent: "Buy a Home",
    location: "Newtown Action Area 1",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navigation />

      <main className="pt-24 sm:pt-32 pb-24 bg-[var(--surface-canvas)] min-h-screen">
        {/* Header */}
        <section className="bg-white border-b border-[var(--color-stone-200)] py-14 sm:py-20">
          <div className="container-wide">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
                <p className="text-eyebrow text-[var(--color-gold-500)]">
                  Contact & Consultation
                </p>
              </div>
              <h1 className="text-section-title text-[var(--color-stone-900)] leading-tight mb-4">
                Speak with a{" "}
                <span className="font-editorial italic font-normal text-[var(--color-gold-500)]">
                  licensed advisor.
                </span>
              </h1>
              <p className="text-subhead text-[var(--color-stone-600)] font-light leading-relaxed">
                Whether you wish to schedule a private property walkthrough, verify a land deed, or market your existing home, our Newtown desk is here to assist.
              </p>
            </div>
          </div>
        </section>

        {/* Main Contact Grid */}
        <section className="py-16 sm:py-24">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column: Direct Contact Info & Office */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-white p-8 rounded-[3px] border border-[var(--color-stone-200)] shadow-sm">
                  <h2 className="text-xl font-light text-[var(--color-stone-900)] mb-6">
                    Operational Headquarters
                  </h2>
                  <div className="space-y-6 text-sm text-[var(--color-stone-700)] font-light">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-[var(--color-gold-500)] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-[var(--color-stone-900)] text-xs uppercase tracking-wider mb-1">
                          Office Location
                        </p>
                        <address className="not-italic leading-relaxed">
                          {SITE_CONFIG.address.full}
                        </address>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-[var(--color-gold-500)] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-[var(--color-stone-900)] text-xs uppercase tracking-wider mb-1">
                          Direct Telephone
                        </p>
                        <p>
                          <a href={`tel:${SITE_CONFIG.contact.phonePrimary.replace(/\s/g, "")}`} className="hover:text-[var(--color-gold-600)]">
                            {SITE_CONFIG.contact.phonePrimary}
                          </a>
                        </p>
                        <p>
                          <a href={`tel:${SITE_CONFIG.contact.phoneSecondary.replace(/\s/g, "")}`} className="hover:text-[var(--color-gold-600)]">
                            {SITE_CONFIG.contact.phoneSecondary}
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-[var(--color-gold-500)] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-[var(--color-stone-900)] text-xs uppercase tracking-wider mb-1">
                          Official Email
                        </p>
                        <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-[var(--color-gold-600)]">
                          {SITE_CONFIG.contact.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="w-5 h-5 text-[var(--color-gold-500)] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-[var(--color-stone-900)] text-xs uppercase tracking-wider mb-1">
                          Advisory Hours
                        </p>
                        <p>Monday – Saturday: 10:00 AM – 7:30 PM</p>
                        <p className="text-xs text-[var(--color-stone-500)]">Sundays: By Prior Appointment</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[var(--color-stone-100)]">
                    <a
                      href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=Hello%20Sky-High%20Properties,%20I%20would%20like%20to%20connect%20with%20an%20advisor`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-editorial-gold w-full text-xs text-center block"
                    >
                      Connect on WhatsApp Instantly
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Multi-intent Consultation Form */}
              <div className="lg:col-span-7">
                <div className="bg-white p-8 sm:p-12 rounded-[3px] border border-[var(--color-stone-200)] shadow-sm">
                  {submitted ? (
                    <div className="py-12 text-center">
                      <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-light text-[var(--color-stone-900)] mb-2">
                        Inquiry Received
                      </h3>
                      <p className="text-sm text-[var(--color-stone-600)] font-light max-w-md mx-auto mb-6">
                        Thank you for reaching out. A senior property consultant from our Newtown office will contact you within 3 business hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btn-editorial-outline text-xs"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <h2 className="text-2xl font-light text-[var(--color-stone-900)] mb-2">
                        Schedule an Advisory Session
                      </h2>
                      <p className="text-xs text-[var(--color-stone-500)] font-light mb-6">
                        Fill out the details below, and our advisory desk will prepare relevant documentation ahead of your discussion.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[var(--color-stone-500)] font-medium mb-1.5">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Anirban Roy"
                            className="w-full px-4 py-3 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs sm:text-sm text-[var(--color-stone-800)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[var(--color-stone-500)] font-medium mb-1.5">
                            Phone / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 98300 XXXXX"
                            className="w-full px-4 py-3 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs sm:text-sm text-[var(--color-stone-800)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[var(--color-stone-500)] font-medium mb-1.5">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@domain.com"
                            className="w-full px-4 py-3 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs sm:text-sm text-[var(--color-stone-800)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-[var(--color-stone-500)] font-medium mb-1.5">
                            Advisory Requirement
                          </label>
                          <select
                            value={formData.intent}
                            onChange={(e) => setFormData({ ...formData, intent: e.target.value })}
                            className="w-full px-4 py-3 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs sm:text-sm text-[var(--color-stone-800)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
                          >
                            <option>Buy a Luxury Home</option>
                            <option>Sell / Resale My Property</option>
                            <option>Invest in Freehold Land / Plot</option>
                            <option>Commercial Lease or Purchase</option>
                            <option>Title & Due Diligence Consultation</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[var(--color-stone-500)] font-medium mb-1.5">
                          Target Location / Corridor
                        </label>
                        <select
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-4 py-3 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs sm:text-sm text-[var(--color-stone-800)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
                        >
                          <option>Newtown Action Area 1</option>
                          <option>Newtown Action Area 2 & 3</option>
                          <option>Rajarhat Main Road & Chinar Park</option>
                          <option>EM Bypass / Science City Corridor</option>
                          <option>South Kolkata (Ballygunge, Alipore)</option>
                          <option>Salt Lake (Sector 1, 2, 3, 5)</option>
                          <option>Other / Entire Kolkata</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] uppercase tracking-wider text-[var(--color-stone-500)] font-medium mb-1.5">
                          Additional Requirements or Questions
                        </label>
                        <textarea
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Please describe your preferred budget, BHK requirement, or property address if selling..."
                          className="w-full px-4 py-3 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs sm:text-sm text-[var(--color-stone-800)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn-editorial-gold w-full text-xs py-3.5 tracking-wider uppercase"
                      >
                        Submit Consultation Request
                      </button>

                      <p className="text-[10px] text-[var(--color-stone-400)] text-center font-light">
                        Strict Privacy Guaranteed · Zero spam · Your information is confidential.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
