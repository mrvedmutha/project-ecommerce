import dbConnect from "@/lib/connectToDatabase";
import { successResponse, errorResponse } from "@/utils/jsonResponse";

export async function GET() {
  try {
    await dbConnect();
    return successResponse("Database connection successful", 200);
  } catch (error) {
    console.error("Error connecting to the database or fetching data", error);
    return errorResponse("Database connection failed", 500, error);
  }
}
