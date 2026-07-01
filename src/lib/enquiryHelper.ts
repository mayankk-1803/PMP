export interface EnquiryUrlParams {
  category?: string;
  subcategory?: string;
  brand?: string;
  moq?: number | string;
}

/**
 * Centralized utility to build the Enquiry/Quote URL with prefilled parameters.
 * Avoids direct string-concatenation throughout components.
 */
export function buildEnquiryUrl({ category, subcategory, brand, moq }: EnquiryUrlParams): string {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (subcategory) params.set("subcategory", subcategory);
  if (brand) params.set("brand", brand);
  if (moq) params.set("moq", String(moq));
  return `/enquiry?${params.toString()}`;
}

/**
 * Formats a shortlisted item or preselected product details into a B2B category-based name,
 * ensuring no internal product titles are exposed.
 */
export function getShortlistItemDisplayName(item: {
  title?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
}): string {
  if (item.brand || item.subcategory || item.category) {
    const parts = [];
    if (item.brand) parts.push(item.brand);
    
    const catOrSub = item.subcategory || item.category;
    if (catOrSub) {
      // Capitalize words
      const cleaned = catOrSub.replace(/-/g, ' ');
      parts.push(cleaned.charAt(0).toUpperCase() + cleaned.slice(1));
    }
    
    return parts.join(" ");
  }
  
  if (item.title) {
    // Fallback if title is custom or fallback string
    return item.title;
  }
  
  return "Gifting Swag Item";
}
