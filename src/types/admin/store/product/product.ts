import { IProductCategory } from "@/types/admin/store/product/category";
import { IProductBrand } from "@/types/admin/store/product/brand";
import { IProductAttr } from "@/types/admin/store/product/attribute";
import { IProductReview } from "@/types/admin/store/product/review";
import { ITax } from "@/types/admin/store/settings/tax";
import { IProductPriceDetails } from "@/types/admin/store/product/price";
import { IProductDimension } from "@/types/admin/store/product/dimension";
import { IProductSEODetails } from "@/types/admin/store/product/seoDetails";
import { IVendor } from "@/types/admin/store/settings/vendor";
export interface IProduct {
  _id?: string;
  title: string;
  alias?: string;
  description: string;
  shortDescription: string;
  sku?: string;
  images?: string[];
  priceDetails?: IProductPriceDetails[];
  taxDetails?: {
    isTax: boolean;
    tax: ITax;
  };
  cogs?: number;
  profit?: number;
  margin?: number;
  package?: IProductDimension;
  metafields?: IProductSEODetails;
  stock: {
    isAvailable: boolean;
    quantity: number;
  };
  category: IProductCategory;
  brand: IProductBrand;
  slug: string;
  reviews?: IProductReview[];
  attributes?: IProductAttr[];
  tags?: string[];
  vendor?: IVendor;
}
