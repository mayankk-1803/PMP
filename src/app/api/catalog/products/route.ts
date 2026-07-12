import { NextResponse } from "next/server";
import { getCatalogProducts, searchCatalogProducts } from "@/services/admin/productService";
import { getCanonicalKitSlug } from "@/lib/slugResolver";

export const dynamic = "force-dynamic";


export async function GET(req: Request) {
  const url = new URL(req.url);
  let category = url.searchParams.get("category");
  let subcategory = url.searchParams.get("subcategory");
  
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
    });
    return NextResponse.json({ success: true, data: result.data, pagination: result.pagination });
  }

  const products = (await getCatalogProducts()).filter((product) => {
    const activeFilter = subcategory || category;
    
    const matchSubcategory = (selected: string, productSubOrCat: string): boolean => {
      if (selected === productSubOrCat) return true;
      if (selected === "laptop-bags" && (productSubOrCat === "laptop-backpacks" || productSubOrCat === "laptop-bags")) return true;
      if (selected === "travel-bags" && (productSubOrCat === "travel-backpacks" || productSubOrCat === "travel-bags")) return true;
      if (selected === "bags" && (productSubOrCat === "backpacks-bags" || productSubOrCat === "bags")) return true;
      if (selected === "pens" && ["pens", "premium-pens", "eco-pens", "plastic-pens", "metal-pens", "executive-pens", "engraved-pens", "gift-box-pens"].includes(productSubOrCat)) return true;
      if (selected === "caps" && ["caps", "promotional-caps", "sports-caps", "cotton-caps", "baseball-caps", "event-caps", "snapback-caps"].includes(productSubOrCat)) return true;
      if (selected === "table-top" && ["table-top", "tabletop", "mouse-pad", "desk-organiser", "table-mats", "mousepad", "deskorganiser", "tablemat", "paper-weight", "paperweight", "desktop-accessories", "desktopaccessories"].includes(productSubOrCat)) return true;
      if (selected === "diaries-notebooks" && ["diaries-notebooks", "diaries", "executive-diaries", "eco-notebooks", "premium-notebooks", "notebooks", "premium-diaries", "standard-notebooks"].includes(productSubOrCat)) return true;
      return false;
    };

    const matchesCategory = 
      !activeFilter || 
      activeFilter === "all" || 
      product.category === activeFilter || 
      product.subcategory === activeFilter ||
      matchSubcategory(activeFilter, product.category) ||
      matchSubcategory(activeFilter, product.subcategory);

    const isPenQuery = query && (query.includes("pen") || query === "pens");
    const isCapQuery = query && (query.includes("cap") || query === "caps");
    const isTableTopQuery = query && (query.includes("table") || query.includes("mousepad") || query.includes("paperweight") || query.includes("organiser") || query.includes("organizer") || query.includes("tablemat") || query.includes("tabletop"));
    const isDiaryQuery = query && (query.includes("diar") || query.includes("notebook") || query.includes("diary") || query.includes("diaries"));

    const matchesQuery = 
      !query || 
      product.title.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query) || 
      product.slug.toLowerCase().includes(query) ||
      (isPenQuery && (product.category === "pens" || product.subcategory === "pens")) ||
      (isCapQuery && (product.category === "caps" || product.subcategory === "caps")) ||
      (isTableTopQuery && (product.category === "table-top" || product.subcategory === "table-top")) ||
      (isDiaryQuery && (product.category === "diaries-notebooks" || product.subcategory === "diaries-notebooks"));
      
    const matchesBrand = !brand || product.brand === brand;
    const matchesFeatured = !featured || (featured === "true" ? product.featured : !product.featured);
    return matchesCategory && matchesQuery && matchesBrand && matchesFeatured;
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
