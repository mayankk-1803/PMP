import { NextResponse } from "next/server";
import { requireAdminRequest } from "@/lib/admin/apiAuth";
import { connectMongoDB } from "@/lib/mongodb";
import { ActivityLogModel } from "@/models/cmsModels";

export async function GET(req: Request) {
  const auth = await requireAdminRequest(req);
  if (auth.response) return auth.response;

  try {
    await connectMongoDB();
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    const query: any = {};

    const search = searchParams.get("search")?.trim();
    if (search) {
      query.$or = [
        { userName: { $regex: search, $options: "i" } },
        { action: { $regex: search, $options: "i" } },
        { entityName: { $regex: search, $options: "i" } },
      ];
    }

    const userName = searchParams.get("user")?.trim();
    if (userName) {
      query.userName = userName;
    }

    const action = searchParams.get("action")?.trim();
    if (action) {
      query.action = action;
    }

    const entityType = searchParams.get("entityType")?.trim();
    if (entityType) {
      query.entityType = entityType;
    }

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        // Set to end of the day
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.createdAt.$lte = end;
      }
    }

    const [logs, total] = await Promise.all([
      ActivityLogModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ActivityLogModel.countDocuments(query),
    ]);

    // Gather unique actions/users/entities for filter dropdown options
    const [actions, users, entityTypes] = await Promise.all([
      ActivityLogModel.distinct("action"),
      ActivityLogModel.distinct("userName"),
      ActivityLogModel.distinct("entityType"),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        logs: logs.map((log: any) => ({
          ...log,
          id: String(log._id),
          _id: undefined,
        })),
        total,
        page,
        pages: Math.ceil(total / limit),
        filters: {
          actions: actions.filter(Boolean),
          users: users.filter(Boolean),
          entityTypes: entityTypes.filter(Boolean),
        }
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
