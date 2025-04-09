import mongoose, { Document, Schema } from "mongoose";
import { IProductBrand } from "@/types/admin/store/product/brand";

const productBrandSchema = new Schema<IProductBrand & Document>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    logo: { type: String, required: true },
  },
  { timestamps: true }
);

const ProductBrand =
  (mongoose.models.ProductBrand as mongoose.Model<IProductBrand & Document>) ||
  mongoose.model<IProductBrand & Document>("ProductBrand", productBrandSchema);

export default ProductBrand;
