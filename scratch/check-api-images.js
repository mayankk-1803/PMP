const http = require("http");

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
  try {
    const result = await fetchApi(`http://localhost:3000/api/catalog/products`);
    if (!result.success) {
      console.log("API returned failure:", result);
      return;
    }
    const products = result.data;
    console.log("Total products returned:", products.length);
    
    let emptyImagesCount = 0;
    let validImagesCount = 0;
    
    products.forEach((p, idx) => {
      const primaryImage = p.featuredImage || (p.images && p.images[0]) || "";
      if (!primaryImage || primaryImage === "") {
        emptyImagesCount++;
      } else {
        validImagesCount++;
      }
    });
    
    console.log("Products with valid images:", validImagesCount);
    console.log("Products with empty/missing images:", emptyImagesCount);
    
    if (products.length > 0) {
      console.log("\nSample products with empty images (first 5):");
      const emptySamples = products.filter(p => !(p.featuredImage || (p.images && p.images[0]))).slice(0, 5);
      emptySamples.forEach(p => {
        console.log(`- ${p.title} (Category: ${p.category}, Subcategory: ${p.subcategory})`);
        console.log(`  featuredImage: "${p.featuredImage}", images:`, p.images);
      });

      console.log("\nSample products with valid images (first 5):");
      const validSamples = products.filter(p => (p.featuredImage || (p.images && p.images[0]))).slice(0, 5);
      validSamples.forEach(p => {
        console.log(`- ${p.title} (Category: ${p.category}, Subcategory: ${p.subcategory})`);
        console.log(`  featuredImage: "${p.featuredImage}", images:`, p.images);
      });
    }
  } catch (e) {
    console.error("Fetch failed:", e.message);
  }
}

run();
