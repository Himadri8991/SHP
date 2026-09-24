"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Check } from "lucide-react";

type Intent = "buy" | "rent" | "resale" | "commercial" | "invest" | "sell";

export default function DiscoverySection() {
  const router = useRouter();
  const [intent, setIntent] = useState<Intent>("buy");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedDeveloper, setSelectedDeveloper] = useState<string>("all");

  const intents = [
    { id: "buy", label: "Buy" },
    { id: "rent", label: "Rent" },
    { id: "resale", label: "Resale" },
    { id: "commercial", label: "Commercial" },
    { id: "sell", label: "List / Sell" },
  ] as const;

  const propertyCategories = [
    { id: "all", label: "All Portfolio" },
    { id: "new-project", label: "New Projects" },
    { id: "resale", label: "Resale Flats" },
    { id: "rent", label: "Luxury Rent" },
    { id: "land-plot", label: "Land / Plot" },
    { id: "commercial", label: "Commercial" },
  ];

  const developers = [
    { id: "all", label: "All Developers" },
    { id: "PS Group", label: "PS Group" },
    { id: "Srijan", label: "Srijan Realty" },
    { id: "Godrej Properties", label: "Godrej" },
    { id: "Shapoorji Pallonji", label: "Shapoorji Pallonji" },
    { id: "Eden Realty", label: "Eden Realty" },
    { id: "Vinayak Group", label: "Vinayak Group" },
    { id: "DTC Group", label: "DTC Group" },
  ];

  const locations = [
    { id: "all", label: "Any Location" },
    { id: "Newtown", label: "Newtown" },
    { id: "Rajarhat", label: "Rajarhat" },
    { id: "EM Bypass", label: "EM Bypass" },
    { id: "Salt Lake", label: "Salt Lake" },
    { id: "BT Road", label: "BT Road" },
    { id: "Joka", label: "Joka" },
    { id: "Dum Dum", label: "Dum Dum" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (intent === "sell") {
      router.push("/resale");
      return;
    }

    const params = new URLSearchParams();
    if (intent === "rent") params.set("purpose", "rent");
    else if (intent === "resale") params.set("category", "resale");
    else if (intent === "commercial") params.set("type", "commercial");

    if (selectedType !== "all") params.set("category", selectedType);
    if (selectedDeveloper !== "all") params.set("developer", selectedDeveloper);
    if (selectedLocation !== "all") params.set("location", selectedLocation);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section
      id="discovery"
      aria-labelledby="discovery-heading"
      className="scroll-mt-24 py-24 sm:py-32 bg-[var(--surface-canvas-alt)] text-[var(--text-primary)] border-t border-[var(--color-stone-200)]"
    >
      <div className="container-wide">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-[var(--color-gold-400)]" aria-hidden="true" />
            <p className="text-eyebrow text-[var(--color-gold-500)] text-[10px]">
              Property Concierge & Discovery
            </p>
          </div>
          <h2
            id="discovery-heading"
            className="text-section-title text-[var(--color-stone-900)] mb-4"
          >
            What are you looking for?
          </h2>
          <p className="text-subhead text-[var(--color-stone-600)] font-light leading-relaxed">
            Select your preferences below to discover verified properties curated for space, location, and clear title documentation.
          </p>
        </div>

        {/* The Discovery Card / Instrument */}
        <form
          onSubmit={handleSearch}
          className="bg-white p-7 sm:p-10 lg:p-12 rounded-[3px] border border-[var(--color-stone-300)] shadow-lg space-y-8"
        >
          {/* Step 1: Intent Tabs (BUY, RENT, INVEST, SELL) */}
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[var(--color-stone-400)] block mb-3">
              01 · Select Intent
            </label>
            <div className="flex flex-wrap gap-2 sm:gap-3" role="tablist">
              {intents.map((tab) => {
                const isActive = intent === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setIntent(tab.id)}
                    className={`px-6 py-2.5 text-xs sm:text-sm tracking-widest uppercase font-semibold rounded-[3px] transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[var(--color-navy-900)] text-white shadow-md scale-[1.02]"
                        : "bg-[var(--surface-canvas-alt)] text-[var(--color-stone-700)] hover:bg-[var(--color-stone-200)] border border-[var(--color-stone-300)]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {intent === "sell" ? (
            /* Special prompt when user clicks SELL */
            <div className="p-6 bg-[var(--surface-canvas)] rounded-[3px] border border-[var(--color-stone-300)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-medium text-[var(--color-stone-900)] mb-1">
                  Selling or Reselling a Property in Kolkata?
                </h3>
                <p className="text-sm text-[var(--color-stone-600)] font-light">
                  Get professional market positioning, accurate registry valuation, and direct access to qualified buyers.
                </p>
              </div>
              <a
                href="#sell"
                className="btn-editorial-gold text-[11px] whitespace-nowrap self-start sm:self-auto"
              >
                <span>Go to Seller Representation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            <>
              {/* Step 2: Property Category Pills */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[var(--color-stone-400)] block mb-3">
                  02 · Category
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {propertyCategories.map((type) => {
                    const isSelected = selectedType === type.id;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setSelectedType(type.id)}
                        className={`px-4 py-2 text-xs font-medium rounded-[3px] transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-[var(--color-gold-400)] text-black font-semibold shadow-sm"
                            : "bg-[var(--surface-canvas-alt)] text-[var(--color-stone-700)] hover:bg-white hover:border-[var(--color-stone-400)] border border-[var(--color-stone-200)]"
                        }`}
                      >
                        {type.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Developer Selection */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[var(--color-stone-400)] block mb-3">
                  03 · Premier Developers
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {developers.map((dev) => {
                    const isSelected = selectedDeveloper === dev.id;
                    return (
                      <button
                        key={dev.id}
                        type="button"
                        onClick={() => setSelectedDeveloper(dev.id)}
                        className={`px-3.5 py-1.5 text-xs font-medium rounded-[3px] transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-[var(--color-navy-900)] text-white font-semibold shadow-sm"
                            : "bg-[var(--surface-canvas-alt)] text-[var(--color-stone-700)] hover:bg-white hover:border-[var(--color-stone-400)] border border-[var(--color-stone-200)]"
                        }`}
                      >
                        {dev.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Locations */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[var(--color-stone-400)] block mb-3">
                  04 · Location / Corridor
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {locations.map((loc) => {
                    const isSelected = selectedLocation === loc.id;
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setSelectedLocation(loc.id)}
                        className={`px-4 py-2 text-xs font-medium rounded-[3px] transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-[var(--color-gold-400)] text-black font-semibold shadow-sm"
                            : "bg-[var(--surface-canvas-alt)] text-[var(--color-stone-700)] hover:bg-white hover:border-[var(--color-stone-400)] border border-[var(--color-stone-200)]"
                        }`}
                      >
                        {loc.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-6 border-t border-[var(--color-stone-200)] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-xs text-[var(--color-stone-500)] font-light">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Sanctioned municipal plans & verified title history on all results</span>
                </div>

                <button
                  type="submit"
                  className="btn-editorial-gold text-xs sm:text-sm py-3 px-8 w-full sm:w-auto text-center justify-center cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Find My Property</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
