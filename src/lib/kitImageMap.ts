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

export const getKitsAndHampersImage = (titleOrSlug: string): string | undefined => {
  if (!titleOrSlug) return undefined;
  
  const cleanedTarget = cleanString(titleOrSlug);

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
