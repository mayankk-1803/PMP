import { createRecord, deleteRecord, listRecords, updateRecord } from "@/repositories/adminRepository";
import type { QuoteRecord, QuoteStatus } from "@/lib/admin/types";
import { connectMongoDB } from "@/lib/mongodb";
import { QuoteModel } from "@/models/cmsModels";

const mapQuote = (quote: any): QuoteRecord => ({
  id: String(quote._id),
  customerName: quote.customerName || quote.name,
  email: quote.email,
  phone: quote.phone || "",
  company: quote.company || "",
  city: quote.city,
  products: quote.products?.length ? quote.products : quote.product ? [quote.product] : [],
  quantity: quote.quantity || "",
  message: quote.message,
  status: quote.status || "NEW",
  createdAt: quote.createdAt?.toISOString?.() || new Date().toISOString(),
  updatedAt: quote.updatedAt?.toISOString?.() || new Date().toISOString(),
});

export async function listQuotes(): Promise<QuoteRecord[]> {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const quotes = await QuoteModel.find({}).sort({ createdAt: -1 }).lean<any[]>();
    return quotes.map(mapQuote);
  }
  return listRecords("quotes");
}

export async function createQuote(input: {
  customerName: string;
  email: string;
  phone: string;
  company: string;
  city?: string;
  products: string[];
  quantity: string;
  message?: string;
}) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const quote = await QuoteModel.create({
      ...input,
      name: input.customerName,
      product: input.products.join(", "),
      status: "NEW",
    });
    return mapQuote(quote.toObject());
  }
  return createRecord("quotes", {
    ...input,
    status: "NEW",
  });
}

export async function updateQuote(id: string, patch: Partial<QuoteRecord> & { status?: QuoteStatus }) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const quote = await QuoteModel.findByIdAndUpdate(id, { $set: patch }, { new: true }).lean<any>();
    return quote ? mapQuote(quote) : null;
  }
  return updateRecord("quotes", id, patch);
}

export async function deleteQuote(id: string) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const result = await QuoteModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
  return deleteRecord("quotes", id);
}
