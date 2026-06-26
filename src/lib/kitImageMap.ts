const KIT_IMAGE_FOLDER = "/kits images";
export const DEFAULT_KIT_IMAGE = `${KIT_IMAGE_FOLDER}/newjoinerkit.png`;

const normalizeKitName = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\//g, " ")
    .replace(/[^a-z0-9]/g, "");

const kitImage = (fileName: string) => `${KIT_IMAGE_FOLDER}/${fileName}`;

const CORPORATE_KIT_IMAGES_BY_NAME: Record<string, string> = {
  [normalizeKitName("Doctor Kits")]: kitImage("doctorkit1.png"),
  [normalizeKitName("Architect Kits")]: kitImage("architectkit.png"),
  [normalizeKitName("Dealer Kits")]: kitImage("dealerkit.png"),
  [normalizeKitName("Distributor Kits")]: kitImage("dealerkit.png"),
  [normalizeKitName("Joining Kits")]: kitImage("newjoinerkit.png"),
  [normalizeKitName("Employee Welcome Kit")]: kitImage("newjoinerkit.png"),
  [normalizeKitName("Employee Welcome Kits")]: kitImage("newjoinerkit.png"),
  [normalizeKitName("Electrician Kits")]: kitImage("engineerkit.png"),
  [normalizeKitName("Contractor Kits")]: kitImage("contractorkit.png"),
  [normalizeKitName("Hospital Staff Kits")]: kitImage("doctorkit2.png"),
  [normalizeKitName("Real Estate Builder Kit")]: kitImage("engineerkit1.png"),
  [normalizeKitName("Real Estate / Builder Kit")]: kitImage("engineerkit1.png"),
  [normalizeKitName("Real Estate Kits")]: kitImage("engineerkit1.png"),
  [normalizeKitName("Partner Kit")]: kitImage("dealerkitwithcontent.png"),
  [normalizeKitName("Partner Kits")]: kitImage("dealerkitwithcontent.png"),
  [normalizeKitName("Channel Partner Kits")]: kitImage("dealerkitwithcontent.png"),
  [normalizeKitName("Sales Team Kit")]: kitImage("dealerkit.png"),
  [normalizeKitName("Sales Team Kits")]: kitImage("dealerkit.png"),
  [normalizeKitName("Startup Employee Onboarding Kits")]: kitImage("newjoinerkitcontent.png"),
  [normalizeKitName("Training Seminar Kits")]: kitImage("newjoinerkitcontent.png"),
  [normalizeKitName("Training & Seminar Kits")]: kitImage("newjoinerkitcontent.png"),
  [normalizeKitName("Training Kits")]: kitImage("newjoinerkitcontent.png"),
  [normalizeKitName("Seminar Kits")]: kitImage("newjoinerkitcontent.png"),
  [normalizeKitName("Education School Kit")]: DEFAULT_KIT_IMAGE,
  [normalizeKitName("Education School Kits")]: DEFAULT_KIT_IMAGE,
  [normalizeKitName("Interior Designer Kit")]: kitImage("architectkitcontent.png"),
  [normalizeKitName("Interior Designer Kits")]: kitImage("architectkitcontent.png"),
  [normalizeKitName("Plumber Kits")]: kitImage("contractorkit.png"),
  [normalizeKitName("Mason Kits")]: kitImage("masonkit.png"),
  [normalizeKitName("Pharma Representative Kits")]: kitImage("doctorkitcontent.png"),
};

const CORPORATE_KIT_SLUGS_BY_NAME: Record<string, string> = {
  [normalizeKitName("doctor-kits")]: kitImage("doctorkit1.png"),
  [normalizeKitName("architect-kits")]: kitImage("architectkit.png"),
  [normalizeKitName("dealer-kits")]: kitImage("dealerkit.png"),
  [normalizeKitName("distributor-kits")]: kitImage("dealerkit.png"),
  [normalizeKitName("joining-kits")]: kitImage("newjoinerkit.png"),
  [normalizeKitName("employee-welcome-kit")]: kitImage("newjoinerkit.png"),
  [normalizeKitName("electrician-kits")]: kitImage("engineerkit.png"),
  [normalizeKitName("contractor-kits")]: kitImage("contractorkit.png"),
  [normalizeKitName("hospital-staff-kits")]: kitImage("doctorkit2.png"),
  [normalizeKitName("real-estate-builder-kit")]: kitImage("engineerkit1.png"),
  [normalizeKitName("partner-kit")]: kitImage("dealerkitwithcontent.png"),
  [normalizeKitName("sales-team-kit")]: kitImage("dealerkit.png"),
  [normalizeKitName("startup-employee-onboarding-kits")]: kitImage("newjoinerkitcontent.png"),
  [normalizeKitName("training-seminar-kits")]: kitImage("newjoinerkitcontent.png"),
  [normalizeKitName("education-school-kit")]: DEFAULT_KIT_IMAGE,
  [normalizeKitName("interior-designer-kit")]: kitImage("architectkitcontent.png"),
  [normalizeKitName("interior-designer-kits")]: kitImage("architectkitcontent.png"),
  [normalizeKitName("plumber-kits")]: kitImage("contractorkit.png"),
  [normalizeKitName("mason-kits")]: kitImage("masonkit.png"),
  [normalizeKitName("pharma-representative-kits")]: kitImage("doctorkitcontent.png"),
};

export const corporateKitImage = (nameOrSlug?: string) => {
  if (!nameOrSlug) return undefined;
  const normalized = normalizeKitName(nameOrSlug);
  const exact = CORPORATE_KIT_IMAGES_BY_NAME[normalized] || CORPORATE_KIT_SLUGS_BY_NAME[normalized];
  if (exact) return exact;

  const matchedKey = [...Object.keys(CORPORATE_KIT_IMAGES_BY_NAME), ...Object.keys(CORPORATE_KIT_SLUGS_BY_NAME)]
    .sort((a, b) => b.length - a.length)
    .find((key) => normalized.startsWith(key));

  return matchedKey
    ? CORPORATE_KIT_IMAGES_BY_NAME[matchedKey] || CORPORATE_KIT_SLUGS_BY_NAME[matchedKey]
    : undefined;
};

export const corporateKitImageOrFallback = (nameOrSlug?: string) =>
  corporateKitImage(nameOrSlug) || DEFAULT_KIT_IMAGE;
