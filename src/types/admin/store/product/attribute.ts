import { IProductPriceDetails } from "@/types/admin/store/product/price";

export interface IProductAttrVal {
  value: string;
  sku: string;
  priceDetails: IProductPriceDetails[];
}
export interface IProductAttr {
  _id?: string;
  name: string;
  values: IProductAttrVal[];
}
