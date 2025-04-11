import { NextRequest } from "next/server";
import brandService from "@/service/admin/store/product/brand";
import dbConnect from "@/lib/database/connectToDatabase";
import { getServerSession } from "next-auth";
import { successResponse, errorResponse } from "@/utils/jsonResponse";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
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
    const brandId = params.id;
    const findBrand = await brandService.getBrandById(brandId);
    if (!findBrand) {
      return errorResponse("Brand not found", 404);
    }
    return successResponse("Brand found successfully", 200, findBrand);
  } catch (error) {
    errorResponse("Database connection failed", 500, error);
  }
}
