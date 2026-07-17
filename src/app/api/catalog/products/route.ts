import { NextResponse } from "next/server";
import { getCatalogProducts, searchCatalogProducts } from "@/services/admin/productService";
import { getCanonicalKitSlug } from "@/lib/slugResolver";

export const dynamic = "force-dynamic";


export async function GET(req: Request) {
  const url = new URL(req.url);
  let category = url.searchParams.get("category");
  let subcategory = url.searchParams.get("subcategory");
  const budget = url.searchParams.get("budget");
  
  if (category) category = getCanonicalKitSlug(category) || category;
  if (subcategory) subcategory = getCanonicalKitSlug(subcategory) || subcategory;

  const query = url.searchParams.get("q")?.toLowerCase();
  const brand = url.searchParams.get("brand");
  const featured = url.searchParams.get("featured");
  const sortBy = url.searchParams.get("sortBy") || "order";
  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
  const limit = Math.min(1000, Math.max(1, Number(url.searchParams.get("limit")) || 1000));

  if (process.env.MONGODB_URI) {
    const result = await searchCatalogProducts({
      search: query,
      category: category || undefined,
      subcategory: subcategory || undefined,
      brand: brand || undefined,
      featured: featured || undefined,
      sortBy,
      page,
      limit,
      budget: budget || undefined,
    });
    return NextResponse.json({ success: true, data: result.data, pagination: result.pagination });
  }

  let possibleBudgets: string[] = [];
  if (budget) {
    const norm = budget.toLowerCase().trim();
    if (norm.includes("under 250") || norm.includes("0-250")) {
      possibleBudgets = ["Under ₹250", "₹0–250", "0-250", "₹0–₹250"];
    } else if (norm.includes("250 - 500") || norm.includes("250-500")) {
      possibleBudgets = ["₹250 - ₹500", "₹250–500", "250-500", "₹250–₹500"];
    } else if (norm.includes("500 - 1000") || norm.includes("500-1000")) {
      possibleBudgets = ["₹500 - ₹1000", "₹500–1000", "500-1000", "₹500–₹1000"];
    } else if (norm.includes("1000 - 2500") || norm.includes("1000-2500")) {
      possibleBudgets = ["₹1000 - ₹2500", "₹1000–2500", "1000-2500", "₹1000–₹2500"];
    } else if (norm.includes("2500-5000") || norm.includes("2500 - 5000")) {
      possibleBudgets = ["₹2500+", "₹2500–5000", "2500-5000", "₹2500–₹5000"];
    } else if (norm.includes("5000") || norm.includes("5000+")) {
      possibleBudgets = ["₹2500+", "₹5000+", "5000+", "₹5000+ Premium"];
    }
  }

  const products = (await getCatalogProducts()).filter((product) => {
    const matchSubcategory = (selected: string, productSubOrCat: string): boolean => {
      if (selected === productSubOrCat) return true;
      if (selected === "laptop-bags" && (productSubOrCat === "laptop-backpacks" || productSubOrCat === "laptop-bags")) return true;
      if (selected === "travel-bags" && (productSubOrCat === "travel-backpacks" || productSubOrCat === "travel-bags")) return true;
      if (selected === "bags" && (productSubOrCat === "backpacks-bags" || productSubOrCat === "bags")) return true;
      if (selected === "pens" && ["pens", "premium-pens", "eco-pens", "plastic-pens", "metal-pens", "executive-pens", "engraved-pens", "gift-box-pens"].includes(productSubOrCat)) return true;
      if (selected === "caps" && ["caps", "promotional-caps", "sports-caps", "cotton-caps", "baseball-caps", "event-caps", "snapback-caps"].includes(productSubOrCat)) return true;
      if (selected === "table-top" && ["table-top", "tabletop", "mouse-pad", "desk-organiser", "table-mats", "mousepad", "deskorganiser", "tablemat", "paper-weight", "paperweight", "desktop-accessories", "desktopaccessories"].includes(productSubOrCat)) return true;
      if (selected === "diaries-notebooks" && ["diaries-notebooks", "diaries", "executive-diaries", "eco-notebooks", "premium-notebooks", "notebooks", "premium-diaries", "standard-notebooks"].includes(productSubOrCat)) return true;
      if (selected === "trolley-bags" && (productSubOrCat === "trolley-bags" || productSubOrCat === "canvas-trolley-bags" || productSubOrCat === "canvastrolleybags" || productSubOrCat === "canvastrolleybag")) return true;
      if (selected === "canvas-trolley-bags" && (productSubOrCat === "trolley-bags" || productSubOrCat === "canvas-trolley-bags" || productSubOrCat === "canvastrolleybags" || productSubOrCat === "canvastrolleybag")) return true;
      if (selected === "decorative" && (productSubOrCat === "decorative" || productSubOrCat === "decoratives")) return true;
      return false;
    };
 
    let matchesCategoryOrSubcategory = true;
    if (subcategory && subcategory !== "all") {
      matchesCategoryOrSubcategory = matchSubcategory(subcategory, product.subcategory);
    } else if (category && category !== "all") {
      if (category === "household-utilities") {
        matchesCategoryOrSubcategory = 
          product.category === "household-utilities" || 
          product.category === "decoratives" || 
          product.category === "decorative" || 
          ["household-utilities", "decorative", "decoratives"].includes(product.subcategory);
      } else {
        matchesCategoryOrSubcategory = 
          product.category === category || 
          product.subcategory === category ||
          matchSubcategory(category, product.category) ||
          matchSubcategory(category, product.subcategory);
      }
    }
 
    const isPenQuery = query && (query.includes("pen") || query === "pens");
    const isCapQuery = query && (query.includes("cap") || query === "caps");
    const isTableTopQuery = query && (query.includes("table") || query.includes("mousepad") || query.includes("paperweight") || query.includes("organiser") || query.includes("organizer") || query.includes("tablemat") || query.includes("tabletop"));
    const isDiaryQuery = query && (query.includes("diar") || query.includes("notebook") || query.includes("diary") || query.includes("diaries"));
    const isTrolleyQuery = query && (query.includes("trolley") || query.includes("canvastrolley"));
    const isDecorativeQuery = query && (query.includes("decorat") || query.includes("decoratives") || query.includes("decorative"));
 
    const matchesQuery = 
      !query || 
      product.title.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query) || 
      product.slug.toLowerCase().includes(query) ||
      (isPenQuery && (product.category === "pens" || product.subcategory === "pens")) ||
      (isCapQuery && (product.category === "caps" || product.subcategory === "caps")) ||
      (isTableTopQuery && (product.category === "table-top" || product.subcategory === "table-top")) ||
      (isDiaryQuery && (product.category === "diaries-notebooks" || product.subcategory === "diaries-notebooks")) ||
      (isTrolleyQuery && (product.subcategory === "trolley-bags" || product.subcategory === "canvas-trolley-bags")) ||
      (isDecorativeQuery && (product.subcategory === "decorative" || product.subcategory === "decoratives" || product.category === "decoratives" || product.category === "household-utilities"));
      
    const matchesBrand = !brand || product.brand === brand;
    const matchesFeatured = !featured || (featured === "true" ? product.featured : !product.featured);
    
    // @ts-ignore
    const matchesBudget = !budget || product.budget === budget || possibleBudgets.includes(product.budget || "") || possibleBudgets.includes(product.specifications?.budget || "");
 
    return matchesCategoryOrSubcategory && matchesQuery && matchesBrand && matchesFeatured && matchesBudget;
  });

  products.sort((a, b) => {
    if (sortBy === "name") return a.title.localeCompare(b.title);
    if (sortBy === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sortBy === "moq") return a.moq - b.moq;
    if (sortBy === "price") return (a.price || 0) - (b.price || 0);
    if (sortBy === "order") return (a.order || 0) - (b.order || 0);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const total = products.length;
  const paginated = products.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    success: true,
    data: paginated,
    pagination: {
      page,
      limit,
      total,
      pages: Math.max(1, Math.ceil(total / limit)),
    },
  });
}
