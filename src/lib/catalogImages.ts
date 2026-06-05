const image = (id: string) => `https://images.unsplash.com/${id}?q=80&w=1000&auto=format&fit=crop`;
const unsplashPhoto = (id: string) => `https://unsplash.com/photos/${id}/download?force=true&w=1000`;
const pexelsPhoto = (id: string) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1000`;

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
    unsplashPhoto("dKRNe47ror4"),
    unsplashPhoto("LkbMO84Weiw"),
    unsplashPhoto("QB3-E0GEBIw"),
    unsplashPhoto("7ApjiItz0co"),
  ],
  tshirt: [
    image("photo-1521572163474-6864f9cf17ab"),
    image("photo-1503341504253-dff4815485f1"),
    image("photo-1523381294911-8d3cead13475"),
    image("photo-1489987707025-afc232f7ea0f"),
  ],
  caps: [
    pexelsPhoto("20316377"),
    image("photo-1588850561407-ed78c282e89b"),
    image("photo-1521369909029-2afed882baee"),
    pexelsPhoto("6059961"),
  ],
  backpacks: [
    pexelsPhoto("16359254"),
    pexelsPhoto("593157"),
    image("photo-1553062407-98eeb64c6a62"),
    image("photo-1622560480605-d83c853bc5c3"),
  ],
  duffel: [
    pexelsPhoto("13872590"),
    pexelsPhoto("8412790"),
    pexelsPhoto("9582664"),
    pexelsPhoto("14037876"),
  ],
  laptopBags: [
    image("photo-1553062407-98eeb64c6a62"),
    image("photo-1622560480605-d83c853bc5c3"),
    image("photo-1589394815804-964ed0be2eb5"),
  ],
  notebook: [
    image("photo-1531346878377-a5be20888e57"),
    image("photo-1517842645767-c639042777db"),
    image("photo-1457369804613-52c61a468e7d"),
    image("photo-1517971129774-8a2b38fa128e"),
  ],
  pens: [
    image("photo-1585336261022-680e295ce3fe"),
    image("photo-1455390582262-044cdead277a"),
    image("photo-1583485088034-697b5bc54ccd"),
    image("photo-1569003339405-ea396a5a8a90"),
  ],
  desk: [
    image("photo-1542744094-3a31f103e35f"),
    image("photo-1516321318423-f06f85e504b3"),
    image("photo-1527443224154-c4a3942d3acf"),
    image("photo-1501139083538-0139583c060f"),
  ],
  drinkware: [
    image("photo-1602143407151-7111542de6e8"),
    image("photo-1523362628745-0c100150b504"),
    image("photo-1605276374104-dee2a0ed3cd6"),
    image("photo-1564507004663-b6dfb3c824d5"),
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
    image("photo-1599599810769-bcde5a160d32"),
    image("photo-1603006905003-be475563bc59"),
    image("photo-1549465220-1a8b9238cd48"),
    image("photo-1513885535751-8b9238bd345a"),
    image("photo-1606220588913-b3aacb4d2f46"),
    image("photo-1506784983877-45594efa4cbe"),
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

  if (haystack.includes("keychain") || haystack.includes("key ring")) return pick(POOLS.keychain, title, seed);
  if (haystack.includes("polo") || haystack.includes("t-shirt") || haystack.includes("tee")) return pick(POOLS.tshirt, title, seed);
  if (haystack.includes("cap")) return pick(POOLS.caps, title, seed);
  if (haystack.includes("duffel")) return pick(POOLS.duffel, title, seed);
  if (haystack.includes("backpack")) return pick(POOLS.backpacks, title, seed);
  if (haystack.includes("laptop bag") || haystack.includes("tote") || haystack.includes("bag")) return pick(POOLS.laptopBags, title, seed);
  if (haystack.includes("notebook") || haystack.includes("diary") || haystack.includes("journal") || haystack.includes("planner")) return pick(POOLS.notebook, title, seed);
  if (haystack.includes("pen")) return pick(POOLS.pens, title, seed);
  if (haystack.includes("desk organizer") || haystack.includes("calendar") || haystack.includes("paper weight")) return pick(POOLS.desk, title, seed);
  if (haystack.includes("bottle") || haystack.includes("flask") || haystack.includes("tumbler") || haystack.includes("mug")) return pick(POOLS.drinkware, title, seed);
  if (haystack.includes("speaker") || haystack.includes("earbud") || haystack.includes("charger") || haystack.includes("usb")) return pick(POOLS.tech, title, seed);

  if (haystack.includes("architect") || haystack.includes("interior")) return pick(POOLS.architect, title, seed);
  if (haystack.includes("mason") || haystack.includes("contractor") || haystack.includes("electrician")) return pick(POOLS.fieldTools, title, seed);
  if (haystack.includes("doctor") || haystack.includes("hospital") || haystack.includes("pharma")) return pick(POOLS.medical, title, seed);
  if (haystack.includes("kit") || haystack.includes("dealer") || haystack.includes("distributor") || haystack.includes("partner") || haystack.includes("sales")) {
    return pick(POOLS.corporateKits, title, seed);
  }

  if (haystack.includes("diwali") || haystack.includes("holi") || haystack.includes("eid") || haystack.includes("christmas") || haystack.includes("new year") || haystack.includes("hamper") || haystack.includes("gift")) {
    return pick(POOLS.hampers, title, seed);
  }

  if (haystack.includes("rigid") || haystack.includes("magnetic") || haystack.includes("luxury box")) return pick(POOLS.rigidBoxes, title, seed);
  if (haystack.includes("corrugated") || haystack.includes("shipping") || haystack.includes("carton") || haystack.includes("mono") || haystack.includes("packaging") || haystack.includes("box")) {
    return pick(POOLS.packaging, title, seed);
  }

  return pick(POOLS.corporateKits, title, seed);
};
