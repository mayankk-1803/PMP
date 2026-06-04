import { NextResponse } from "next/server";
import { getCatalogProducts } from "@/services/admin/productService";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const category = url.searchParams.get("category");
  const subcategory = url.searchParams.get("subcategory");
  const query = url.searchParams.get("q")?.toLowerCase();

  const products = (await getCatalogProducts()).filter((product) => {
    const activeFilter = subcategory || category;
    const matchesCategory = !activeFilter || activeFilter === "all" || product.category === activeFilter || product.subcategory === activeFilter;
    const matchesQuery = !query || product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  return NextResponse.json({ success: true, data: products });
}
