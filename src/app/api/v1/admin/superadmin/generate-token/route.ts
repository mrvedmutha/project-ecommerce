import { NextRequest } from "next/server";
import dbConnect from "@/lib/database/connectToDatabase";
import { superadminService } from "@/service/admin/superadmin/superadminService";
import { userService } from "@/service/admin/user/userService";
import { Roles } from "@/enum/enumexports";
import { errorResponse, successResponse } from "@/utils/jsonResponse";

export async function GET(request: NextRequest) {
  await dbConnect();
  const findSuperUser = await userService.getUserByRole(Roles.SUPERADMIN);
  const findToken = await superadminService.getURLToken();
  if (findSuperUser && findSuperUser.length > 0) {
    return errorResponse("Superadmin already exists", 409);
  }
  if (findToken && findToken.length > 0) {
    return errorResponse("URL token already exists", 409);
  }
  const urlToken = await superadminService.createURLToken();
  return successResponse("URL token generated successfully", 200, urlToken);
}
