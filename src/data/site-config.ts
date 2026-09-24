/**
 * SITE CONFIGURATION — Sky-High Properties
 *
 * Centralized business contact information, brand data, statistics,
 * and trust credentials sourced from the official business records.
 */

export const SITE_CONFIG = {
  /** Brand name */
  name: "Sky-High Properties",
  /** Short brand name for nav/mobile */
  nameShort: "Sky-High",
  /** Official tagline */
  tagline: "Built on Trust. Driven by Excellence.",
  /** Primary positioning */
  positioning: "Premium Property Consultants in Kolkata",
  /** Core regions */
  regions: "Newtown · Rajarhat · Kolkata",
  city: "Kolkata",

  /** Official Address */
  address: {
    shop: "Shop No. 29, 1st Floor",
    market: "NKDA Community Market",
    block: "AB-Block, Action Area-1",
    area: "Newtown",
    city: "Kolkata",
    state: "West Bengal",
    pin: "700156",
    full: "Shop No. 29, 1st Floor, NKDA Community Market, AB-Block, Newtown Action Area-1, Kolkata – 700156",
  },

  /** Contact Details */
  contact: {
    phonePrimary: "+91 62915 85255",
    phoneSecondary: "+91 78903 60636",
    email: "we@skyhighpropertiess.com",
    website: "skyhighpropertiess.com",
    whatsapp: "916291585255",
  },

  /** WhatsApp CTA configuration */
  whatsapp: {
    number: "916291585255",
    defaultMessage: "Hi Sky-High Properties! I'm interested in your properties.",
    get url() {
      return `https://wa.me/${this.number}?text=${encodeURIComponent(this.defaultMessage)}`;
    },
  },

  /** Key Business Statistics */
  stats: [
    { value: "100+", label: "Properties Listed", desc: "Curated residential, commercial & plots" },
    { value: "10+", label: "Locations Covered", desc: "Prime corridors across Kolkata & Newtown" },
    { value: "10+", label: "Years of Experience", desc: "Decade of trusted local market advisory" },
    { value: "96%", label: "Client Satisfaction", desc: "Verified legal titles & transparent guidance" },
  ],

  /** Trust Pillars (Why Choose Sky-High) */
  trustPillars: [
    {
      id: "01",
      title: "Local Market Knowledge",
      tagline: "Neighborhood & Price Expertise",
      description:
        "Practical insights across Newtown, Rajarhat, Salt Lake, and Kolkata to help you select the ideal location, evaluate real market value, and make an informed move.",
    },
    {
      id: "02",
      title: "Verified Properties",
      tagline: "100% Legal & Municipal Check",
      description:
        "Every property is vetted for clear chain of title, sanctioned municipal plans, and documentation clearance, giving you absolute peace of mind.",
    },
    {
      id: "03",
      title: "Transparent Guidance",
      tagline: "Honest & Unbiased Advice",
      description:
        "Clear pricing with zero hidden fees and objective pros & cons for every property. We represent your interests, not builder targets.",
    },
    {
      id: "04",
      title: "End-to-End Assistance",
      tagline: "From Search to Registration",
      description:
        "Dedicated assistance throughout: property shortlisting, site visits, fair price negotiation, home loan coordination, and official ADSR deed registration.",
    },
  ],

  /** Prime Locations */
  locations: [
    { name: "Newtown Action Area I", count: "18+ Listings", desc: "Commercial hub, luxury duplexes, IT connectivity" },
    { name: "Newtown Action Area II", count: "14+ Listings", desc: "Eco Park views, expansive high-rise towers, IT corridor" },
    { name: "Newtown Action Area III", count: "9+ Listings", desc: "Educational hub, quiet residential communities, open spaces" },
    { name: "Rajarhat Expressway", count: "12+ Listings", desc: "Rapid appreciation, gated communities, airport access" },
    { name: "Salt Lake (Bidhannagar)", count: "8+ Listings", desc: "Established greenery, corporate sectors, metro connectivity" },
    { name: "Alipore & Ballygunge", count: "6+ Listings", desc: "Prestigious South Kolkata enclaves and luxury residences" },
    { name: "Dum Dum & VIP Corridor", count: "7+ Listings", desc: "Airport connectivity, metro transit, and established residential enclaves" },
    { name: "Joka & Southern Bypass", count: "8+ Listings", desc: "Expanding metro corridor, modern townships, and gated projects" },
    { name: "E.M. Bypass Enclaves", count: "6+ Listings", desc: "High-rise towers, premium lifestyle, and healthcare access" },
  ],

  /** Client Testimonials */
  testimonials: [
    {
      quote:
        "Skyhigh team were extremely professional and responsive throughout our property search. Excellent market knowledge and honest guidance. Found us exactly what we were looking for in Action Area 1.",
      author: "Saptarshi Mukherjee",
      role: "Engineer, Kolkata",
      verified: true,
      rating: 5,
    },
    {
      quote:
        "Sky-High Properties handled our luxury apartment purchase with total discretion and speed. Their verification of NKDA mutation papers and ADSR registration saved us weeks of hassle.",
      author: "Debabrata Roy",
      role: "Corporate Executive, Newtown",
      verified: true,
      rating: 5,
    },
  ],

  /** Navigation items */
  nav: [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Resale", href: "/resale" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  /** Services offered */
  services: ["Buy", "Sell", "Rent", "Invest", "Plots"] as const,

  /** SEO configuration */
  seo: {
    title: "Sky-High Properties — Premium Property Consultancy in Kolkata",
    description:
      "Find your next address with Sky-High Properties. Curated residential duplexes, villas, apartments, and commercial properties across Newtown, Rajarhat, and Kolkata.",
    siteName: "Sky-High Properties",
    locale: "en_IN",
    url: "https://skyhighpropertiess.com",
  },

  /** Social handles */
  social: {
    instagram: "https://instagram.com/skyhighproperties",
    facebook: "https://facebook.com/skyhighproperties",
    youtube: null as string | null,
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
