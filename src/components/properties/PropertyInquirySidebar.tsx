"use client";

import { useState } from "react";
import { CheckCircle2, MessageSquare, Send } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

interface PropertyInquirySidebarProps {
  propertyTitle: string;
  propertyPrice?: string | null;
  propertyLocation: string;
}

export default function PropertyInquirySidebar({
  propertyTitle,
  propertyPrice,
  propertyLocation,
}: PropertyInquirySidebarProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Sky-High Properties,\n\nI would like to schedule a private viewing for:\n*${propertyTitle}*\nLocation: ${propertyLocation}\nPrice: ${propertyPrice || "On Request"}\n\nClient Name: ${name || "Client"}\nPhone: ${phone || ""}\nEmail: ${email || ""}`
  );

  return (
    <div
      id="book-viewing"
      className="bg-white p-8 rounded-[3px] border border-[var(--color-stone-200)] shadow-lg sticky top-28"
    >
      <h3 className="text-xl font-light text-[var(--color-stone-900)] mb-2">
        Inquire About This Property
      </h3>
      <p className="text-xs text-[var(--color-stone-500)] font-light mb-6">
        Connect directly with our dedicated Kolkata advisory team for a private consultation, title documentation review, or on-site tour.
      </p>

      {submitted ? (
        <div className="py-6 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-medium text-[var(--color-stone-900)] mb-2">
            Viewing Request Received
          </h4>
          <p className="text-xs text-[var(--color-stone-600)] font-light leading-relaxed mb-6">
            Thank you, <span className="font-medium text-[var(--color-stone-800)]">{name}</span>. Our lead advisor has received your request for <span className="font-medium text-[var(--color-stone-800)]">{propertyTitle}</span>. We will call you at <span className="font-medium text-[var(--color-stone-800)]">{phone}</span> shortly to coordinate access.
          </p>

          <div className="space-y-3">
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-gold w-full text-xs py-2.5 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Connect on WhatsApp Now</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setName("");
                setPhone("");
                setEmail("");
              }}
              className="w-full text-xs text-[var(--color-stone-500)] hover:text-[var(--color-stone-800)] underline py-1 transition-colors cursor-pointer"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[var(--color-stone-500)] mb-1 font-medium">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Subir Mukherjee"
              className="w-full px-3 py-2.5 bg-[var(--surface-canvas-alt)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-800)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[var(--color-stone-500)] mb-1 font-medium">
              Phone / WhatsApp *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98300 XXXXX"
              className="w-full px-3 py-2.5 bg-[var(--surface-canvas-alt)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-800)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-[var(--color-stone-500)] mb-1 font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full px-3 py-2.5 bg-[var(--surface-canvas-alt)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-800)] focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-editorial-gold text-xs py-3 mt-4 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Submitting...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Request Confidential Viewing</span>
              </>
            )}
          </button>
        </form>
      )}

      <div className="mt-6 pt-6 border-t border-[var(--color-stone-100)] flex flex-col gap-2">
        <a
          href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=Inquiry%20regarding%20${encodeURIComponent(propertyTitle)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full btn-editorial-outline text-xs text-center py-2.5 block"
        >
          Direct WhatsApp Inquiry
        </a>
        <p className="text-[10px] text-center text-[var(--color-stone-400)] mt-1">
          Direct desk: {SITE_CONFIG.contact.phonePrimary}
        </p>
      </div>
    </div>
  );
}
