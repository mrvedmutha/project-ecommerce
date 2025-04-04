import mongoose, { Schema, Document } from "mongoose";
import { Roles } from "@/enum/enumexports";
import { IUser } from "@/types/admin/user/userInterface";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(Roles) },
    isStoreSetup: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User =
  (mongoose.models.User as mongoose.Model<IUser & Document>) ||
  mongoose.model<IUser & Document>("User", userSchema);

export default User;
