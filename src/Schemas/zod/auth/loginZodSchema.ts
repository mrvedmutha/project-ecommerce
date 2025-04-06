import * as z from "zod";
export const loginSchema = z.object({
  identifier: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
