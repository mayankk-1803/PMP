import { createRecord, deleteRecord, listRecords, updateRecord } from "@/repositories/adminRepository";
import type { EnquiryRecord } from "@/lib/admin/types";
import { connectMongoDB } from "@/lib/mongodb";
import { EnquiryModel } from "@/models/cmsModels";

const mapEnquiry = (enquiry: any): EnquiryRecord => ({
  id: String(enquiry._id),
  name: enquiry.name,
  email: enquiry.email,
  phone: enquiry.phone,
  company: enquiry.company,
  source: enquiry.source || enquiry.subject || "website",
  message: enquiry.message,
  status: enquiry.status || "NEW",
  createdAt: enquiry.createdAt?.toISOString?.() || new Date().toISOString(),
  updatedAt: enquiry.updatedAt?.toISOString?.() || new Date().toISOString(),
});

export async function listEnquiries(): Promise<EnquiryRecord[]> {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const enquiries = await EnquiryModel.find({}).sort({ createdAt: -1 }).lean<any[]>();
    return enquiries.map(mapEnquiry);
  }
  return listRecords("enquiries");
}

export async function createEnquiry(input: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  message?: string;
}) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const enquiry = await EnquiryModel.create({
      ...input,
      subject: input.source,
      status: "NEW",
    });
    return mapEnquiry(enquiry.toObject());
  }
  return createRecord("enquiries", {
    ...input,
    status: "NEW",
  });
}

export async function updateEnquiry(id: string, patch: Partial<EnquiryRecord>) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const enquiry = await EnquiryModel.findByIdAndUpdate(id, { $set: patch }, { new: true }).lean<any>();
    return enquiry ? mapEnquiry(enquiry) : null;
  }
  return updateRecord("enquiries", id, patch);
}

export async function deleteEnquiry(id: string) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const result = await EnquiryModel.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
  return deleteRecord("enquiries", id);
}
