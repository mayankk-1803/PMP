const { PRODUCT_HIERARCHY, PROMO_SUBCATEGORY_SLUGS } = require("../src/data/siteConfig");

console.log("PRODUCT_HIERARCHY length:", PRODUCT_HIERARCHY.length);
console.log("PROMO_SUBCATEGORY_SLUGS size:", PROMO_SUBCATEGORY_SLUGS.size);

try {
  let subCount = 0;
  for (const cat of PRODUCT_HIERARCHY[0].categories) {
    console.log("Category:", cat.name, "Slug:", cat.slug, "Subcategories:", cat.subcategories ? cat.subcategories.length : "NONE");
    if (cat.subcategories) {
      for (const sub of cat.subcategories) {
        subCount++;
        if (!sub.slug) {
          console.error("Subcategory missing slug!", sub);
        }
      }
    }
  }
  console.log("Loop completed. Total subcategories visited:", subCount);
} catch (e) {
  console.error("Error during hierarchy loop:", e);
}
