import mongoose, { Schema, Document } from "mongoose";
import { IVendor } from "@/types/admin/store/settings/vendor";
import addressSchema from "@/schemas/common/address";
const vendorDetailSchema = new Schema<IVendor & Document>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      type: addressSchema,
      required: true,
    },
  },
  { timestamps: true }
);

const VendorDetail =
  (mongoose.models.VendorDetail as mongoose.Model<IVendor & Document>) ||
  mongoose.model<IVendor & Document>("VendorDetail", vendorDetailSchema);

export default VendorDetail;
