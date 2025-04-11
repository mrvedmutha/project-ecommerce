import { NextRequest } from "next/server";
import categoryService from "@/service/admin/store/product/category";
import dbConnect from "@/lib/database/connectToDatabase";
import { getServerSession } from "next-auth";
import { successResponse, errorResponse } from "@/utils/jsonResponse";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session) {
    return errorResponse("Unauthorized, Please Login", 401);
  }
  if (request.method !== "GET") {
    return errorResponse("Method not allowed", 405);
  }
  try {
    await dbConnect();
    const { id } = await params;
    const findCategory = await categoryService.getCategoryById(id);
    return successResponse("Categories found successfully", 200, findCategory);
  } catch (error) {
    console.error("Error connecting to the database or fetching data", error);
    return errorResponse("Database connection failed", 500, error);
  }
}
