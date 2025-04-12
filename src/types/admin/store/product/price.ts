import { CurrencyEnum } from "@/enum/country/countryCurrencyEnum";
export interface IProductPriceDetails {
  price: number;
  salePrice?: number;
  currency: CurrencyEnum;
  isBaseCurrency: boolean;
}
