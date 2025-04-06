import { randomBytes } from "crypto";
import URLToken from "@/models/admin/superadmin/urlToken";

export const superadminService = {
  async createURLToken() {
    const token = randomBytes(24)
      .toString("base64")
      .replace(/[+/=]/g, "")
      .substring(0, 32);
    console.log(token); //TODO remove
    const urlToken = await URLToken.create({ token });
    return urlToken;
  },
  async verifyURLToken(token: string) {
    const urlToken = await URLToken.findOne({ token });
    return urlToken;
  },
  async deleteURLToken(token: string) {
    const urlToken = await URLToken.findOneAndDelete({ token });
    return urlToken;
  },
  async getURLToken() {
    const urlToken = await URLToken.find({});
    return urlToken;
  },
};
