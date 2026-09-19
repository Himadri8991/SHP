import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { PropertyListing } from "@/data/properties";

const DATA_FILE = path.join(process.cwd(), "src", "data", "properties-data.json");

function readProperties(): PropertyListing[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading properties data file:", err);
  }
  return [];
}

function writeProperties(properties: PropertyListing[]): boolean {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(properties, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error writing properties data file:", err);
    return false;
  }
}

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return `${base}-${Date.now().toString().slice(-4)}`;
}

// GET: Return all properties
export async function GET() {
  const properties = readProperties();
  return NextResponse.json({
    success: true,
    total: properties.length,
    properties,
  });
}

// POST: Add a new property listing
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      developer,
      type = "apartment",
      category = "new-project",
      purpose = "buy",
      status = "available",
      location,
      price,
      bedrooms,
      bathrooms,
      areaSqft,
      description,
      imageSrc = "/assets/sky-high/homepage/images/01-exterior-master.webp",
      imageAlt,
      highlights = [],
    } = body;

    if (!title || !location) {
      return NextResponse.json(
        { success: false, error: "Title and location are required." },
        { status: 400 }
      );
    }

    const properties = readProperties();
    const slug = body.slug?.trim() || generateSlug(title);

    const newProperty: PropertyListing = {
      id: `sh-${Date.now()}`,
      title: title.trim(),
      developer: developer?.trim() || undefined,
      type,
      category,
      purpose,
      status,
      location: location.trim(),
      price: price?.trim() || null,
      bedrooms: bedrooms ? Number(bedrooms) : null,
      bathrooms: bathrooms ? Number(bathrooms) : null,
      areaSqft: areaSqft ? Number(areaSqft) : null,
      description: description?.trim() || `Luxury property located in ${location}.`,
      imageSrc: imageSrc.trim() || "/assets/sky-high/homepage/images/01-exterior-master.webp",
      imageAlt: imageAlt?.trim() || `${title} in ${location}`,
      slug,
      highlights: Array.isArray(highlights)
        ? highlights.filter(Boolean)
        : typeof highlights === "string"
        ? highlights.split(",").map((s: string) => s.trim()).filter(Boolean)
        : [],
    };

    // Prepend new listing so it appears at the top
    properties.unshift(newProperty);
    writeProperties(properties);

    return NextResponse.json({
      success: true,
      message: "Property created successfully.",
      property: newProperty,
      total: properties.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create property.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// PATCH: Update property details (e.g. toggle "sold", update price)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Property ID is required for update." },
        { status: 400 }
      );
    }

    const properties = readProperties();
    const index = properties.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: "Property not found." },
        { status: 404 }
      );
    }

    // Apply updates
    properties[index] = {
      ...properties[index],
      ...updates,
    };

    writeProperties(properties);

    return NextResponse.json({
      success: true,
      message: "Property updated successfully.",
      property: properties[index],
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update property.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

// DELETE: Remove a property by ID
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await req.json();
        id = body.id;
      } catch {}
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Property ID is required for deletion." },
        { status: 400 }
      );
    }

    const properties = readProperties();
    const initialCount = properties.length;
    const filtered = properties.filter((p) => p.id !== id);

    if (filtered.length === initialCount) {
      return NextResponse.json(
        { success: false, error: "Property with given ID not found." },
        { status: 404 }
      );
    }

    writeProperties(filtered);

    return NextResponse.json({
      success: true,
      message: "Property removed successfully.",
      deletedId: id,
      totalRemaining: filtered.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete property.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
