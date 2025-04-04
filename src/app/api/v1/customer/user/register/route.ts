import { NextRequest } from "next/server";
import dbConnect from "@/lib/connectToDatabase";
import { cxService } from "@/service/customer/cxUserService";
import { userService } from "@/service/admin/user/userService";
import bcrypt from "bcryptjs";
import { successResponse, errorResponse } from "@/utils/jsonResponse";
import { Roles } from "@/enum/enumexports";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const body = await request.json();
    const { username, name, email, password } = body;
    if (!username || !name || !email || !password) {
      return errorResponse("All fields are required", 403);
    }
    const userEmail = await cxService.getCxUserByEmail(email);
    const usernameExist = await cxService.getCxUserByUsername(username);
    const userAdminEmail = await userService.getUserbyEmail(email);
    const userAdminUsername = await userService.getUserbyUsername(username);
    if (userAdminEmail) {
      return errorResponse("Email already registered", 409);
    }
    if (userAdminUsername) {
      return errorResponse("Username already registered", 409);
    }
    if (usernameExist) {
      return errorResponse("Username already exists", 409);
    }
    if (userEmail) {
      return errorResponse("Email already exists", 409);
    }
    const hashedPassword = await bcrypt.hash(password, 15);
    const createCx = await cxService.createCxUser(
      username,
      name,
      email,
      hashedPassword,
      Roles.CUSTOMER
    );
    console.log(createCx);
    return successResponse("User registered successfully", 200);
  } catch (error) {
    return errorResponse("Error registering user", 500, error);
  }
}
