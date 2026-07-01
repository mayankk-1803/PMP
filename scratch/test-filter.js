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
    console.log("Failed to fetch products");
    return;
  }
  const products = result.data;
  console.log("Total API products:", products.length);

  // Let's test the filtering logic with selectedCategory = "all"
  const selectedCategory = "all";
  const selectedBudget = "all";
  const searchQuery = "";

  const filtered = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory || product.subcategory === selectedCategory;
    const matchesBudget = selectedBudget === "all";
    const matchesSearch = 
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBudget && matchesSearch;
  });

  console.log("Filtered products (selectedCategory='all'):", filtered.length);

  // Let's print categories and subcategories of these products
  const cats = new Set();
  const subcats = new Set();
  products.forEach(p => {
    cats.add(p.category);
    subcats.add(p.subcategory);
  });
  console.log("Unique categories in API:", Array.from(cats));
  console.log("Unique subcategories in API:", Array.from(subcats));
}

run();
