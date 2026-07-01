import { KIT_IMAGES_FILES, KITSIMAGES_FILES } from "./generatedImageMap";

export const DEFAULT_KIT_IMAGE = "";
export const DEFAULT_HAMPER_IMAGE = "";

const cleanString = (value: string) =>
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

const hashText = (value: string): number =>
  value.split("").reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 17);

const uniqueIndex = (title: string, seed: string, length: number): number => {
  const lower = title.toLowerCase();
  const numbered = lower.match(/\b(\d+)\b/);
  if (numbered) return (Number(numbered[1]) - 1) % length;
  return hashText(`${title}-${seed}`) % length;
};

const pick = (pool: string[], title: string, seed: string): string =>
  pool[uniqueIndex(title, seed, pool.length)];

export const getKitsAndHampersImage = (titleOrSlug: string): string | undefined => {
  if (!titleOrSlug) return undefined;
  
  let cleanedTarget = cleanString(titleOrSlug);
  
  // Normalization maps
  if (cleanedTarget.includes("joining") || cleanedTarget.includes("joiner")) {
    cleanedTarget = cleanedTarget.replace("joining", "join").replace("joiner", "join");
  }
  if (cleanedTarget.includes("retailer")) {
    cleanedTarget = cleanedTarget.replace("retailer", "dealer");
  }

  // 1. Try to find a match in the primary "public/kit images/" folder
  const kitImageMatch = KIT_IMAGES_FILES.find((file) => {
    const cleanedFile = cleanString(file.split(".")[0]);
    return (
      cleanedFile === cleanedTarget ||
      cleanedFile === cleanedTarget + "s" ||
      cleanedTarget === cleanedFile + "s" ||
      cleanedFile === cleanedTarget + "kit" ||
      cleanedFile === cleanedTarget + "kits" ||
      cleanedFile === cleanedTarget + "hamper" ||
      cleanedFile === cleanedTarget + "hampers" ||
      cleanedFile === cleanedTarget + "gift" ||
      cleanedFile === cleanedTarget + "gifts"
    );
  });

  if (kitImageMatch) {
    return `/kit images/${kitImageMatch}`;
  }

  // 2. Try to find a match in the secondary "public/kitsimages/" folder
  const kitsImageMatch = KITSIMAGES_FILES.find((file) => {
    const cleanedFile = cleanString(file.split(".")[0]);
    return (
      cleanedFile === cleanedTarget ||
      cleanedFile === cleanedTarget + "s" ||
      cleanedTarget === cleanedFile + "s" ||
      cleanedFile === cleanedTarget + "kit" ||
      cleanedFile === cleanedTarget + "kits" ||
      cleanedFile === cleanedTarget + "hamper" ||
      cleanedFile === cleanedTarget + "hampers" ||
      cleanedFile === cleanedTarget + "gift" ||
      cleanedFile === cleanedTarget + "gifts"
    );
  });

  if (kitsImageMatch) {
    return `/kitsimages/${kitsImageMatch}`;
  }

  // 3. Fallback: Prefix/substring matching for dynamic resolution
  const baseTarget = cleanedTarget.replace(/\d+$/, "");
  if (baseTarget.length >= 3) {
    // Search KIT_IMAGES_FILES
    const kitMatches = KIT_IMAGES_FILES.filter((file) => {
      let cleanedFile = cleanString(file.split(".")[0]);
      if (cleanedFile.includes("joining") || cleanedFile.includes("joiner")) {
        cleanedFile = cleanedFile.replace("joining", "join").replace("joiner", "join");
      }
      if (cleanedFile.includes("retailer")) {
        cleanedFile = cleanedFile.replace("retailer", "dealer");
      }
      return cleanedFile.includes(baseTarget) || baseTarget.includes(cleanedFile);
    });

    if (kitMatches.length > 0) {
      const chosen = pick(kitMatches, titleOrSlug, titleOrSlug);
      return `/kit images/${chosen}`;
    }

    // Search KITSIMAGES_FILES
    const kitsMatches = KITSIMAGES_FILES.filter((file) => {
      let cleanedFile = cleanString(file.split(".")[0]);
      if (cleanedFile.includes("joining") || cleanedFile.includes("joiner")) {
        cleanedFile = cleanedFile.replace("joining", "join").replace("joiner", "join");
      }
      if (cleanedFile.includes("retailer")) {
        cleanedFile = cleanedFile.replace("retailer", "dealer");
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

export const corporateKitImage = (nameOrSlug?: string): string | undefined => {
  if (!nameOrSlug) return undefined;
  return getKitsAndHampersImage(nameOrSlug);
};

export const corporateKitImageOrFallback = (nameOrSlug?: string): string => {
  if (!nameOrSlug) return "";
  const matched = getKitsAndHampersImage(nameOrSlug);
  if (matched) return matched;
  return "";
};
