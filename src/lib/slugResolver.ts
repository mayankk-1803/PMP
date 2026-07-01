/**
 * Centralized slug resolver for Kits & Hampers subcategories.
 * Maps legacy/URL kit query values to the canonical MongoDB subcategory slugs.
 */
export const getCanonicalKitSlug = (slug: string | null | undefined): string | undefined => {
  if (!slug) return undefined;
  
  const clean = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  // Corporate Kits mapping
  if (clean === "joining" || clean === "joiningkits") return "joining-kits";
  if (clean === "dealer" || clean === "dealerkits") return "dealer-kits";
  if (clean === "distributor" || clean === "distributorkits") return "distributor-kits";
  if (clean === "doctor" || clean === "doctorkits") return "doctor-kits";
  if (clean === "architect" || clean === "architectkits") return "architect-kits";
  if (clean === "mason" || clean === "masonkits") return "mason-kits";
  if (clean === "electrician" || clean === "electriciankits") return "electrician-kits";
  if (clean === "interiordesigner" || clean === "interiordesignerkit" || clean === "interiordesignerkits") return "interior-designer-kits";
  if (clean === "retailer" || clean === "retailerkits") return "retailer-kits";
  if (clean === "plumber" || clean === "plumberkits") return "plumber-kits";
  if (clean === "painter" || clean === "painterkits") return "painter-kits";
  if (clean === "engineer" || clean === "engineerkits") return "engineer-kits";
  
  // Festive Hampers mapping
  if (clean === "diwali" || clean === "diwalihampers") return "diwali-hampers";
  if (clean === "holi" || clean === "holihampers") return "holi-hampers";
  if (clean === "eid" || clean === "eidkits" || clean === "eidhampers") return "eid-kits";
  if (
    clean === "womens" ||
    clean === "womensday" ||
    clean === "womensdaygifts" ||
    clean === "womensdaygift" ||
    clean === "womensdayhampers" ||
    clean === "womensdayhamper" ||
    clean === "womenday" ||
    clean === "womendaygifts" ||
    clean === "womendaygift" ||
    clean === "womendayhampers" ||
    clean === "womendayhamper" ||
    clean === "woman" ||
    clean === "womansdaygifts" ||
    clean === "womansdaygift" ||
    clean === "womandaygifts" ||
    clean === "womandaygift" ||
    clean === "womensgifts" ||
    clean === "womensgift" ||
    clean === "internationalwomensday" ||
    clean === "iwd"
  ) return "womens-day-gifts";
  if (clean === "christmas" || clean === "christmaskits" || clean === "christmashampers") return "christmas-kits";
  if (clean === "newyear" || clean === "newyearhampers" || clean === "newyeargifts") return "new-year-hampers";
  
  // Default to returning the slug itself or appending suffix if it matches known patterns
  return slug;
};
