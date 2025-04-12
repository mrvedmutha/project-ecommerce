import { Schema } from "mongoose";
import { IAddress } from "@/types/common/addressInterface";
import { CountryEnum, CountryNameEnum } from "@/enum/country/countryEnum";
const addressSchema = new Schema<IAddress>({
  addressline1: { type: String, required: true },
  addressline2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true, enum: Object.values(CountryEnum) },
  countryCode: {
    type: String,
    required: true,
    enum: Object.values(CountryNameEnum),
  },
  pincode: { type: String, required: true },
});

export default addressSchema;
