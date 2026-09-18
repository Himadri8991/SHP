"use client";

import { MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/data/site-config";

export function FloatingWhatsApp() {
  return (
    <aside aria-label="WhatsApp Quick Contact" className="fixed bottom-6 right-6 z-40">
      <a
        href={SITE_CONFIG.whatsapp.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 bg-[#25D366] text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-[0_8px_25px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.5)] hover:bg-[#20ba5a] transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Chat with an advisor on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline-block">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}

export default FloatingWhatsApp;
