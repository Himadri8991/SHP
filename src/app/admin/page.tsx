"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  PlusCircle,
  Trash2,
  CheckCircle2,
  ExternalLink,
  Search,
  Lock,
  LogOut,
  RefreshCw,
  ArrowRight
} from "lucide-react";
import { PropertyListing, TOP_DEVELOPERS, PropertyCategory, PropertyStatus, PropertyType } from "@/data/properties";
import { PRESET_PROPERTY_IMAGES, fetchLiveProperties, createProperty, updateProperty, deleteProperty } from "@/lib/property-store";
import { BrandLogo } from "@/components/ui/BrandLogo";

const ADMIN_PASSCODE = "skyhigh2026";

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Dashboard State
  const [activeTab, setActiveTab] = useState<"add" | "manage">("add");
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");

  // Form State for "Add Property"
  const [formData, setFormData] = useState({
    title: "",
    developer: "PS Group",
    type: "apartment" as PropertyType,
    category: "new-project" as PropertyCategory,
    purpose: "buy" as "buy" | "rent",
    status: "available" as PropertyStatus,
    location: "",
    price: "",
    bedrooms: "3",
    bathrooms: "3",
    areaSqft: "",
    description: "",
    imageSrc: PRESET_PROPERTY_IMAGES[0].src,
    customImageSrc: "",
    highlights: "100% Power Backup, Gated Security, Covered Car Parking, Swimming Pool",
  });

  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<PropertyListing | null>(null);
  const [formError, setFormError] = useState("");

  // Check existing session
  useEffect(() => {
    try {
      const savedAuth = sessionStorage.getItem("shp_admin_auth");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      }
    } catch {}
  }, []);

  // Load properties when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadProperties();
    }
  }, [isAuthenticated]);

  const loadProperties = async () => {
    setLoading(true);
    const data = await fetchLiveProperties();
    setProperties(data);
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput.trim() === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      setAuthError("");
      try {
        sessionStorage.setItem("shp_admin_auth", "true");
      } catch {}
    } else {
      setAuthError("Invalid passcode. Please enter the correct executive key.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem("shp_admin_auth");
    } catch {}
  };

  const handleCreateProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess(null);

    if (!formData.title.trim() || !formData.location.trim()) {
      setFormError("Please enter the property title and locality/corridor.");
      return;
    }

    setFormSubmitting(true);

    const chosenImage = formData.customImageSrc.trim() || formData.imageSrc;

    const payload: Partial<PropertyListing> = {
      title: formData.title.trim(),
      developer: formData.developer === "Standalone / Other" ? undefined : formData.developer,
      type: formData.type,
      category: formData.category,
      purpose: formData.purpose,
      status: formData.status,
      location: formData.location.trim(),
      price: formData.price.trim() || null,
      bedrooms: formData.category === "land-plot" ? null : Number(formData.bedrooms) || 3,
      bathrooms: formData.category === "land-plot" ? null : Number(formData.bathrooms) || 2,
      areaSqft: Number(formData.areaSqft) || null,
      description: formData.description.trim() || `${formData.title} located in ${formData.location}. Verified representation by Sky-High Properties.`,
      imageSrc: chosenImage,
      imageAlt: `${formData.title} in ${formData.location}`,
      highlights: formData.highlights.split(",").map((s) => s.trim()).filter(Boolean),
    };

    const res = await createProperty(payload);
    setFormSubmitting(false);

    if (res.success && res.property) {
      setFormSuccess(res.property);
      loadProperties();
      // Reset form
      setFormData({
        title: "",
        developer: "PS Group",
        type: "apartment",
        category: "new-project",
        purpose: "buy",
        status: "available",
        location: "",
        price: "",
        bedrooms: "3",
        bathrooms: "3",
        areaSqft: "",
        description: "",
        imageSrc: PRESET_PROPERTY_IMAGES[0].src,
        customImageSrc: "",
        highlights: "100% Power Backup, Gated Security, Covered Car Parking, Swimming Pool",
      });
    } else {
      setFormError(res.error || "Failed to publish property.");
    }
  };

  const handleToggleSold = async (prop: PropertyListing) => {
    const newStatus: PropertyStatus = prop.status === "sold" ? "available" : "sold";
    const res = await updateProperty(prop.id, { status: newStatus });
    if (res.success) {
      loadProperties();
    } else {
      alert("Error updating property status: " + res.error);
    }
  };

  const handleDeleteProperty = async (id: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently remove "${title}" from the live website?`
    );
    if (!confirmed) return;

    const res = await deleteProperty(id);
    if (res.success) {
      loadProperties();
    } else {
      alert("Error removing property: " + res.error);
    }
  };

  // Filtered properties for the Manage tab
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (selectedCategoryFilter !== "all" && p.category !== selectedCategoryFilter) {
        return false;
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesLoc = p.location.toLowerCase().includes(q);
        const matchesDev = (p.developer || "").toLowerCase().includes(q);
        if (!matchesTitle && !matchesLoc && !matchesDev) return false;
      }
      return true;
    });
  }, [properties, selectedCategoryFilter, searchTerm]);

  // Statistics
  const stats = useMemo(() => {
    return {
      total: properties.length,
      newProjects: properties.filter((p) => p.category === "new-project").length,
      resale: properties.filter((p) => p.category === "resale").length,
      rent: properties.filter((p) => p.category === "rent").length,
      landPlots: properties.filter((p) => p.category === "land-plot").length,
      sold: properties.filter((p) => p.status === "sold").length,
    };
  }, [properties]);

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0C0B08] text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
        {/* Ambient gold glow */}
        <div className="absolute w-[500px] h-[500px] bg-[var(--color-gold-500)]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md bg-[#14120E] border border-white/15 rounded-[4px] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center">
          <div className="flex justify-center mb-6">
            <BrandLogo variant="dark" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-[var(--color-gold-400)]" />
            <h2 className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--color-gold-400)]">
              Executive Admin Desk
            </h2>
          </div>
          <p className="text-xs text-white/60 font-light mb-6">
            Inventory Management & Property Catalog Control
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded text-rose-300 text-xs text-left">
                {authError}
              </div>
            )}

            <div className="text-left">
              <label className="block text-[11px] uppercase tracking-wider text-white/70 mb-1.5 font-medium">
                Admin Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin passcode..."
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                className="w-full px-3.5 py-3 bg-white/[0.05] border border-white/15 rounded-[3px] text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--color-gold-400)] transition-colors"
              />
              <p className="text-[10px] text-white/40 mt-1 font-light">
                Default: <code className="text-[var(--color-gold-300)]">skyhigh2026</code>
              </p>
            </div>

            <button
              type="submit"
              className="btn-editorial-gold w-full text-xs py-3.5 justify-center cursor-pointer shadow-lg mt-2"
            >
              <span>Unlock Admin Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-white/10">
            <Link
              href="/"
              className="text-xs text-white/50 hover:text-white transition-colors"
            >
              ← Back to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD
  return (
    <div className="min-h-screen bg-[var(--surface-canvas)] text-[var(--text-primary)]">
      {/* Top Admin Header */}
      <header className="bg-[#0C0B08] text-white border-b border-white/10 sticky top-0 z-40">
        <div className="container-wide py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <BrandLogo variant="dark" />
            </Link>
            <div className="hidden sm:block h-5 w-px bg-white/20" />
            <div className="hidden sm:block">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-gold-400)] font-semibold block">
                Control Panel
              </span>
              <span className="text-xs text-white/70 font-light">
                No-Database Property Manager
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadProperties}
              title="Refresh inventory"
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-[3px] transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[var(--color-gold-400)]" : ""}`} />
            </button>

            <Link
              href="/"
              target="_blank"
              className="btn-editorial-outline text-[11px] py-1.5 px-3 border-white/20 text-white hover:bg-white hover:text-black transition-colors"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="text-xs text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 px-3 py-1.5 rounded-[3px] border border-rose-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container-wide py-8 sm:py-12">
        {/* Metric Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          <div className="bg-white p-4 rounded-[3px] border border-[var(--color-stone-200)] shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-stone-400)] font-medium">
              Total Listed
            </span>
            <p className="text-2xl font-light text-[var(--color-stone-900)] mt-1 font-editorial">
              {stats.total}
            </p>
          </div>

          <div className="bg-white p-4 rounded-[3px] border border-[var(--color-stone-200)] shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-stone-400)] font-medium">
              New Projects
            </span>
            <p className="text-2xl font-light text-[var(--color-stone-900)] mt-1 font-editorial">
              {stats.newProjects}
            </p>
          </div>

          <div className="bg-white p-4 rounded-[3px] border border-[var(--color-stone-200)] shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-stone-400)] font-medium">
              Resale Flats
            </span>
            <p className="text-2xl font-light text-[var(--color-stone-900)] mt-1 font-editorial">
              {stats.resale}
            </p>
          </div>

          <div className="bg-white p-4 rounded-[3px] border border-[var(--color-stone-200)] shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-stone-400)] font-medium">
              Luxury Rent
            </span>
            <p className="text-2xl font-light text-[var(--color-stone-900)] mt-1 font-editorial">
              {stats.rent}
            </p>
          </div>

          <div className="bg-white p-4 rounded-[3px] border border-[var(--color-stone-200)] shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-[var(--color-stone-400)] font-medium">
              Land / Plots
            </span>
            <p className="text-2xl font-light text-[var(--color-stone-900)] mt-1 font-editorial">
              {stats.landPlots}
            </p>
          </div>

          <div className="bg-white p-4 rounded-[3px] border border-[var(--color-stone-200)] shadow-sm">
            <span className="text-[10px] uppercase tracking-wider text-rose-600 font-medium">
              Sold Units
            </span>
            <p className="text-2xl font-light text-rose-700 mt-1 font-editorial">
              {stats.sold}
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[var(--color-stone-300)] mb-8">
          <button
            onClick={() => setActiveTab("add")}
            className={`py-3 px-6 text-xs uppercase tracking-wider font-semibold border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === "add"
                ? "border-[var(--color-gold-500)] text-[var(--color-stone-900)]"
                : "border-transparent text-[var(--color-stone-500)] hover:text-[var(--color-stone-800)]"
            }`}
          >
            <PlusCircle className="w-4 h-4 text-[var(--color-gold-500)]" />
            <span>Add New Property</span>
          </button>

          <button
            onClick={() => setActiveTab("manage")}
            className={`py-3 px-6 text-xs uppercase tracking-wider font-semibold border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === "manage"
                ? "border-[var(--color-gold-500)] text-[var(--color-stone-900)]"
                : "border-transparent text-[var(--color-stone-500)] hover:text-[var(--color-stone-800)]"
            }`}
          >
            <Building2 className="w-4 h-4 text-[var(--color-gold-500)]" />
            <span>Manage & Remove Listings ({properties.length})</span>
          </button>
        </div>

        {/* TAB 1: ADD PROPERTY FORM */}
        {activeTab === "add" && (
          <div className="max-w-4xl bg-white rounded-[4px] border border-[var(--color-stone-200)] shadow-md p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-px bg-[var(--color-gold-500)]" />
              <p className="text-eyebrow text-[var(--color-gold-500)]">
                Direct Catalog Entry
              </p>
            </div>
            <h2 className="text-2xl font-light text-[var(--color-stone-900)] mb-2">
              Publish New Property Listing
            </h2>
            <p className="text-xs text-[var(--color-stone-600)] font-light leading-relaxed mb-8">
              Fill in the property details below. Once submitted, it immediately generates a live public page (<code className="text-stone-700 bg-stone-100 px-1 py-0.5 rounded">/properties/[slug]</code>) using the same luxury layout.
            </p>

            {formSuccess && (
              <div className="mb-8 p-5 bg-emerald-50 border border-emerald-300 rounded-[3px] text-emerald-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-emerald-900">
                      Property Published Successfully!
                    </h4>
                    <p className="text-xs text-emerald-700 font-light mt-0.5">
                      <strong>{formSuccess.title}</strong> is now live in the catalog.
                    </p>
                  </div>
                </div>

                <Link
                  href={`/properties/${formSuccess.slug}`}
                  target="_blank"
                  className="btn-editorial-gold text-xs py-2 px-4 whitespace-nowrap inline-flex items-center gap-1.5"
                >
                  <span>View Live Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {formError && (
              <div className="mb-8 p-4 bg-rose-50 border border-rose-300 rounded text-rose-700 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateProperty} className="space-y-6">
              {/* Row 1: Title & Developer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--color-stone-700)] font-medium mb-1.5">
                    Property / Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PS One10 — Signature Tower"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-900)] focus:outline-none focus:border-[var(--color-gold-500)]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--color-stone-700)] font-medium mb-1.5">
                    Developer Partner
                  </label>
                  <select
                    value={formData.developer}
                    onChange={(e) => setFormData({ ...formData, developer: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-900)] focus:outline-none focus:border-[var(--color-gold-500)] cursor-pointer"
                  >
                    {TOP_DEVELOPERS.map((dev) => (
                      <option key={dev} value={dev}>{dev}</option>
                    ))}
                    <option value="Standalone / Other">Standalone / Independent / Other</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Category, Purpose & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--color-stone-700)] font-medium mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as PropertyCategory })}
                    className="w-full px-3.5 py-2.5 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-900)] focus:outline-none focus:border-[var(--color-gold-500)] cursor-pointer"
                  >
                    <option value="new-project">New Project</option>
                    <option value="resale">Resale Flat</option>
                    <option value="rent">Luxury Rent</option>
                    <option value="land-plot">Land / Plot</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--color-stone-700)] font-medium mb-1.5">
                    Transaction Intent
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value as "buy" | "rent" })}
                    className="w-full px-3.5 py-2.5 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-900)] focus:outline-none focus:border-[var(--color-gold-500)] cursor-pointer"
                  >
                    <option value="buy">For Sale / Acquisition</option>
                    <option value="rent">For Rent / Lease</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--color-stone-700)] font-medium mb-1.5">
                    Availability Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as PropertyStatus })}
                    className="w-full px-3.5 py-2.5 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-900)] focus:outline-none focus:border-[var(--color-gold-500)] cursor-pointer"
                  >
                    <option value="available">Available</option>
                    <option value="ready-to-move">Ready to Move</option>
                    <option value="under-construction">Under Construction</option>
                    <option value="sold">Sold</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Locality & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--color-stone-700)] font-medium mb-1.5">
                    Locality / Corridor *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Newtown, Action Area I or Rajarhat Expressway"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-900)] focus:outline-none focus:border-[var(--color-gold-500)]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--color-stone-700)] font-medium mb-1.5">
                    Pricing String
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹ 1.45 Cr, ₹ 75 Lakh, or ₹ 55,000 / mo"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-900)] focus:outline-none focus:border-[var(--color-gold-500)]"
                  />
                </div>
              </div>

              {/* Row 4: Bedrooms, Bathrooms, Area */}
              {formData.category !== "land-plot" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--color-stone-700)] font-medium mb-1.5">
                      BHK Configuration
                    </label>
                    <select
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-900)] focus:outline-none focus:border-[var(--color-gold-500)] cursor-pointer"
                    >
                      <option value="1">1 BHK</option>
                      <option value="2">2 BHK</option>
                      <option value="3">3 BHK</option>
                      <option value="4">4 BHK</option>
                      <option value="5">5+ BHK / Penthouse</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--color-stone-700)] font-medium mb-1.5">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-900)] focus:outline-none focus:border-[var(--color-gold-500)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[var(--color-stone-700)] font-medium mb-1.5">
                      Super Built-Up Area (sq.ft)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 1850"
                      value={formData.areaSqft}
                      onChange={(e) => setFormData({ ...formData, areaSqft: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-900)] focus:outline-none focus:border-[var(--color-gold-500)]"
                    />
                  </div>
                </div>
              )}

              {formData.category === "land-plot" && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[var(--color-stone-700)] font-medium mb-1.5">
                    Plot Area (sq.ft / Cottahs)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 5760 (approx 8 Cottahs)"
                    value={formData.areaSqft}
                    onChange={(e) => setFormData({ ...formData, areaSqft: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-900)] focus:outline-none focus:border-[var(--color-gold-500)]"
                  />
                </div>
              )}

              {/* Row 5: Preset Photography Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[var(--color-stone-700)] font-medium mb-2">
                  Select Architectural Photography Preset
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-3">
                  {PRESET_PROPERTY_IMAGES.map((img) => (
                    <div
                      key={img.id}
                      onClick={() => setFormData({ ...formData, imageSrc: img.src, customImageSrc: "" })}
                      className={`relative aspect-[16/10] rounded-[3px] overflow-hidden border-2 cursor-pointer transition-all ${
                        formData.imageSrc === img.src && !formData.customImageSrc
                          ? "border-[var(--color-gold-500)] ring-2 ring-[var(--color-gold-400)]/30 scale-102"
                          : "border-[var(--color-stone-200)] hover:border-stone-400"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.label}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-1.5">
                        <span className="text-[9px] text-white font-medium leading-tight line-clamp-1">
                          {img.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-2">
                  <label className="block text-[11px] text-[var(--color-stone-500)] mb-1">
                    Or enter a custom image URL:
                  </label>
                  <input
                    type="text"
                    placeholder="https://... or /assets/..."
                    value={formData.customImageSrc}
                    onChange={(e) => setFormData({ ...formData, customImageSrc: e.target.value })}
                    className="w-full px-3 py-2 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-900)] focus:outline-none focus:border-[var(--color-gold-500)]"
                  />
                </div>
              </div>

              {/* Row 6: Highlights */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[var(--color-stone-700)] font-medium mb-1.5">
                  Key Amenities / Highlights (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Olympic Swimming Pool, High Speed Elevators, 100% Power Backup, Double Car Parking"
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-900)] focus:outline-none focus:border-[var(--color-gold-500)]"
                />
              </div>

              {/* Row 7: Description */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[var(--color-stone-700)] font-medium mb-1.5">
                  Full Property Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide an overview of the residence, floorplate advantages, arterial connectivity, and lifestyle offerings..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[var(--surface-canvas)] border border-[var(--color-stone-200)] rounded-[3px] text-xs text-[var(--color-stone-900)] focus:outline-none focus:border-[var(--color-gold-500)] leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[var(--color-stone-200)]">
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="btn-editorial-gold text-xs py-3.5 px-8 inline-flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                >
                  {formSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Publishing to Catalog...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>Publish Property to Live Catalog</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: MANAGE & REMOVE PROPERTIES */}
        {activeTab === "manage" && (
          <div className="space-y-6">
            {/* Filter and search toolbar */}
            <div className="bg-white p-4 rounded-[4px] border border-[var(--color-stone-200)] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter listings by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[var(--surface-canvas)] border border-stone-200 rounded-[3px] text-xs focus:outline-none focus:border-[var(--color-gold-500)]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="px-3 py-2 bg-[var(--surface-canvas)] border border-stone-200 rounded-[3px] text-xs focus:outline-none focus:border-[var(--color-gold-500)] cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="new-project">New Projects</option>
                  <option value="resale">Resale</option>
                  <option value="rent">Rent</option>
                  <option value="land-plot">Land / Plot</option>
                </select>

                <span className="text-xs text-stone-500 whitespace-nowrap">
                  Showing {filteredProperties.length} of {properties.length}
                </span>
              </div>
            </div>

            {/* Properties Table */}
            <div className="bg-white rounded-[4px] border border-[var(--color-stone-200)] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#12100C] text-white/80 border-b border-white/10 uppercase tracking-wider text-[10px]">
                      <th className="p-3.5 pl-5">Property</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Corridor</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 pr-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-stone-200)]">
                    {filteredProperties.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-stone-500 font-light">
                          No properties match your filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredProperties.map((prop) => {
                        const isSold = prop.status === "sold";

                        return (
                          <tr
                            key={prop.id}
                            className={`hover:bg-stone-50/80 transition-colors ${
                              isSold ? "bg-stone-50/60 opacity-75" : ""
                            }`}
                          >
                            {/* Property Info */}
                            <td className="p-3.5 pl-5">
                              <div className="flex items-center gap-3">
                                <div className="relative w-12 h-10 rounded-[2px] overflow-hidden bg-stone-200 flex-shrink-0">
                                  <Image
                                    src={prop.imageSrc || "/assets/sky-high/homepage/images/01-exterior-master.webp"}
                                    alt={prop.title}
                                    fill
                                    className="object-cover"
                                    sizes="48px"
                                  />
                                </div>
                                <div>
                                  <span className="font-medium text-stone-900 block leading-tight">
                                    {prop.title}
                                  </span>
                                  <span className="text-[10px] text-stone-500 font-light">
                                    {prop.developer || "Independent"} · {prop.bedrooms ? `${prop.bedrooms} BHK` : prop.type}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="p-3.5 whitespace-nowrap">
                              <span className="px-2 py-0.5 bg-stone-100 text-stone-700 text-[10px] uppercase font-medium rounded">
                                {prop.category.replace("-", " ")}
                              </span>
                            </td>

                            {/* Location */}
                            <td className="p-3.5 text-stone-600 whitespace-nowrap">
                              {prop.location}
                            </td>

                            {/* Price */}
                            <td className="p-3.5 font-editorial font-medium text-stone-900 whitespace-nowrap">
                              {prop.price || "On Request"}
                            </td>

                            {/* Status Badge */}
                            <td className="p-3.5 whitespace-nowrap">
                              {isSold ? (
                                <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-[10px] uppercase font-semibold rounded border border-rose-200">
                                  Sold
                                </span>
                              ) : prop.status === "ready-to-move" ? (
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] uppercase font-semibold rounded border border-emerald-200">
                                  Ready to Move
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] uppercase font-semibold rounded border border-amber-200">
                                  {prop.status}
                                </span>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="p-3.5 pr-5 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                {/* Toggle Sold / Available */}
                                <button
                                  type="button"
                                  onClick={() => handleToggleSold(prop)}
                                  className={`px-2.5 py-1 text-[10px] uppercase tracking-wider rounded font-medium transition-colors cursor-pointer border ${
                                    isSold
                                      ? "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                                      : "border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100"
                                  }`}
                                  title={isSold ? "Mark unit back as Available" : "Mark unit as Sold"}
                                >
                                  {isSold ? "Set Available" : "Mark Sold"}
                                </button>

                                {/* View Public Page */}
                                <Link
                                  href={`/properties/${prop.slug}`}
                                  target="_blank"
                                  className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors"
                                  title="View Public Page"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Link>

                                {/* Delete / Remove Property */}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProperty(prop.id, prop.title)}
                                  className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                                  title="Remove / Delete Property from live site"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
