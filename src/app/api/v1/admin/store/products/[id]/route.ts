import { successResponse, errorResponse } from "@/utils/jsonResponse";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/database/connectToDatabase";
import { productService } from "@/service/admin/store/product/product";
import { Roles } from "@/enum/enumexports";
import { getServerSession } from "next-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
  response: NextResponse
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
    const productId = params.id;
    const findProduct = await productService.getProductById(productId);
    if (!findProduct) {
      return errorResponse("Product not found", 404);
    }
    return successResponse("Product found successfully", 200, findProduct);
  } catch (error) {
    errorResponse("Database connection failed", 500, error);
  }
}
