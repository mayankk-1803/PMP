import { createRecord, deleteRecord, listRecords, updateRecord } from "@/repositories/adminRepository";
import type { OrderRecord, OrderStatus } from "@/lib/admin/types";
import { connectMongoDB } from "@/lib/mongodb";
import { OrderModel } from "@/models/cmsModels";

const mapOrder = (order: any): OrderRecord => ({
  id: String(order._id),
  customerName: order.customerName || order.customer,
  email: order.email,
  phone: order.phone,
  company: order.company,
  products: order.products || [],
  total: order.total ?? order.amount,
  status: order.status || "NEW",
  createdAt: order.createdAt?.toISOString?.() || new Date().toISOString(),
  updatedAt: order.updatedAt?.toISOString?.() || new Date().toISOString(),
});

export async function listOrders() {
  if (!process.env.MONGODB_URI) return listRecords("orders");
  await connectMongoDB();
  const orders = await OrderModel.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 }).lean<any[]>();
  return orders.map(mapOrder);
}

export async function createOrder(input: {
  customerName: string;
  email: string;
  phone?: string;
  company?: string;
  products: string[];
  total?: number;
  status?: OrderStatus;
  notes?: string;
}) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const order = await OrderModel.create({
      ...input,
      customer: input.customerName,
      amount: input.total,
      status: input.status ?? "NEW",
    });
    return mapOrder(order.toObject());
  }

  return createRecord("orders", {
    customerName: input.customerName,
    email: input.email,
    phone: input.phone,
    company: input.company,
    products: input.products,
    total: input.total,
    status: input.status ?? "NEW",
  });
}

export async function updateOrder(id: string, patch: Partial<OrderRecord> & { status?: OrderStatus; notes?: string }) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    const order = await OrderModel.findByIdAndUpdate(id, { $set: patch }, { new: true }).lean<any>();
    return order ? mapOrder(order) : null;
  }
  return updateRecord("orders", id, patch);
}

export async function deleteOrder(id: string, permanent: boolean = false, adminId?: string) {
  if (process.env.MONGODB_URI) {
    await connectMongoDB();
    if (permanent) {
      const result = await OrderModel.deleteOne({ _id: id });
      return result.deletedCount > 0;
    } else {
      const result = await OrderModel.findByIdAndUpdate(id, {
        $set: {
          isDeleted: true,
          deletedAt: new Date(),
          deletedBy: adminId,
        },
      });
      return !!result;
    }
  }
  return deleteRecord("orders", id);
}
