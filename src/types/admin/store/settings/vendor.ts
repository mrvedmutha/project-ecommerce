import { IAddress } from "@/types/common/addressInterface";
export interface IVendor {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: IAddress;
}
