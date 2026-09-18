import { BRAND_ASSETS } from "@/lib/site-assets";
import { SITE_CONFIG } from "@/data/site-config";

interface BrandLogoProps {
  /** "dark" for dark/cinematic surfaces, "light" for light stone surfaces */
  variant?: "dark" | "light";
  /** Optional class for sizing or layout */
  className?: string;
}

/**
 * BrandLogo
 *
 * Mathematically framed emblem and wordmark for Sky-High Properties.
 * Scales the square source image so that the roof icon, orange windows,
 * "SKY-HIGH", and "PROPERTIES" are 100% visible and razor-sharp.
 */
export function BrandLogo({ variant = "dark", className = "" }: BrandLogoProps) {
  const isDark = variant === "dark";
  const logoSrc = isDark ? BRAND_ASSETS.logoDark : BRAND_ASSETS.logoLight;

  return (
    <div
      className={`relative inline-flex items-center select-none ${className}`}
      aria-label={SITE_CONFIG.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt={SITE_CONFIG.name}
        className="w-[125px] sm:w-[148px] h-auto object-contain transition-opacity duration-300 pointer-events-none"
        loading="eager"
      />
    </div>
  );
}
