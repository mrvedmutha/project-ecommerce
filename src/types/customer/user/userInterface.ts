import { Roles } from "@/enum/enumexports";
import { IAddress } from "@/types/common/addressInterface";

export interface ICxUser {
  _id?: string;
  username: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: IAddress[] | null;
  role: Roles;
  isVerified: boolean;
  isSubscribed?: boolean;
  notes?: string[];
  tags?: string[];
}
