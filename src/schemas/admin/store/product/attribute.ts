import {
  IProductAttr,
  IProductAttrVal,
} from "@/types/admin/store/product/attribute";
import productPriceDetailsSchema from "@/schemas/admin/store/product/price";
import { Schema } from "mongoose";

export const attributeValueSchema = new Schema<IProductAttrVal>({
  value: { type: String, required: true },
  sku: { type: String, required: true },
  priceDetails: [productPriceDetailsSchema],
});
export const attributeSchema = new Schema<IProductAttr>({
  name: { type: String, required: true },
  values: [attributeValueSchema],
});
