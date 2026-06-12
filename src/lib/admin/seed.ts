import type {
  AdminUser,
  BrandRecord,
  CategoryRecord,
  EmailLogRecord,
  EnquiryRecord,
  OrderRecord,
  ProductRecord,
  QuoteRecord,
  SubcategoryRecord,
} from "./types";
import { PROFESSIONAL_BRANDS, PROFESSIONAL_CATEGORIES, PROFESSIONAL_PRODUCTS, PROFESSIONAL_SUBCATEGORIES } from "./professionalCatalogSeed";

const now = "2026-06-04T00:00:00.000Z";

export const DEFAULT_CATEGORIES: CategoryRecord[] = PROFESSIONAL_CATEGORIES;
export const DEFAULT_SUBCATEGORIES: SubcategoryRecord[] = PROFESSIONAL_SUBCATEGORIES;

export const DEFAULT_BRANDS: BrandRecord[] = PROFESSIONAL_BRANDS;

export const DEFAULT_PRODUCTS: ProductRecord[] = PROFESSIONAL_PRODUCTS;

export const DEFAULT_ADMINS: AdminUser[] = [
  {
    id: "admin_1",
    name: "Super Admin",
    email: "pmpadmin@gmail.com",
    passwordHash: "$2b$12$zz2.mXfen1bSv2jhEpUAPOaD.3hmEm7rEuelXLQutAIF7w1JmtdC6",
    role: "SUPER_ADMIN",
    active: true,
    createdAt: now,
  },
];

export const DEFAULT_QUOTES: QuoteRecord[] = [];
export const DEFAULT_ENQUIRIES: EnquiryRecord[] = [];
export const DEFAULT_ORDERS: OrderRecord[] = [];
export const DEFAULT_EMAIL_LOGS: EmailLogRecord[] = [];
