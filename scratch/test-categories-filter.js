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
  const result = await fetchApi(`http://localhost:3000/api/catalog/products`);
  if (!result.success) {
    console.error("Failed to fetch products");
    return;
  }
  const products = result.data;
  console.log("Total products:", products.length);

  // Group by category
  const categoryCounts = {};
  const subcategoryCounts = {};

  products.forEach(p => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    subcategoryCounts[p.subcategory] = (subcategoryCounts[p.subcategory] || 0) + 1;
  });

  console.log("\nProducts by category:");
  Object.keys(categoryCounts).sort().forEach(cat => {
    console.log(`- ${cat}: ${categoryCounts[cat]}`);
  });

  console.log("\nProducts by subcategory:");
  Object.keys(subcategoryCounts).sort().forEach(sub => {
    console.log(`  - ${sub}: ${subcategoryCounts[sub]}`);
  });
}

run();
