import { CountryEnum, CountryNameEnum } from "@/enum/country/countryEnum";

export interface IAddress {
  addressline1: string;
  addressline2?: string;
  city: string;
  state: string;
  stateCode: string;
  country: CountryEnum;
  countryCode: CountryNameEnum;
  pincode: string;
}
