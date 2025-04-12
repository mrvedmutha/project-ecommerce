import { NextRequest } from "next/server";
import { productService } from "@/service/admin/store/product/product";
import dbConnect from "@/lib/database/connectToDatabase";
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
    const products = await productService.getAllProducts();
    return successResponse("Products found successfully", 200, products);
  } catch (error) {
    console.error("Error connecting to the database or fetching data", error);
    return errorResponse("Database connection failed", 500, error);
  }
}
