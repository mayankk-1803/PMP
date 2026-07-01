const http = require("http");
const fs = require("fs");
const path = require("path");

// Define PRODUCT_HIERARCHY manually since we cannot easily import typescript in plain node
// We will copy the slugs from siteConfig.ts to check.
const PROMO_SUBCATEGORY_SLUGS = new Set([
  // Bags
  "laptop-bags", "travel-bags", "duffle-bags", "trolley-bags", "sling-bags",
  // Drinkware
  "flasks", "bottles", "coffee-mugs", "travel-mugs",
  // Pens
  "premium-pens", "eco-pens", "gift-box-pens", "engraved-pens",
  // Keychains
  "metal-keychain", "leather-keychain", "acrylic-keychain",
  // Caps
  "promotional-caps", "sports-caps", "cotton-caps",
  // T-Shirts
  "polo-t-shirts", "crew-neck-t-shirts", "dry-fit-t-shirts", "event-t-shirts",
  // Diaries
  "executive-diaries", "leather-journals", "hardcover-notebooks", "planner-diaries",
  // Corporate Gifts
  "desk-accessories", "business-accessories", "corporate-stationery", "conference-packs",
  // Executive Gifts
  "luxury-gift-boxes", "desk-kits", "office-kits", "vip-welcome-boxes"
]);

function fetchApi(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ error: "Failed to parse JSON", raw: data });
        }
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
}

async function run() {
  const result = await fetchApi(`http://localhost:3000/api/catalog/products`);
  if (!result.success) {
    console.error("Failed to fetch products");
    return;
  }
  const products = result.data;
  
  console.log("Checking database subcategory slugs against PROMO_SUBCATEGORY_SLUGS:");
  const mismatches = new Set();
  
  products.forEach(p => {
    // Only check non-kit, non-packaging products
    if (p.category !== "corporate-kits" && p.category !== "festive-hampers" && p.category !== "packaging") {
      const isMatch = PROMO_SUBCATEGORY_SLUGS.has(p.subcategory);
      if (!isMatch) {
        mismatches.add(`${p.category} -> ${p.subcategory}`);
      }
    }
  });

  console.log("Mismatches found:", Array.from(mismatches));
}

run();
