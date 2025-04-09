import { ITax } from "@/types/admin/store/settings/tax";
import { Schema } from "mongoose";
const taxSettingSchema = new Schema<ITax>({
  taxClass: { type: String, required: true },
  taxName: { type: String, required: true },
  taxRate: { type: Number, required: true },
  priority: { type: Number, required: true },
  countryCode: { type: String, required: true },
  stateCode: { type: String, required: true },
});
export default taxSettingSchema;
