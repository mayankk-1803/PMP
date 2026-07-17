import { corporateKitImageOrFallback } from "@/lib/kitImageMap";
const image = (id: string) => `https://images.unsplash.com/${id}?q=80&w=1000&auto=format&fit=crop`;
const folderImage = (folder: string, file: string) => `/images/${folder}/${file}`;

const hashText = (value: string) =>
  value.split("").reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 17);

const uniqueIndex = (title: string, seed: string, length: number) => {
  const lower = title.toLowerCase();
  const numbered = lower.match(/\b(\d+)\b/);
  if (numbered) return (Number(numbered[1]) - 1) % length;
  if (lower.includes("classic")) return 0 % length;
  if (lower.includes("eco")) return 1 % length;
  if (lower.includes("executive")) return 2 % length;
  if (lower.includes("premium")) return 3 % length;
  return hashText(`${title}-${seed}`) % length;
};

const pick = (pool: string[], title: string, seed: string) => pool[uniqueIndex(title, seed, pool.length)];

const POOLS = {
  keychain: [
    "/images/executivemetalkeychain.png",
    "/images/premiummetalkeychain.png",
    "/images/leatherkeychain.png",
    "/images/plastickeychain.png",
    "/images/woodenkeychain.png",
    "/images/ecoacrylickeychain.png",
  ],
  tshirt: [
    "/images/polotshirt.png",
    "/images/roundnecktshirt.png",
    "/images/classictimelesspolotshirt.png",
    "/images/tshirtblue.png",
    "/images/tshirtgreen.png",
    "/images/tshirtyellow.png",
  ],
  roundNeckTshirt: [
    folderImage("roundnecktshirt", "classicroundnecktshirt.png"),
    folderImage("roundnecktshirt", "premiumroundnecktshirt.png"),
    folderImage("roundnecktshirt", "executiveroundnecktshirt.png"),
  ],
  caps: [
    folderImage("sportscap", "classicsportcap.png"),
    folderImage("cottoncaps", "classiccottoncap.png"),
    folderImage("sportscap", "premiumsportcap.png"),
    folderImage("cottoncaps", "premiumcottoncap.png"),
  ],
  sportsCaps: [
    folderImage("sportscap", "classicsportcap.png"),
    folderImage("sportscap", "premiumsportcap.png"),
    folderImage("sportscap", "executivesportcap.png"),
  ],
  cottonCaps: [
    folderImage("cottoncaps", "classiccottoncap.png"),
    folderImage("cottoncaps", "premiumcottoncap.png"),
    folderImage("cottoncaps", "executivecottoncap.png"),
    folderImage("cottoncaps", "ecocottoncap.png"),
  ],
  backpacks: [
    folderImage("Backpacks", "1.jpg"),
    folderImage("Backpacks", "2.jpg"),
    folderImage("Backpacks", "3.jpg"),
    folderImage("Backpacks", "4.jpg"),
    folderImage("Backpacks", "5.jpg"),
    folderImage("Backpacks", "6.jpg"),
  ],
  duffel: [
    folderImage("Duffle Bags", "1.webp"),
    folderImage("Duffle Bags", "2.jpg"),
    folderImage("Duffle Bags", "3.jpg"),
    folderImage("Duffle Bags", "4.jpg"),
    folderImage("Duffle Bags", "5.webp"),
    folderImage("Duffle Bags", "6.webp"),
  ],
  laptopBags: [
    folderImage("Laptop Bags", "1.png"),
    folderImage("Laptop Bags", "2.png"),
    folderImage("Laptop Bags", "3.png"),
    folderImage("Laptop Bags", "4.png"),
    folderImage("Laptop Bags", "5.jpg"),
  ],
  slingBags: [
    folderImage("slingbags", "classicslingbag.png"),
    folderImage("slingbags", "premiumslingbag.png"),
    folderImage("slingbags", "executiveslingbag.png"),
  ],
  trolleyBags: [
    folderImage("Trolley Bags", "1.jpg"),
    folderImage("Trolley Bags", "2.jpg"),
    folderImage("Trolley Bags", "3.jpg"),
    folderImage("Trolley Bags", "4.jpg"),
    folderImage("Trolley Bags", "5.jpg"),
  ],
  notebook: [
    folderImage("Diaries", "1.jpg"),
    folderImage("Diaries", "2.jpg"),
    folderImage("Diaries", "3.jpg"),
    folderImage("Diaries", "4.jpg"),
    folderImage("Diaries", "5.jpg"),
    folderImage("Diaries", "6.jpg"),
    folderImage("Diaries", "7.jpg"),
    folderImage("Diaries", "8.jpg"),
  ],
  pens: [
    "/images/pen1.png",
    "/images/pen2.png",
    "/images/pen3.png",
    "/images/pen4.png",
    "/images/pen5.png",
  ],
  desk: [
    folderImage("Desk Organsier", "1.jpg"),
    folderImage("Desk Organsier", "2.jpg"),
    folderImage("Desk Organsier", "3.jpg"),
    folderImage("Desk Organsier", "4.jpg"),
  ],
  mousePad: [
    folderImage("Mouse pad", "General.jpg"),
    folderImage("Mouse pad", "1.jpg"),
    folderImage("Mouse pad", "2.jpg"),
    folderImage("Mouse pad", "3.jpg"),
  ],
  paperWeight: [
    folderImage("Paper Weight", "1.jpg"),
    folderImage("Paper Weight", "2.jpg"),
    folderImage("Paper Weight", "3.jpg"),
  ],
  tableMat: [
    folderImage("Table Mat", "1.jpg"),
    folderImage("Table Mat", "2.jpg"),
    folderImage("Table Mat", "3.jpg"),
    folderImage("Table Mat", "4.jpg"),
  ],
  // Drinkware — split by type for strict matching
  flasks: [
    "/images/flaskbottle.png",
    "/images/premiumvaccumflask.png",
  ],
  bottles: [
    "/images/sportsbottle.png",
    "/images/sportsbottle1.png",
    "/images/steelbottle.png",
    "/images/copperbottleset.png",
  ],
  coffeeMugs: [
    "/images/sportsbottle.png",
    "/images/flaskbottle.png",
  ],
  travelMugs: [
    "/images/flaskbottle.png",
    "/images/premiumvaccumflask.png",
  ],
  // Travel bags use Trolley Bags folder (not laptop bags)
  travelBags: [
    folderImage("Trolley Bags", "1.jpg"),
    folderImage("Trolley Bags", "2.jpg"),
    folderImage("Trolley Bags", "3.jpg"),
    folderImage("Trolley Bags", "4.jpg"),
    folderImage("Trolley Bags", "5.jpg"),
  ],
  // Women's Day — dedicated images
  womensDay: [
    "/kitsimages/womendayhamper.png",
  ],
  tech: [
    image("photo-1608043152269-423dbba4e7e1"),
    image("photo-1546435770-a3e426bf472b"),
    image("photo-1517336714731-489689fd1ca8"),
    image("photo-1527864550417-7fd91fc51a46"),
  ],
  architect: [
    image("photo-1503387762-592deb58ef4e"),
    image("photo-1517971129774-8a2b38fa128e"),
    image("photo-1618221195710-dd6b41faaea6"),
    image("photo-1542435503-956c469947f6"),
    image("photo-1517971071642-34a2d3ecc9cd"),
  ],
  fieldTools: [
    image("photo-1504307651254-35680f356dfd"),
    image("photo-1504917595217-d4dc5ebe6122"),
    image("photo-1621905252507-b35492cc74b4"),
    image("photo-1589939705384-5185137a7f0f"),
    image("photo-1558618666-fcd25c85cd64"),
  ],
  medical: [
    image("photo-1576091160550-2173dba999ef"),
    image("photo-1584515933487-779824d29309"),
    image("photo-1587854692152-cbe660dbde88"),
    image("photo-1586773860418-d37222d8fce3"),
  ],
  corporateKits: [
    image("photo-1513885535751-8b9238bd345a"),
    image("photo-1549465220-1a8b9238cd48"),
    image("photo-1513201099705-a9746e1e201f"),
    image("photo-1516321318423-f06f85e504b3"),
    image("photo-1552664730-d307ca884978"),
    image("photo-1517245386807-bb43f82c33c4"),
  ],
  hampers: [
    folderImage("Festive Hampers", "1.jpg"),
    folderImage("Festive Hampers", "2.jpg"),
    folderImage("Festive Hampers", "3.jpg"),
  ],
  diwaliHampers: [
    folderImage("Diwali Hampers", "1.jpg"),
    folderImage("Diwali Hampers", "2.jpg"),
    folderImage("Diwali Hampers", "3.jpg"),
    folderImage("Diwali Hampers", "4.jpg"),
    folderImage("Diwali Hampers", "5.jpg"),
  ],
  holiHampers: [
    folderImage("Holi Hampers", "4b4cafcfc2eac114bea36d257d45a580.jpg"),
  ],
  eidHampers: [
    folderImage("EID HAmpers", "1.jpg"),
    folderImage("EID HAmpers", "2.jpg"),
    folderImage("EID HAmpers", "3.jpg"),
    folderImage("EID HAmpers", "4.jpg"),
    folderImage("EID HAmpers", "5.jpg"),
  ],
  packaging: [
    image("photo-1586528116311-ad8dd3c8310d"),
    image("photo-1589939705384-5185137a7f0f"),
    image("photo-1607344645866-009c320c5ab8"),
    image("photo-1607082348824-0a96f2a4b9da"),
    image("photo-1607082349566-187342175e2f"),
  ],
  rigidBoxes: [
    image("photo-1512909006721-3d6018887383"),
    image("photo-1549465220-1a8b9238cd48"),
    image("photo-1513201099705-a9746e1e201f"),
    image("photo-1606220588913-b3aacb4d2f46"),
  ],
};

export const realCatalogImage = (title: string, category = "", subcategory = "", seed = title) => {
  const haystack = `${title} ${category} ${subcategory}`.toLowerCase();
  const sub = subcategory.toLowerCase();
  const ttl = title.toLowerCase();

  // ── Keychains ──────────────────────────────────────────────────────
  if (haystack.includes("keychain") || haystack.includes("key ring")) return pick(POOLS.keychain, title, seed);

  // ── T-Shirts ───────────────────────────────────────────────────────
  if (haystack.includes("round neck") || haystack.includes("crew neck")) return pick(POOLS.roundNeckTshirt, title, seed);
  if (haystack.includes("polo") || haystack.includes("t-shirt") || haystack.includes("tee")) return pick(POOLS.tshirt, title, seed);

  // ── Caps ───────────────────────────────────────────────────────────
  if (haystack.includes("sports cap") || haystack.includes("sport cap")) return pick(POOLS.sportsCaps, title, seed);
  if (haystack.includes("cotton cap")) return pick(POOLS.cottonCaps, title, seed);
  if (haystack.includes("cap")) return pick(POOLS.caps, title, seed);

  // ── Bags — strict per subcategory ─────────────────────────────────
  if (sub === "duffle-bags" || ttl.includes("duffle")) return pick(POOLS.duffel, title, seed);
  if (sub === "trolley-bags" || sub === "canvas-trolley-bags" || ttl.includes("trolley")) return pick(POOLS.trolleyBags, title, seed);
  if (sub === "sling-bags" || ttl.includes("sling bag")) return pick(POOLS.slingBags, title, seed);
  if (sub === "laptop-bags" || ttl.includes("laptop bag")) return pick(POOLS.laptopBags, title, seed);
  if (sub === "travel-bags" || ttl.includes("travel bag")) return pick(POOLS.travelBags, title, seed);
  if (sub === "backpacks" || ttl.includes("backpack")) return pick(POOLS.backpacks, title, seed);
  // Generic bag fallback (only if slug is under bags)
  if ((sub.includes("bag") || ttl.includes("bag")) && !haystack.includes("kit")) return pick(POOLS.laptopBags, title, seed);

  // ── Diaries / Notebooks ────────────────────────────────────────────
  if (haystack.includes("notebook") || haystack.includes("diary") || haystack.includes("journal") || haystack.includes("planner") || haystack.includes("folder")) return pick(POOLS.notebook, title, seed);

  // ── Pens ───────────────────────────────────────────────────────────
  if (haystack.includes("pen")) return pick(POOLS.pens, title, seed);

  // ── Table Top / Desk Accessories ───────────────────────────────────
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

  // ── Gift Sets / Packs ──────────────────────────────────────────────
  if (
    haystack.includes("gift set") ||
    haystack.includes("gift pack") ||
    haystack.includes("gift box") ||
    haystack.includes("conference")
  ) {
    return pick(POOLS.rigidBoxes, title, seed);
  }

  // ── Drinkware — strict per subcategory, NO cross-category mixing ───
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

  // ── Kits & Hampers (kept for corporate-kits page) ─────────────────
  if (
    haystack.includes("architect") ||
    haystack.includes("interior") ||
    haystack.includes("mason") ||
    haystack.includes("electrician") ||
    haystack.includes("doctor") ||
    haystack.includes("kit") ||
    haystack.includes("dealer") ||
    haystack.includes("plumber") ||
    haystack.includes("painter") ||
    haystack.includes("engineer") ||
    haystack.includes("retailer")
  ) {
    const kitImg = corporateKitImageOrFallback(title || subcategory || category);
    if (kitImg) return kitImg;
  }

  // ── Specific hampers ───────────────────────────────────────────────
  if (haystack.includes("diwali")) return pick(POOLS.diwaliHampers, title, seed);
  if (haystack.includes("holi")) return pick(POOLS.holiHampers, title, seed);
  if (haystack.includes("eid")) return pick(POOLS.eidHampers, title, seed);
  if (haystack.includes("women") || haystack.includes("woman")) return POOLS.womensDay[0];
  if (haystack.includes("christmas") || haystack.includes("new year") || haystack.includes("hamper")) {
    return pick(POOLS.hampers, title, seed);
  }

  // ── Packaging ──────────────────────────────────────────────────────
  if (haystack.includes("rigid") || haystack.includes("magnetic") || haystack.includes("luxury box")) return pick(POOLS.rigidBoxes, title, seed);
  if (haystack.includes("corrugated") || haystack.includes("shipping") || haystack.includes("carton") || haystack.includes("mono") || haystack.includes("packaging") || haystack.includes("box")) {
    return pick(POOLS.packaging, title, seed);
  }

  // ── Unknown — return empty string, never substitute another category's image ──
  return "";
};
