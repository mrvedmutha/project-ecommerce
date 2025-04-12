import * as z from "zod";
import { Roles } from "@/enum/enumexports";
const roleValues = Object.values(Roles) as [string, ...string[]];
export const userRegisterSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  role: z.enum(roleValues, { required_error: "Role is required" }),
});
