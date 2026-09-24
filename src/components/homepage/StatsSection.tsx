"use client";

import { SITE_CONFIG } from "@/data/site-config";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

function parseStatValue(raw: string) {
  const match = raw.match(/^([^\d]*)(\d+)(.*)$/);
  if (!match) return { prefix: "", num: 0, suffix: raw };
  return {
    prefix: match[1] || "",
    num: parseInt(match[2], 10),
    suffix: match[3] || "",
  };
}

export default function StatsSection() {
  return (
    <section
      aria-label="Key Performance Statistics"
      className="bg-[#0F0E0A] text-white py-12 sm:py-16 border-b border-white/[0.08]"
    >
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {SITE_CONFIG.stats.map((stat, i) => {
            const parsed = parseStatValue(stat.value);
            return (
              <div
                key={stat.label}
                className={`flex flex-col justify-center ${
                  i > 0 ? "pt-6 sm:pt-0 sm:pl-8 lg:pl-10" : ""
                }`}
              >
                <div className="flex items-baseline gap-2 mb-1.5">
                  <span className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--color-gold-300)] tracking-tight">
                    <AnimatedCounter
                      target={parsed.num}
                      prefix={parsed.prefix}
                      suffix={parsed.suffix}
                      duration={1400}
                    />
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-400)] mb-1" />
                </div>
                <p className="text-xs sm:text-sm font-medium tracking-[0.14em] uppercase text-white/90 mb-1">
                  {stat.label}
                </p>
                <p className="text-[11px] sm:text-xs text-white/50 font-light leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
