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
    console.log("Fetching subcategories...");
    const subcats = await fetchApi(`http://localhost:3000/api/catalog/subcategories`);
    console.log("Subcategories success:", subcats.success);
    if (!subcats.success) {
      console.log("Subcategories error:", subcats);
    } else {
      console.log("Subcategories returned count:", subcats.data ? subcats.data.length : 0);
    }
  } catch (e) {
    console.error("Subcategories fetch failed:", e.message);
  }
}

run();
