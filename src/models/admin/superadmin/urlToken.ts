import mongoose from "mongoose";
import { IURLToken } from "@/types/admin/superadmin/urlTokenInterface";
const tokenSchema = new mongoose.Schema<IURLToken & Document>(
  {
    token: { type: String, required: true },
  },
  { timestamps: true }
);

const URLToken =
  (mongoose.models.URLToken as mongoose.Model<IURLToken & Document>) ||
  mongoose.model<IURLToken & Document>("URLToken", tokenSchema);

export default URLToken;
