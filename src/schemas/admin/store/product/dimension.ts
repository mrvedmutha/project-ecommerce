import { Schema } from "mongoose";
import { IProductDimension } from "@/types/admin/store/product/dimension";
const dimensionSchema = new Schema<IProductDimension>({
  dimension: {
    length: { type: Number },
    breath: { type: Number },
    height: { type: Number },
    measurement: { type: String },
  },
  weight: {
    weight: { type: Number },
    measurement: { type: String },
  },
});
export default dimensionSchema;
