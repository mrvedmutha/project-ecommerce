import mongoose, { Schema, Document } from "mongoose";
import { IStoreSetting } from "@/types/admin/store/settings/store";
import addressSchema from "@/schemas/common/address";
import { CountryEnum } from "@/enum/country/countryEnum";

const storeSettingSchema = new Schema<IStoreSetting & Document>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String },
    favicon: { type: String },
    address: {
      type: addressSchema,
    },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    baseCurrency: {
      type: String,
      required: true,
      enum: Object.values(CountryEnum),
    },
    isStoreSetup: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const StoreSetting =
  (mongoose.models.StoreSetting as mongoose.Model<IStoreSetting & Document>) ||
  mongoose.model<IStoreSetting & Document>("StoreSetting", storeSettingSchema);

export default StoreSetting;
