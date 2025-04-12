import { NextRequest } from "next/server";
import dbConnect from "@/lib/database/connectToDatabase";
import { brandService } from "@/service/admin/store/product/brand";
import { getServerSession } from "next-auth";
import { successResponse, errorResponse } from "@/utils/jsonResponse";

export async function GET(request: NextRequest) {
  const session = await getServerSession();
  if (!session) {
    return errorResponse("Unauthorized, Please Login", 401);
  }
  if (request.method !== "GET") {
    return errorResponse("Method not allowed", 405);
  }
  try {
    await dbConnect();
    const brands = await brandService.getAllBrands();
    return successResponse("Brands found successfully", 200, brands);
  } catch (error) {
    console.error("Error connecting to the database or fetching data", error);
    return errorResponse("Database connection failed", 500, error);
  }
}
