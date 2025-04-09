import { IAddress } from "@/types/common/addressInterface";
import { CountryEnum } from "@/enum/country/countryEnum";
export interface IStoreSetting {
  _id?: string;
  name: string;
  description: string;
  logo?: string;
  favicon?: string;
  address?: IAddress;
  email: string;
  phone: string;
  baseCurrency: CountryEnum;
  isStoreSetup: boolean;
}
