import { NextRequest } from "next/server";
import dbConnect from "@/lib/database/connectToDatabase";
import { userService } from "@/service/admin/user/userService";
import bcrypt from "bcryptjs";
import { successResponse, errorResponse } from "@/utils/jsonResponse";
import { Roles } from "@/enum/enumexports";
import { superadminService } from "@/service/admin/superadmin/superadminService";

export async function POST(request: NextRequest) {
  if (request.method !== "POST") {
    return errorResponse("Method not allowed", 405);
  }
  const searchParams = request.nextUrl.searchParams;
  const urlToken = searchParams.get("urlToken");
  console.log(urlToken); //TODO remove
  await dbConnect();
  if (urlToken) {
    const verifyToken = await superadminService.verifyURLToken(urlToken);
    if (!verifyToken) {
      return errorResponse("Invalid URL token", 403);
    }
  } else {
    return errorResponse("URL token is required", 403);
  }
  const findSuperAdmin = await userService.getUserByRole(Roles.SUPERADMIN);
  if (findSuperAdmin && findSuperAdmin.length > 0) {
    return errorResponse("Superadmin already exists", 409);
  }
  try {
    const body = await request.json();
    console.log(body);
    const { username, name, email, password } = body;
    if (!username || !name || !email || !password) {
      return errorResponse("All fields are required", 403);
    }
    const userEmail = await userService.getUserbyEmail(email);
    const usernameExist = await userService.getUserbyUsername(username);
    if (usernameExist) {
      return errorResponse("Username already exists", 409);
    }
    if (userEmail) {
      return errorResponse("Email already exists", 409);
    }
    const hashedPassword = await bcrypt.hash(password, 15);
    await userService.createUser(
      username,
      name,
      email,
      hashedPassword,
      Roles.SUPERADMIN
    );
    await superadminService.deleteURLToken(urlToken);
    return successResponse("Superadmin registered successfully", 200);
  } catch (e) {
    return errorResponse("Error registering superadmin", 500, e);
  }
}
