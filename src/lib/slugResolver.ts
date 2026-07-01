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
  if (clean === "doctor" || clean === "doctorkits") return "doctor-kits";
  if (clean === "architect" || clean === "architectkits") return "architect-kits";
  if (clean === "mason" || clean === "masonkits") return "mason-kits";
  if (clean === "electrician" || clean === "electriciankits") return "electrician-kits";
  if (clean === "interiordesigner" || clean === "interiordesignerkit" || clean === "interiordesignerkits") return "interior-designer-kits";
  if (clean === "plumber" || clean === "plumberkits") return "plumber-kits";
  if (clean === "retailer" || clean === "retailerkits") return "retailer-kits";
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

/**
 * Centralized category slug resolver.
 * Maps dynamic/database category slug variations to the canonical slugs.
 */
export const getCanonicalCategorySlug = (slug: string | null | undefined): string => {
  if (!slug) return "";
  const clean = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  if (clean === "bags" || clean === "backpacksbags" || clean === "backpackbags") {
    return "bags";
  }
  if (clean === "diaries" || clean === "diariesnotebooks") {
    return "diaries-notebooks";
  }
  if (clean === "tabletop" || clean === "tabletopitems") {
    return "table-top";
  }
  if (clean === "paperweight") {
    return "paper-weight";
  }
  
  return slug;
};

/**
 * Centralized category name resolver.
 * Maps dynamic/database category names to their canonical display names.
 */
export const getCanonicalCategoryName = (name: string | null | undefined): string => {
  if (!name) return "";
  const clean = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  if (clean === "bags" || clean === "backpacksbags" || clean === "backpackbags") {
    return "Bags";
  }
  if (clean === "diaries" || clean === "diariesnotebooks") {
    return "Diaries / Notebooks";
  }
  if (clean === "tabletop" || clean === "tabletopitems") {
    return "Table Top";
  }
  if (clean === "paperweight") {
    return "Paper Weight";
  }
  
  return name;
};

/**
 * Centralized subcategory slug resolver.
 * Maps dynamic/database subcategory slug variations to the canonical slugs.
 */
export const getCanonicalSubcategorySlug = (slug: string | null | undefined): string => {
  if (!slug) return "";
  const clean = slug.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  // Bags subcategories
  if (clean === "laptopbackpack" || clean === "laptopbackpacks" || clean === "laptopbag" || clean === "laptopbags") {
    return "laptop-bags";
  }
  if (clean === "travelbackpack" || clean === "travelbackpacks" || clean === "travelbag" || clean === "travelbags") {
    return "travel-bags";
  }
  if (clean === "duffelbag" || clean === "duffelbags" || clean === "dufflebag" || clean === "dufflebags" || clean === "duffel" || clean === "duffle") {
    return "duffle-bags";
  }
  if (clean === "trolleybag" || clean === "trolleybags") {
    return "trolley-bags";
  }
  if (clean === "slingbag" || clean === "slingbags") {
    return "sling-bags";
  }
  if (clean === "conferencebag" || clean === "conferencebags") {
    return "conference-bags";
  }
  if (clean === "totebag" || clean === "totebags") {
    return "tote-bags";
  }

  // Caps subcategories
  if (clean === "baseballcap" || clean === "baseballcaps" || clean === "eventcap" || clean === "eventcaps" || clean === "snapbackcap" || clean === "snapbackcaps" || clean === "promotionalcap" || clean === "promotionalcaps") {
    return "promotional-caps";
  }
  if (clean === "sportscap" || clean === "sportscaps" || clean === "cottoncap" || clean === "cottoncaps") {
    return "cotton-caps";
  }

  // Table Top subcategories
  if (clean === "mousepad" || clean === "mousepadsub" || clean === "mousepads") {
    return "mouse-pad";
  }
  if (clean === "deskorganiser" || clean === "deskorganizersub" || clean === "deskorganisers" || clean === "deskorganizer" || clean === "deskorganizersub" || clean === "deskorganizers") {
    return "desk-organiser";
  }
  if (clean === "tablemat" || clean === "tablematssub" || clean === "tablemats") {
    return "table-mats";
  }

  // Paper Weight
  if (clean === "paperweight" || clean === "paperweightsub") {
    return "paper-weight-sub";
  }

  // Diaries / Notebooks
  if (clean === "executivediary" || clean === "executivediaries") {
    return "executive-diaries";
  }
  if (clean === "premiumdiary" || clean === "premiumdiaries") {
    return "premium-diaries";
  }
  if (clean === "econotebook" || clean === "econotebooks") {
    return "eco-notebooks";
  }
  if (clean === "standardnotebook" || clean === "standardnotebooks") {
    return "standard-notebooks";
  }

  // Festive Hampers
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

  return slug;
};

/**
 * Centralized subcategory name resolver.
 * Maps dynamic/database subcategory names to their canonical display names.
 */
export const getCanonicalSubcategoryName = (name: string | null | undefined): string => {
  if (!name) return "";
  const clean = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Bags subcategories
  if (clean === "laptopbackpack" || clean === "laptopbackpacks" || clean === "laptopbag" || clean === "laptopbags") {
    return "Laptop Bags";
  }
  if (clean === "travelbackpack" || clean === "travelbackpacks" || clean === "travelbag" || clean === "travelbags") {
    return "Travel Bags";
  }
  if (clean === "duffelbag" || clean === "duffelbags" || clean === "dufflebag" || clean === "dufflebags" || clean === "duffel" || clean === "duffle") {
    return "Duffle Bags";
  }
  if (clean === "trolleybag" || clean === "trolleybags") {
    return "Trolley Bags";
  }
  if (clean === "slingbag" || clean === "slingbags") {
    return "Sling Bags";
  }
  if (clean === "conferencebag" || clean === "conferencebags") {
    return "Conference Bags";
  }
  if (clean === "totebag" || clean === "totebags") {
    return "Tote Bags";
  }

  // Caps subcategories
  if (clean === "baseballcap" || clean === "baseballcaps" || clean === "eventcap" || clean === "eventcaps" || clean === "snapbackcap" || clean === "snapbackcaps" || clean === "promotionalcap" || clean === "promotionalcaps") {
    return "Promotional Caps";
  }
  if (clean === "sportscap" || clean === "sportscaps" || clean === "cottoncap" || clean === "cottoncaps") {
    return "Cotton Caps";
  }

  // Table Top subcategories
  if (clean === "mousepad" || clean === "mousepadsub" || clean === "mousepads") {
    return "Mouse Pad";
  }
  if (clean === "deskorganiser" || clean === "deskorganizersub" || clean === "deskorganisers" || clean === "deskorganizer" || clean === "deskorganizersub" || clean === "deskorganizers") {
    return "Desk Organiser";
  }
  if (clean === "tablemat" || clean === "tablematssub" || clean === "tablemats") {
    return "Table Mats";
  }

  // Paper Weight
  if (clean === "paperweight" || clean === "paperweightsub") {
    return "Paper Weight";
  }

  // Diaries / Notebooks
  if (clean === "executivediary" || clean === "executivediaries") {
    return "Executive Diaries";
  }
  if (clean === "premiumdiary" || clean === "premiumdiaries") {
    return "Premium Diaries";
  }
  if (clean === "econotebook" || clean === "econotebooks") {
    return "Eco Notebooks";
  }
  if (clean === "standardnotebook" || clean === "standardnotebooks") {
    return "Standard Notebooks";
  }

  // Festive Hampers
  if (clean === "diwali" || clean === "diwalihampers") return "Diwali Hampers";
  if (clean === "holi" || clean === "holihampers") return "Holi Hampers";
  if (clean === "eid" || clean === "eidkits" || clean === "eidhampers") return "Eid Kits";
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
  ) return "Women's Day Gifts";
  if (clean === "christmas" || clean === "christmaskits" || clean === "christmashampers") return "Christmas Kits";
  if (clean === "newyear" || clean === "newyearhampers" || clean === "newyeargifts") return "New Year Hampers";

  return name;
};

/**
 * Centralized category slug aliases.
 * Returns all equivalent database category slugs for a given category slug.
 */
export const getCategorySlugAliases = (slug: string | null | undefined): string[] => {
  if (!slug) return [];
  const canon = getCanonicalCategorySlug(slug);
  if (canon === "bags") {
    return ["bags", "backpacks-bags", "backpack-bags"];
  }
  if (canon === "diaries-notebooks") {
    return ["diaries-notebooks", "diaries"];
  }
  if (canon === "table-top") {
    return ["table-top", "tabletop"];
  }
  if (canon === "paper-weight") {
    return ["paper-weight", "paperweight"];
  }
  return [slug, canon].filter((v, i, a) => a.indexOf(v) === i);
};

/**
 * Centralized subcategory slug aliases.
 * Returns all equivalent database subcategory slugs for a given subcategory slug.
 */
export const getSubcategorySlugAliases = (slug: string | null | undefined): string[] => {
  if (!slug) return [];
  const canon = getCanonicalSubcategorySlug(slug);
  
  if (canon === "laptop-bags") {
    return ["laptop-bags", "laptop-backpacks"];
  }
  if (canon === "travel-bags") {
    return ["travel-bags", "travel-backpacks"];
  }
  if (canon === "duffle-bags") {
    return ["duffle-bags", "duffel-bags", "duffel-bag", "duffle-bag"];
  }
  if (canon === "trolley-bags") {
    return ["trolley-bags", "trolleybag", "trolleybags"];
  }
  if (canon === "sling-bags") {
    return ["sling-bags", "slingbag", "slingbags"];
  }
  if (canon === "promotional-caps") {
    return ["promotional-caps", "baseball-caps", "event-caps", "snapback-caps"];
  }
  if (canon === "cotton-caps") {
    return ["cotton-caps", "sports-caps"];
  }
  if (canon === "mouse-pad") {
    return ["mouse-pad", "mouse-pad-sub", "mousepad"];
  }
  if (canon === "desk-organiser") {
    return ["desk-organiser", "desk-organiser-sub", "deskorganiser", "desk-organizer", "desk-organizer-sub", "deskorganizer"];
  }
  if (canon === "table-mats") {
    return ["table-mats", "table-mats-sub", "tablemat"];
  }
  if (canon === "paper-weight-sub") {
    return ["paper-weight-sub", "paperweight", "paperweightsub"];
  }
  if (canon === "executive-diaries") {
    return ["executive-diaries", "executivediary", "executivediaries"];
  }
  if (canon === "premium-diaries") {
    return ["premium-diaries", "premiumdiary", "premiumdiaries"];
  }
  if (canon === "eco-notebooks") {
    return ["eco-notebooks", "econotebook", "econotebooks"];
  }
  if (canon === "standard-notebooks") {
    return ["standard-notebooks", "standardnotebook", "standardnotebooks"];
  }
  
  return [slug, canon].filter((v, i, a) => a.indexOf(v) === i);
};


