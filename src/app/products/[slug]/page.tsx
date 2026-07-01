import { redirect } from "next/navigation";
import { getCatalogProductBySlug } from "@/services/admin/productService";
import { buildEnquiryUrl } from "@/lib/enquiryHelper";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  try {
    const product = await getCatalogProductBySlug(slug);
    if (product) {
      const redirectUrl = buildEnquiryUrl({
        category: product.category,
        subcategory: product.subcategory,
        brand: product.brand,
        moq: product.moq,
      });
      redirect(redirectUrl);
    }
  } catch (error) {
    console.error("Redirect error in product details page:", error);
  }
  
  redirect("/enquiry");
}
