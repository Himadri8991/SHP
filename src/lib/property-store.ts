import { PropertyListing } from "@/data/properties";

export const PRESET_PROPERTY_IMAGES = [
  {
    id: "exterior",
    label: "Signature Tower Exterior",
    src: "/assets/sky-high/homepage/images/01-exterior-master.webp",
  },
  {
    id: "living",
    label: "Double-Height Living Room",
    src: "/assets/sky-high/homepage/images/02-living-room-master.webp",
  },
  {
    id: "terrace",
    label: "Panoramic Skyline Terrace",
    src: "/assets/sky-high/homepage/images/03-terrace-view-master.webp",
  },
  {
    id: "bedroom",
    label: "Master Bedroom Suite",
    src: "/assets/sky-high/homepage/images/04-master-bedroom-master.webp",
  },
  {
    id: "evening",
    label: "Twilight Architectural Facade",
    src: "/assets/sky-high/homepage/images/05-evening-exterior-master.webp",
  },
];

export async function fetchLiveProperties(): Promise<PropertyListing[]> {
  try {
    const res = await fetch("/api/properties", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch properties");
    const data = await res.json();
    return data.properties || [];
  } catch (err) {
    console.warn("Could not fetch properties from API, using fallback", err);
    return [];
  }
}

export async function createProperty(property: Partial<PropertyListing>): Promise<{ success: boolean; property?: PropertyListing; error?: string }> {
  try {
    const res = await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(property),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || "Failed to create property" };
    }
    return { success: true, property: data.property };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Network error";
    return { success: false, error: message };
  }
}

export async function updateProperty(id: string, updates: Partial<PropertyListing>): Promise<{ success: boolean; property?: PropertyListing; error?: string }> {
  try {
    const res = await fetch("/api/properties", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || "Failed to update property" };
    }
    return { success: true, property: data.property };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Network error";
    return { success: false, error: message };
  }
}

export async function deleteProperty(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/properties?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.error || "Failed to delete property" };
    }
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Network error";
    return { success: false, error: message };
  }
}
