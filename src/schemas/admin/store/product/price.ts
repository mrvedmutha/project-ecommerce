import { Schema } from "mongoose";
import { IProductPriceDetails } from "@/types/admin/store/product/price";

const productPriceDetailsSchema = new Schema<IProductPriceDetails>({
  price: { type: Number },
  salePrice: { type: Number },
  currency: { type: String },
  isBaseCurrency: { type: Boolean },
});

export default productPriceDetailsSchema;
