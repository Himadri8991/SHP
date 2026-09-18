"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle2, Send, Building2, Key, Trees, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";
import { TOP_DEVELOPERS } from "@/data/properties";

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultIntent?: "resale" | "rent" | "plot";
}

export default function ListPropertyModal({ isOpen, onClose, defaultIntent = "resale" }: ListPropertyModalProps) {
  const [intent, setIntent] = useState<"resale" | "rent" | "plot">(defaultIntent);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    developer: "",
    bhk: "3 BHK",
    area: "",
    expectedPrice: "",
    ownerName: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIntent(defaultIntent);
      setSubmitted(false);
      setError("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, defaultIntent]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.ownerName || !formData.phone) {
      setError("Please provide the property name, locality, your name, and phone number.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const cleanPhone = SITE_CONFIG.contact.whatsapp.replace(/[^0-9]/g, "");
  const waText = encodeURIComponent(
    `Hello Sky-High Properties, I want to list my property with your advisory desk:
• Type: ${intent.toUpperCase()}
• Property / Society: ${formData.title}
• Location: ${formData.location}
• Developer: ${formData.developer || "Standalone / Independent"}
• Configuration: ${intent === "plot" ? "Plot / Land" : formData.bhk}
• Area: ${formData.area || "Not specified"} sq.ft
• Expected Price: ${formData.expectedPrice || "Negotiable"}
• Owner Name: ${formData.ownerName}
• Contact: ${formData.phone}`
  );

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-[#14120E] border border-white/15 rounded-[4px] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-white/10 flex items-start justify-between bg-gradient-to-b from-white/[0.04] to-transparent">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-px bg-[var(--color-gold-400)]" />
              <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold-400)] font-semibold">
                Owner Representation Desk
              </p>
            </div>
            <h3 className="text-xl sm:text-2xl font-light text-white">
              List Your Property With <span className="font-editorial italic text-[var(--color-gold-300)]">Sky-High</span>
            </h3>
            <p className="text-xs text-white/60 font-light mt-1">
              Connect with vetted HNI buyers and corporate tenants with zero public spam.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="text-xl text-white font-medium">Listing Details Received</h4>
              <p className="text-xs text-white/70 font-light max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.ownerName}</strong>. Our senior Kolkata valuation team will review your property specification and contact you via phone/WhatsApp.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${cleanPhone}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial-gold text-xs px-6 py-3 w-full sm:w-auto inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Details via WhatsApp Now</span>
                </a>
                <button
                  onClick={onClose}
                  className="text-xs text-white/60 hover:text-white border border-white/20 px-5 py-3 rounded-[3px] hover:bg-white/5 transition-colors w-full sm:w-auto cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded text-rose-300 text-xs">
                  {error}
                </div>
              )}

              {/* Intent Selector */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-white/70 font-medium mb-2">
                  Listing Intent
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setIntent("resale")}
                    className={`py-2.5 px-3 rounded-[3px] text-xs font-medium border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      intent === "resale"
                        ? "bg-[var(--color-gold-500)] text-black border-[var(--color-gold-500)] font-semibold shadow-sm"
                        : "bg-white/[0.04] text-white/70 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>Resale Flat</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIntent("rent")}
                    className={`py-2.5 px-3 rounded-[3px] text-xs font-medium border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      intent === "rent"
                        ? "bg-[var(--color-gold-500)] text-black border-[var(--color-gold-500)] font-semibold shadow-sm"
                        : "bg-white/[0.04] text-white/70 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Rent / Lease</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIntent("plot")}
                    className={`py-2.5 px-3 rounded-[3px] text-xs font-medium border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      intent === "plot"
                        ? "bg-[var(--color-gold-500)] text-black border-[var(--color-gold-500)] font-semibold shadow-sm"
                        : "bg-white/[0.04] text-white/70 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <Trees className="w-3.5 h-3.5" />
                    <span>Plot / Land</span>
                  </button>
                </div>
              </div>

              {/* Title & Locality */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                    Property / Society Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Srijan Solus, PS One10"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/[0.05] border border-white/15 rounded-[3px] text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                    Locality / Corridor *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Newtown AA-I, Rajarhat"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/[0.05] border border-white/15 rounded-[3px] text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
                  />
                </div>
              </div>

              {/* Developer & BHK */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                    Developer (if known)
                  </label>
                  <select
                    value={formData.developer}
                    onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                    className="w-full px-3 py-2.5 bg-[#1A1814] border border-white/15 rounded-[3px] text-xs text-white focus:outline-none focus:border-[var(--color-gold-400)] transition-colors cursor-pointer"
                  >
                    <option value="">Select Developer (Optional)</option>
                    {TOP_DEVELOPERS.map((dev) => (
                      <option key={dev} value={dev}>{dev}</option>
                    ))}
                    <option value="Other / Standalone">Other / Standalone</option>
                  </select>
                </div>
                {intent !== "plot" ? (
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                      BHK Configuration
                    </label>
                    <select
                      value={formData.bhk}
                      onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#1A1814] border border-white/15 rounded-[3px] text-xs text-white focus:outline-none focus:border-[var(--color-gold-400)] transition-colors cursor-pointer"
                    >
                      <option value="1 BHK">1 BHK</option>
                      <option value="2 BHK">2 BHK</option>
                      <option value="3 BHK">3 BHK</option>
                      <option value="4 BHK">4 BHK</option>
                      <option value="5+ BHK / Penthouse">5+ BHK / Penthouse</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                      Plot Type
                    </label>
                    <select
                      value={formData.bhk}
                      onChange={(e) => setFormData({ ...formData, bhk: e.target.value })}
                      className="w-full px-3 py-2.5 bg-[#1A1814] border border-white/15 rounded-[3px] text-xs text-white focus:outline-none focus:border-[var(--color-gold-400)] transition-colors cursor-pointer"
                    >
                      <option value="Residential Plot">Residential Freehold Plot</option>
                      <option value="Commercial Plot">Commercial Plot</option>
                      <option value="Mixed-Use Land">Mixed-Use Land</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Area & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                    {intent === "plot" ? "Plot Area (Cottahs / sq.ft)" : "Super Built-up Area (sq.ft)"}
                  </label>
                  <input
                    type="text"
                    placeholder={intent === "plot" ? "e.g. 4 Cottahs or 2880 sq.ft" : "e.g. 1450 sq.ft"}
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/[0.05] border border-white/15 rounded-[3px] text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                    {intent === "rent" ? "Expected Monthly Rent (₹)" : "Expected Price (₹)"}
                  </label>
                  <input
                    type="text"
                    placeholder={intent === "rent" ? "e.g. ₹ 45,000 / mo" : "e.g. ₹ 85 Lakh or ₹ 1.5 Cr"}
                    value={formData.expectedPrice}
                    onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/[0.05] border border-white/15 rounded-[3px] text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="pt-2 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/[0.05] border border-white/15 rounded-[3px] text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white/[0.05] border border-white/15 rounded-[3px] text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="btn-editorial-gold w-full text-xs py-3.5 inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Property for Valuation & Listing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <p className="text-[10px] text-white/40 text-center font-light mt-2">
                  100% Confidential · Direct HNI / Corporate Representation · Zero Spam
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
