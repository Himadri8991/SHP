"use client";

import { useState } from "react";
import { SITE_CONFIG } from "@/data/site-config";

export default function EnquirySection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [intent, setIntent] = useState("Acquisition (Buy)");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const formattedMessage = `Hello Sky-High Properties,\n\nI would like to schedule a consultation.\n\nName: ${name}\nPhone: ${phone}\nNature of Interest: ${intent}\nDetails: ${message || "I am looking for property options in Newtown/Kolkata."}`;
    const url = `https://wa.me/${SITE_CONFIG.whatsapp.number}?text=${encodeURIComponent(formattedMessage)}`;

    setStatus("ready");
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      aria-labelledby="enquiry-title"
      className="scroll-mt-24 sm:scroll-mt-28 pt-28 sm:pt-36 pb-24 sm:pb-32 bg-[#0C0B08] text-white border-t border-white/10"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Direct Consultation Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
                <p className="text-eyebrow text-[var(--color-gold-300)]">
                  Contact & Consultation
                </p>
              </div>

              <h2
                id="enquiry-title"
                className="text-section-title text-white mb-6"
              >
                Begin your property conversation.
              </h2>

              <p className="text-subhead text-white/70 font-light leading-relaxed mb-10">
                Whether you are looking to buy a new home, sell or resell an existing property, or explore commercial opportunities across Newtown and Kolkata, our team is ready to guide you.
              </p>

              {/* Direct Verification Info */}
              <div className="space-y-6 pt-6 border-t border-white/15">
                <div>
                  <span className="text-eyebrow text-[var(--color-gold-300)] block mb-1">Direct Telephones</span>
                  <div className="flex flex-wrap gap-4 text-base font-light">
                    <a
                      href={`tel:${SITE_CONFIG.contact.phonePrimary.replace(/\s/g, "")}`}
                      className="hover:text-[var(--color-gold-300)] transition-colors"
                    >
                      {SITE_CONFIG.contact.phonePrimary}
                    </a>
                    <span className="text-white/30">/</span>
                    <a
                      href={`tel:${SITE_CONFIG.contact.phoneSecondary.replace(/\s/g, "")}`}
                      className="hover:text-[var(--color-gold-300)] transition-colors"
                    >
                      {SITE_CONFIG.contact.phoneSecondary}
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-eyebrow text-[var(--color-gold-300)] block mb-1">Electronic Mail</span>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="text-base font-light hover:text-[var(--color-gold-300)] transition-colors"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>

                <div>
                  <span className="text-eyebrow text-[var(--color-gold-300)] block mb-1">Office Location</span>
                  <address className="not-italic text-sm text-white/80 font-light leading-relaxed">
                    {SITE_CONFIG.address.shop}, {SITE_CONFIG.address.market},<br />
                    {SITE_CONFIG.address.block}, {SITE_CONFIG.address.area},<br />
                    {SITE_CONFIG.address.city} – {SITE_CONFIG.address.pin}
                  </address>
                </div>
              </div>

              {/* Immediate WhatsApp Action */}
              <div className="pt-8">
                <a
                  href={SITE_CONFIG.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link editorial-link-light text-xs"
                >
                  <span>Connect with an Advisor on WhatsApp</span>
                  <span className="text-xs">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Confidential Form */}
          <div className="lg:col-span-7 bg-[#14120E] p-8 sm:p-12 border border-white/15 rounded-[3px] shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-light text-white mb-2">
              Request a Consultation Call.
            </h3>
            <p className="text-xs sm:text-sm text-white/60 font-light mb-8">
              Submit your contact details and our team will get in touch with relevant options.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="form-name" className="block text-eyebrow text-white/60 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priyadarshi Sen"
                    className="w-full bg-transparent border-b border-white/20 pb-2.5 text-sm sm:text-base text-white placeholder-white/25 focus:border-[var(--color-gold-400)] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="form-phone" className="block text-eyebrow text-white/60 mb-2">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="form-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98300 XXXXX"
                    className="w-full bg-transparent border-b border-white/20 pb-2.5 text-sm sm:text-base text-white placeholder-white/25 focus:border-[var(--color-gold-400)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="form-intent" className="block text-eyebrow text-white/60 mb-2">
                  Nature of Interest
                </label>
                <select
                  id="form-intent"
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                  className="w-full bg-transparent border-b border-white/20 pb-2.5 text-sm sm:text-base text-white focus:border-[var(--color-gold-400)] focus:outline-none cursor-pointer"
                >
                  <option value="Buying a Residence" className="bg-[#14120E] text-white">Buying a Residential Property (Apartment / Penthouse)</option>
                  <option value="Selling / Reselling a Property" className="bg-[#14120E] text-white">Selling / Reselling a Property in Kolkata</option>
                  <option value="Commercial Space" className="bg-[#14120E] text-white">Commercial Office or Retail Space</option>
                  <option value="Leasing / Renting" className="bg-[#14120E] text-white">Leasing / Rental Property</option>
                  <option value="Land / Plot Acquisition" className="bg-[#14120E] text-white">Land & Residential Plot</option>
                  <option value="General Market Consultation" className="bg-[#14120E] text-white">General Market Consultation & Valuation</option>
                </select>
              </div>

              <div>
                <label htmlFor="form-message" className="block text-eyebrow text-white/60 mb-2">
                  Specific Requirements or Preferred Locations
                </label>
                <textarea
                  id="form-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Interested in duplexes or villas in Action Area I, ready or near possession..."
                  className="w-full bg-transparent border-b border-white/20 pb-2 text-sm sm:text-base text-white placeholder-white/25 focus:border-[var(--color-gold-400)] focus:outline-none resize-none transition-colors"
                />
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  className="btn-editorial-gold w-full sm:w-auto"
                >
                  <span>Initiate Consultation</span>
                  <span className="text-xs">→</span>
                </button>

                <p className="text-[11px] text-white/40 font-light">
                  Strictly confidential · Zero spam commitment
                </p>
              </div>

              {status === "ready" && (
                <p className="text-xs text-[var(--color-gold-300)] pt-2">
                  ✓ Pre-filled consultation launched via WhatsApp.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
