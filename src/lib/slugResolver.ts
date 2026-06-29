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
  if (clean === "contractor" || clean === "contractorkits") return "contractor-kits";
  if (clean === "mason" || clean === "masonkits") return "mason-kits";
  if (clean === "electrician" || clean === "electriciankits") return "electrician-kits";
  if (clean === "interiordesigner" || clean === "interiordesignerkit" || clean === "interiordesignerkits") return "interior-designer-kits";
  if (clean === "pharma" || clean === "pharmarepresentative" || clean === "pharmarepresentativekits") return "pharma-representative-kits";
  if (clean === "hospitalstaff" || clean === "hospital" || clean === "hospitalstaffkits") return "hospital-staff-kits";
  if (clean === "channelpartner" || clean === "channelpartnerkits" || clean === "retail") return "channel-partner-kits";
  if (clean === "training" || clean === "trainingkits") return "training-kits";
  if (clean === "seminar" || clean === "seminarkits") return "seminar-kits";
  if (clean === "startuponboarding" || clean === "startupemployeeonboarding" || clean === "startupemployeeonboardingkits") return "startup-employee-onboarding-kits";
  if (clean === "employeewelcome" || clean === "employeewelcomekit" || clean === "employeewelcomekits") return "employee-welcome-kits";
  if (clean === "leadership" || clean === "leadershipkits") return "leadership-kits";
  if (clean === "executive" || clean === "executivekits") return "executive-kits";
  if (clean === "remoteonboarding" || clean === "remoteonboardingkits") return "remote-onboarding-kits";
  if (clean === "partner" || clean === "partnerkits") return "partner-kits";
  if (clean === "sales" || clean === "salesteam" || clean === "salesteamkits") return "sales-team-kits";
  if (clean === "realestate" || clean === "realestatekits" || clean === "realestatebuilderkit") return "real-estate-kits";
  if (clean === "plumber" || clean === "plumberkits") return "plumber-kits";
  
  // Festive Hampers mapping
  if (clean === "diwali" || clean === "diwalihampers") return "diwali-hampers";
  if (clean === "holi" || clean === "holihampers") return "holi-hampers";
  if (clean === "eid" || clean === "eidkits" || clean === "eidhampers") return "eid-kits";
  if (clean === "womens" || clean === "womensday" || clean === "womensdaygifts" || clean === "womensdayhampers") return "womens-day-gifts";
  if (clean === "christmas" || clean === "christmaskits" || clean === "christmashampers") return "christmas-kits";
  if (clean === "newyear" || clean === "newyearhampers" || clean === "newyeargifts") return "new-year-hampers";
  if (clean === "celebration" || clean === "corporatecelebration" || clean === "corporatecelebrationhampers") return "corporate-celebration-hampers";
  if (clean === "welcome" || clean === "welcomehampers") return "welcome-hampers";
  if (clean === "luxury" || clean === "luxuryhampers") return "luxury-hampers";
  if (clean === "premiumgourmet" || clean === "premiumgourmethampers") return "premium-gourmet-hampers";
  if (clean === "dryfruit" || clean === "dryfruithampers") return "dry-fruit-hampers";
  if (clean === "teacoffee" || clean === "teacoffeehampers") return "tea-coffee-hampers";
  
  // Default to returning the slug itself or appending suffix if it matches known patterns
  return slug;
};
