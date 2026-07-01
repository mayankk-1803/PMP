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
      if (selected === "promotional-caps" && (productSubOrCat === "baseball-caps" || productSubOrCat === "event-caps" || productSubOrCat === "snapback-caps" || productSubOrCat === "promotional-caps")) return true;
      if (selected === "cotton-caps" && (productSubOrCat === "cotton-caps" || productSubOrCat === "sports-caps")) return true;
      return false;
    };

    const matchesCategory = 
      !activeFilter || 
      activeFilter === "all" || 
      product.category === activeFilter || 
      product.subcategory === activeFilter ||
      matchSubcategory(activeFilter, product.category) ||
      matchSubcategory(activeFilter, product.subcategory);

    const matchesQuery = !query || product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query) || product.slug.toLowerCase().includes(query);
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
