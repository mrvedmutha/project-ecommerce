import { ICxUser } from "@/types/customer/user/userInterface";
import { IProduct } from "@/types/admin/store/product/product";

export interface IProductReview {
  _id?: string;
  rating: number;
  comment: string;
  product: IProduct;
  user: ICxUser;
  isVerifedPurchase: boolean;
}
