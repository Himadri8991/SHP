/**
 * UTILITIES — Sky-High Properties
 */

/**
 * Combine class names cleanly.
 * Accepts strings, arrays, or falsy values (undefined, null, false).
 */
export function cn(...inputs: (string | undefined | null | false | 0)[]): string {
  return inputs.flat().filter(Boolean).join(" ");
}

/**
 * Format area in sq ft with locale formatting.
 */
export function formatArea(sqft: number | null): string {
  if (sqft === null) return "";
  return `${sqft.toLocaleString("en-IN")} sq.ft.`;
}

/**
 * Format bedroom count as label.
 */
export function formatBedrooms(count: number | null): string {
  if (count === null) return "";
  return `${count} BHK`;
}

/**
 * Format price string with ₹ symbol (pass-through if already formatted).
 */
export function formatPrice(price: string | null): string {
  if (!price) return "Price on request";
  return price.startsWith("₹") ? price : `₹ ${price}`;
}

/**
 * WhatsApp URL builder.
 */
export function buildWhatsAppUrl(number: string, message: string): string {
  const cleaned = number.replace(/[\s+\-()]/g, "");
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Map a value from one range to another.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
}
