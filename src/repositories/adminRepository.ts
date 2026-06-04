import {
  DEFAULT_ADMINS,
  DEFAULT_BRANDS,
  DEFAULT_CATEGORIES,
  DEFAULT_EMAIL_LOGS,
  DEFAULT_ENQUIRIES,
  DEFAULT_ORDERS,
  DEFAULT_PRODUCTS,
  DEFAULT_QUOTES,
  DEFAULT_SUBCATEGORIES,
} from "@/lib/admin/seed";
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
} from "@/lib/admin/types";

type CollectionName =
  | "admins"
  | "products"
  | "categories"
  | "subcategories"
  | "brands"
  | "orders"
  | "quotes"
  | "enquiries"
  | "email_logs";

type CollectionMap = {
  admins: AdminUser[];
  products: ProductRecord[];
  categories: CategoryRecord[];
  subcategories: SubcategoryRecord[];
  brands: BrandRecord[];
  orders: OrderRecord[];
  quotes: QuoteRecord[];
  enquiries: EnquiryRecord[];
  email_logs: EmailLogRecord[];
};

type CollectionRecord<K extends CollectionName> = CollectionMap[K][number];
type CreateRecordInput<K extends CollectionName> = Omit<CollectionRecord<K>, "id" | "createdAt" | "updatedAt"> & {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
};

const store: CollectionMap = {
  admins: [...DEFAULT_ADMINS],
  products: [...DEFAULT_PRODUCTS],
  categories: [...DEFAULT_CATEGORIES],
  subcategories: [...DEFAULT_SUBCATEGORIES],
  brands: [...DEFAULT_BRANDS],
  orders: [...DEFAULT_ORDERS],
  quotes: [...DEFAULT_QUOTES],
  enquiries: [...DEFAULT_ENQUIRIES],
  email_logs: [...DEFAULT_EMAIL_LOGS],
};

const idPrefix: Record<CollectionName, string> = {
  admins: "admin",
  products: "prod",
  categories: "cat",
  subcategories: "sub",
  brands: "brand",
  orders: "ord",
  quotes: "quote",
  enquiries: "enq",
  email_logs: "email",
};

const createId = (collection: CollectionName) => `${idPrefix[collection]}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export function listRecords<K extends CollectionName>(collection: K): CollectionMap[K] {
  return store[collection];
}

export function createRecord<K extends CollectionName>(
  collection: K,
  record: CreateRecordInput<K>
): CollectionRecord<K> {
  const createdAt = record.createdAt ?? new Date().toISOString();
  const next = {
    ...record,
    id: record.id ?? createId(collection),
    createdAt,
    updatedAt: record.updatedAt ?? createdAt,
  } as CollectionRecord<K>;

  store[collection].unshift(next as never);
  return next;
}

export function updateRecord<K extends CollectionName>(
  collection: K,
  id: string,
  patch: Partial<CollectionRecord<K>>
): CollectionRecord<K> | null {
  const records = store[collection];
  const index = records.findIndex((record) => record.id === id);
  if (index === -1) return null;
  const updated = { ...records[index], ...patch, updatedAt: new Date().toISOString() } as CollectionRecord<K>;
  records[index] = updated as never;
  return updated;
}

export function deleteRecord<K extends CollectionName>(collection: K, id: string) {
  const records = store[collection];
  const index = records.findIndex((record) => record.id === id);
  if (index === -1) return false;
  records.splice(index, 1);
  return true;
}

export function getAdminByEmail(email: string) {
  return store.admins.find((admin) => admin.email.toLowerCase() === email.toLowerCase()) ?? null;
}
