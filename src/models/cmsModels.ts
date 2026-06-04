import mongoose, { Schema } from "mongoose";

const timestamps = { timestamps: true };

const AdminSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["SUPER_ADMIN", "ADMIN", "EDITOR", "VIEWER"], default: "VIEWER" },
    active: { type: Boolean, default: true },
    lastLogin: Date,
  },
  timestamps
);

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    parentGroup: { type: String, index: true },
    description: String,
    image: String,
    active: { type: Boolean, default: true },
  },
  timestamps
);

const SubcategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true },
    parentGroup: { type: String, index: true },
    image: String,
    active: { type: Boolean, default: true },
  },
  timestamps
);

const BrandSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    logo: String,
    description: String,
    active: { type: Boolean, default: true },
  },
  timestamps
);

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    title: String,
    slug: { type: String, required: true, unique: true, index: true },
    description: String,
    shortDescription: String,
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", index: true },
    subCategoryId: { type: Schema.Types.ObjectId, ref: "Subcategory", index: true },
    brandId: { type: Schema.Types.ObjectId, ref: "Brand", index: true },
    category: { type: String, index: true },
    subcategory: { type: String, index: true },
    brand: String,
    featuredImage: String,
    galleryImages: [String],
    cloudinaryPublicId: String,
    images: [String],
    features: [String],
    specifications: { type: Map, of: String },
    tags: [String],
    moq: Number,
    price: Number,
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["DRAFT", "PUBLISHED", "HIDDEN"], default: "PUBLISHED", index: true },
    active: { type: Boolean, default: true },
  },
  timestamps
);

const OrderSchema = new Schema(
  {
    customerName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: String,
    company: String,
    customer: String,
    products: [String],
    amount: Number,
    total: Number,
    notes: String,
    status: { type: String, enum: ["NEW", "QUOTATION_SENT", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"], default: "NEW" },
  },
  timestamps
);

const QuoteSchema = new Schema(
  {
    customerName: { type: String, required: true },
    name: String,
    email: { type: String, required: true, index: true },
    phone: String,
    company: String,
    city: String,
    products: [String],
    product: String,
    quantity: String,
    message: String,
    status: { type: String, enum: ["NEW", "CONTACTED", "QUOTATION_SENT", "WON", "LOST"], default: "NEW" },
  },
  timestamps
);

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: String,
    company: String,
    source: { type: String, index: true },
    subject: String,
    message: String,
    status: { type: String, enum: ["NEW", "READ", "REPLIED", "ARCHIVED"], default: "NEW" },
  },
  timestamps
);

const EmailLogSchema = new Schema(
  {
    type: { type: String, required: true, index: true },
    recipient: { type: String, required: true, index: true },
    subject: { type: String, required: true },
    status: { type: String, enum: ["QUEUED", "SENT", "FAILED", "MOCKED"], required: true },
    providerMessageId: String,
    provider: String,
    sentAt: Date,
    error: String,
  },
  timestamps
);

export const AdminModel = mongoose.models.Admin || mongoose.model("Admin", AdminSchema, "admins");
export const CategoryModel = mongoose.models.Category || mongoose.model("Category", CategorySchema, "categories");
export const SubcategoryModel = mongoose.models.Subcategory || mongoose.model("Subcategory", SubcategorySchema, "subcategories");
export const BrandModel = mongoose.models.Brand || mongoose.model("Brand", BrandSchema, "brands");
export const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema, "products");
export const OrderModel = mongoose.models.Order || mongoose.model("Order", OrderSchema, "orders");
export const QuoteModel = mongoose.models.Quote || mongoose.model("Quote", QuoteSchema, "quotes");
export const EnquiryModel = mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema, "enquiries");
export const EmailLogModel = mongoose.models.EmailLog || mongoose.model("EmailLog", EmailLogSchema, "email_logs");
