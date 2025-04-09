import mongoose, { Schema, Document } from "mongoose";
import { ICxUser } from "@/types/customer/user/userInterface";
import { Roles } from "@/enum/enumexports";
import addressSchema from "@/schemas/common/address";

const cxUserSchema = new Schema<ICxUser & Document>({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, sparse: true },
  address: {
    type: [addressSchema],
    sparse: true,
  },
  role: { type: String, required: true, enum: Object.values(Roles) },
  isVerified: { type: Boolean, default: false },
  isSubscribed: { type: Boolean, default: false },
  notes: { type: [String], sparse: true },
  tags: { type: [String], sparse: true },
});

const CxUser =
  (mongoose.models.CxUser as mongoose.Model<ICxUser & Document>) ||
  mongoose.model<ICxUser & Document>("CxUser", cxUserSchema);

export default CxUser;
