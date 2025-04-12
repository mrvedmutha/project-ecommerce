import { Schema } from "mongoose";
import { IProductSEODetails } from "@/types/admin/store/product/seoDetails";

const seoDetailSchema = new Schema<IProductSEODetails>({
  title: { type: String },
  description: { type: String },
  shortDescription: { type: String },
  slug: { type: String },
});

export default seoDetailSchema;
