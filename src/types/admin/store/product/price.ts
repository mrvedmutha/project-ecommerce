import { CurrencyEnum } from "@/enum/country/countryCurrencyEnum";
export interface IProductPriceDetails {
  price: number;
  currency: CurrencyEnum;
  isBaseCurrency: boolean;
}
