import mongoose, { Schema, Document } from "mongoose";
import { IProductReview } from "@/types/admin/store/product/review";

const productReviewSchema = new Schema<IProductReview & Document>(
  {
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    user: { type: Schema.Types.ObjectId, ref: "CxUser" },
    isVerifedPurchase: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Review =
  (mongoose.models.Review as mongoose.Model<IProductReview & Document>) ||
  mongoose.model<IProductReview & Document>("Review", productReviewSchema);

export default Review;
