import { NextRequest, NextResponse } from "next/server";
import categoryService from "@/service/admin/store/product/category";
import dbConnect from "@/lib/database/connectToDatabase";
import { getServerSession } from "next-auth";
import { successResponse, errorResponse } from "@/utils/jsonResponse";

export async function GET(request: NextRequest, response: NextResponse) {
  const session = await getServerSession();
  if (!session) {
    return errorResponse("Unauthorized, Please Login", 401);
  }
  if (request.method !== "GET") {
    return errorResponse("Method not allowed", 405);
  }
  try {
    await dbConnect();
    const categories = await categoryService.getAllCategories();
    return successResponse("Categories found successfully", 200, categories);
  } catch (error) {
    console.error("Error connecting to the database or fetching data", error);
    return errorResponse("Database connection failed", 500, error);
  }
}
