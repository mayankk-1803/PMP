const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Load .env
try {
  const envPath = path.resolve(__dirname, "../.env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = match[2] || "";
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.substring(1, val.length - 1);
        }
        process.env[key] = val.trim();
      }
    });
  }
} catch (e) {}

// Copy generated image map data so we don't need imports
const KITSIMAGES_FILES = [
  "alldoctorkits.png",
  "architechkit3.jpeg",
  "architectkit.png",
  "architectkitcontent.png",
  "budgetarchitectkit.png",
  "budgetempluyeeonboardingkit.png",
  "budgetmasonkit.png",
  "builderkit.png",
  "cementdealerbudgetkit.png",
  "cementdealergeneralkit.png",
  "cementdealerpremiumkit.png",
  "contractorkit.png",
  "dealerkit.png",
  "dealerkitwithcontent.png",
  "differentpacking.jpeg",
  "diwalibudgethamper.png",
  "diwaligeneralhamper.png",
  "diwalihamper.png",
  "diwalipremiumhamper.png",
  "doctorbudgetkit.png",
  "doctorgeneralkit.png",
  "doctorkit1.png",
  "doctorkit2.png",
  "doctorkit3.png",
  "doctorkitcontent.png",
  "electriciankit.png",
  "electriciankit1.png",
  "engineerkit.png",
  "engineerkit1.png",
  "engineerkit2.png",
  "engineerkitcontent.png",
  "generalarchitectkit.png",
  "generalemployeeonboardingkit.png",
  "generalmasonkit.png",
  "holibudgethamper.png",
  "holikit.png",
  "holipremiumhamper.png",
  "hospitalstaffkit.png",
  "hospitalstaffkit1.png",
  "interiordesignerkit.png",
  "kitsall.png",
  "masonkit.png",
  "masonkit2.png",
  "masonkit3.png",
  "masonkit4.jpeg",
  "newjoinerkit.png",
  "newjoinerkitcontent.png",
  "painterbudgetkit.png",
  "paintergeneralkit.png",
  "painterpremiumkit.png",
  "plumberkit.png",
  "plumberkit1.png",
  "plumberkitcontent.png",
  "premiumarchitectkit.png",
  "premiumdoctorkit.png",
  "premiumemployeeonboardingkit.png",
  "premiummasonkit.png",
  "womendaybudgethamper.png",
  "womendayhamper.png",
  "womendaypremiumhamper.png"
];

const KIT_IMAGES_FILES = [];

// Reimplement helpers
const cleanString = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\//g, "")
    .replace(/['’]s/g, "")
    .replace(/womens/g, "women")
    .replace(/day/g, "")
    .replace(/gifts/g, "")
    .replace(/gift/g, "")
    .replace(/hampers/g, "")
    .replace(/hamper/g, "")
    .replace(/kits/g, "")
    .replace(/kit/g, "")
    .replace(/[^a-z0-9]/g, "");

const hashText = (value) =>
  value.split("").reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 17);

const uniqueIndex = (title, seed, length) => {
  const lower = title.toLowerCase();
  const numbered = lower.match(/\b(\d+)\b/);
  if (numbered) return (Number(numbered[1]) - 1) % length;
  return hashText(`${title}-${seed}`) % length;
};

const pick = (pool, title, seed) => pool[uniqueIndex(title, seed, pool.length)];

const getKitsAndHampersImage = (titleOrSlug) => {
  if (!titleOrSlug) return undefined;
  
  let cleanedTarget = cleanString(titleOrSlug);
  
  if (cleanedTarget.includes("joining") || cleanedTarget.includes("joiner")) {
    cleanedTarget = cleanedTarget.replace("joining", "join").replace("joiner", "join");
  }
  if (cleanedTarget.includes("retailer") || cleanedTarget.includes("distributor")) {
    cleanedTarget = cleanedTarget.replace("retailer", "dealer").replace("distributor", "dealer");
  }
  if (cleanedTarget.includes("welcome") || cleanedTarget.includes("onboarding") || cleanedTarget.includes("employee")) {
    cleanedTarget = cleanedTarget
      .replace("welcome", "onboarding")
      .replace("employee", "onboarding")
      .replace("onboarding", "onboarding");
  }
  if (cleanedTarget.includes("celebration")) {
    cleanedTarget = cleanedTarget.replace("celebration", "hamper");
  }
  if (cleanedTarget.includes("gourmet")) {
    cleanedTarget = cleanedTarget.replace("gourmet", "hamper");
  }

  const kitsImageMatch = KITSIMAGES_FILES.find((file) => {
    const cleanedFile = cleanString(file.split(".")[0]);
    return cleanedFile === cleanedTarget;
  });

  if (kitsImageMatch) {
    return `/kitsimages/${kitsImageMatch}`;
  }

  const baseTarget = cleanedTarget.replace(/\d+$/, "");
  if (baseTarget.length >= 3) {
    const kitsMatches = KITSIMAGES_FILES.filter((file) => {
      let cleanedFile = cleanString(file.split(".")[0]);
      if (cleanedFile.includes("joining") || cleanedFile.includes("joiner")) {
        cleanedFile = cleanedFile.replace("joining", "join").replace("joiner", "join");
      }
      if (cleanedFile.includes("retailer") || cleanedFile.includes("distributor")) {
        cleanedFile = cleanedFile.replace("retailer", "dealer").replace("distributor", "dealer");
      }
      if (cleanedFile.includes("welcome") || cleanedFile.includes("onboarding") || cleanedFile.includes("employee")) {
        cleanedFile = cleanedFile.replace("welcome", "onboarding").replace("employee", "onboarding");
      }
      return cleanedFile.includes(baseTarget) || baseTarget.includes(cleanedFile);
    });

    if (kitsMatches.length > 0) {
      const chosen = pick(kitsMatches, titleOrSlug, titleOrSlug);
      return `/kitsimages/${chosen}`;
    }
  }

  return undefined;
};

const corporateKitImageOrFallback = (nameOrSlug) => {
  if (!nameOrSlug) return "";
  return getKitsAndHampersImage(nameOrSlug) || "";
};

const POOLS = {
  keychain: ["/images/executivemetalkeychain.png"],
  tshirt: ["/images/polotshirt.png"],
  roundNeckTshirt: ["/images/roundnecktshirt.png"],
  caps: ["/images/cottoncaps/1.jpg"],
  sportsCaps: ["/images/sportscap/1.jpg"],
  cottonCaps: ["/images/cottoncaps/1.jpg"],
  backpacks: ["/images/Backpacks/1.jpg"],
  duffel: ["/images/Duffle Bags/1.jpg"],
  laptopBags: ["/images/Laptop Bags/1.jpg"],
  slingBags: ["/images/slingbags/1.jpg"],
  trolleyBags: ["/images/Trolley Bags/1.jpg"],
  notebook: ["/images/Diaries/1.jpg"],
  pens: ["/images/pen1.png"],
  desk: ["/images/Desk Organsier/1.jpg"],
  mousePad: ["/images/Mouse pad/1.jpg"],
  paperWeight: ["/images/Paper Weight/1.jpg"],
  tableMat: ["/images/Table Mat/1.jpg"],
  flasks: ["/images/flaskbottle.png"],
  bottles: ["/images/sportsbottle.png"],
  coffeeMugs: ["/images/sportsbottle.png", "/images/flaskbottle.png"],
  travelMugs: ["/images/flaskbottle.png"],
  travelBags: ["/images/Trolley Bags/1.jpg"],
  womensDay: ["/kitsimages/womendayhamper.png"],
  diwaliHampers: ["/images/Diwali Hampers/1.jpg"],
  holiHampers: ["/images/Holi Hampers/1.jpg"],
  eidHampers: ["/images/EID HAmpers/1.jpg"],
  hampers: ["/images/Festive Hampers/1.jpg"],
  rigidBoxes: ["/images/pacmyproductlogos.png"],
  packaging: ["/images/pacmyproductlogos.png"]
};

const realCatalogImage = (title, category = "", subcategory = "", seed = title) => {
  const haystack = `${title} ${category} ${subcategory}`.toLowerCase();
  const sub = subcategory.toLowerCase();
  const ttl = title.toLowerCase();
  
  if (haystack.includes("keychain") || haystack.includes("key ring")) return pick(POOLS.keychain, title, seed);
  if (haystack.includes("round neck") || haystack.includes("crew neck")) return pick(POOLS.roundNeckTshirt, title, seed);
  if (haystack.includes("polo") || haystack.includes("t-shirt") || haystack.includes("tee")) return pick(POOLS.tshirt, title, seed);
  if (haystack.includes("sports cap") || haystack.includes("sport cap")) return pick(POOLS.sportsCaps, title, seed);
  if (haystack.includes("cotton cap")) return pick(POOLS.cottonCaps, title, seed);
  if (haystack.includes("cap")) return pick(POOLS.caps, title, seed);
  if (sub === "duffle-bags" || ttl.includes("duffle")) return pick(POOLS.duffel, title, seed);
  if (sub === "trolley-bags" || ttl.includes("trolley")) return pick(POOLS.trolleyBags, title, seed);
  if (sub === "sling-bags" || ttl.includes("sling bag")) return pick(POOLS.slingBags, title, seed);
  if (sub === "laptop-bags" || ttl.includes("laptop bag")) return pick(POOLS.laptopBags, title, seed);
  if (sub === "travel-bags" || ttl.includes("travel bag")) return pick(POOLS.travelBags, title, seed);
  if (sub === "backpacks" || ttl.includes("backpack")) return pick(POOLS.backpacks, title, seed);
  if ((sub.includes("bag") || ttl.includes("bag")) && !haystack.includes("kit")) return pick(POOLS.laptopBags, title, seed);
  
  if (haystack.includes("notebook") || haystack.includes("diary") || haystack.includes("journal") || haystack.includes("planner") || haystack.includes("folder")) return pick(POOLS.notebook, title, seed);
  if (haystack.includes("pen")) return pick(POOLS.pens, title, seed);
  
  if (haystack.includes("mouse pad") || haystack.includes("mousepad")) return pick(POOLS.mousePad, title, seed);
  if (haystack.includes("paper weight") || haystack.includes("paperweight")) return pick(POOLS.paperWeight, title, seed);
  if (haystack.includes("table mat") || haystack.includes("desk mat")) return pick(POOLS.tableMat, title, seed);
  if (
    haystack.includes("desk") ||
    haystack.includes("office") ||
    haystack.includes("corporate") ||
    haystack.includes("holder") ||
    haystack.includes("dock") ||
    haystack.includes("charging") ||
    haystack.includes("organizer") ||
    haystack.includes("organiser") ||
    haystack.includes("calendar")
  ) {
    return pick(POOLS.desk, title, seed);
  }

  if (
    haystack.includes("gift set") ||
    haystack.includes("gift pack") ||
    haystack.includes("gift box") ||
    haystack.includes("conference")
  ) {
    return pick(POOLS.rigidBoxes, title, seed);
  }

  if (sub === "flasks" || ttl.includes("flask") || ttl.includes("vacuum flask") || ttl.includes("vaccum flask")) {
    return pick(POOLS.flasks, title, seed);
  }
  if (sub === "coffee-mugs" || ttl.includes("coffee mug") || ttl.includes("ceramic mug") || ttl.includes("tea mug")) {
    return pick(POOLS.coffeeMugs, title, seed);
  }
  if (sub === "travel-mugs" || ttl.includes("travel mug") || ttl.includes("tumbler")) {
    return pick(POOLS.travelMugs, title, seed);
  }
  if (sub === "bottles" || ttl.includes("bottle") || ttl.includes("sipper")) {
    return pick(POOLS.bottles, title, seed);
  }
  
  if (
    haystack.includes("architect") || haystack.includes("interior") ||
    haystack.includes("mason") || haystack.includes("contractor") || haystack.includes("electrician") ||
    haystack.includes("doctor") || haystack.includes("hospital") || haystack.includes("pharma") ||
    haystack.includes("kit") || haystack.includes("dealer") || haystack.includes("distributor") ||
    haystack.includes("partner") || haystack.includes("sales") || haystack.includes("plumber") ||
    haystack.includes("painter") || haystack.includes("engineer") || haystack.includes("retailer")
  ) {
    const kitImg = corporateKitImageOrFallback(title || subcategory || category);
    if (kitImg) return kitImg;
  }
  
  if (haystack.includes("diwali")) return pick(POOLS.diwaliHampers, title, seed);
  if (haystack.includes("holi")) return pick(POOLS.holiHampers, title, seed);
  if (haystack.includes("eid")) return pick(POOLS.eidHampers, title, seed);
  if (haystack.includes("women") || haystack.includes("woman")) return POOLS.womensDay[0];
  if (haystack.includes("christmas") || haystack.includes("new year") || haystack.includes("hamper")) {
    return pick(POOLS.hampers, title, seed);
  }

  if (haystack.includes("rigid") || haystack.includes("magnetic") || haystack.includes("luxury box")) return pick(POOLS.rigidBoxes, title, seed);
  if (haystack.includes("corrugated") || haystack.includes("shipping") || haystack.includes("carton") || haystack.includes("mono") || haystack.includes("packaging") || haystack.includes("box")) {
    return pick(POOLS.packaging, title, seed);
  }
  
  return "";
};

const resolveProductImage = (product) => {
  const titleStr = product.title || product.name || "";
  const dbImage =
    product.featuredImage ||
    product.featuredImageUrl ||
    product.imageUrl ||
    product.image ||
    (product.images && product.images[0]) ||
    (product.galleryImages && product.galleryImages[0]) ||
    "";

  if (dbImage) return dbImage;

  return realCatalogImage(titleStr, product.category || "", product.subcategory || "", product.slug || titleStr);
};

const mapMongoProduct = (product) => {
  const title = product.name || product.title || "";
  const category = product.category || "";
  const subcategory = product.subcategory || "";
  
  const matchedImage = resolveProductImage({
    title,
    name: product.name,
    featuredImage: product.featuredImage,
    featuredImageUrl: product.featuredImageUrl,
    image: product.image,
    images: product.images,
    galleryImages: product.galleryImages,
    category,
    subcategory,
    slug: product.slug
  });

  const sourceImages = (product.galleryImages?.length
    ? product.galleryImages
    : product.images?.length
      ? product.images
      : product.featuredImage
        ? [product.featuredImage]
        : []
  ).filter(Boolean);
  
  const images = [matchedImage, ...sourceImages].filter((image, index, self) => image && self.indexOf(image) === index);
  const finalFeaturedImage = matchedImage || images[0] || "";

  return {
    title,
    category,
    subcategory,
    featuredImage: finalFeaturedImage,
    images
  };
};

async function run() {
  const ProductSchema = new mongoose.Schema({}, { strict: false });
  const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema, "products");

  await mongoose.connect(process.env.MONGODB_URI);
  const rawProducts = await ProductModel.find({ status: "PUBLISHED", isDeleted: { $ne: true } }).lean();
  console.log("Total published products in DB:", rawProducts.length);

  let missingCount = 0;
  let successCount = 0;

  const mapped = rawProducts.map(mapMongoProduct);
  mapped.forEach((p) => {
    if (!p.featuredImage) {
      missingCount++;
      console.log(`- MISSING: "${p.title}" (Category: ${p.category}, Subcategory: ${p.subcategory})`);
    } else {
      successCount++;
    }
  });

  console.log("\n--- Direct Verification Summary ---");
  console.log("Products with resolved images:", successCount);
  console.log("Products with missing images:", missingCount);

  if (missingCount === 0) {
    console.log("SUCCESS: 100% of products have successfully resolved images!");
  } else {
    console.log("FAILURE: Some products are still missing images.");
  }

  process.exit(missingCount === 0 ? 0 : 1);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
