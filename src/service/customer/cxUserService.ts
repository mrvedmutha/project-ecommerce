import CxUser from "@/models/customer/user/user";

export const cxService = {
  async getAllCxUsers() {
    return await CxUser.find({});
  },
  async getCxUserById(id: string) {
    return await CxUser.findById(id);
  },
  async getCxUserByEmail(email: string) {
    return await CxUser.findOne({ email });
  },
  async getCxUserByUsername(username: string) {
    return await CxUser.findOne({ username });
  },
  async createCxUser(
    username: string,
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    const user = new CxUser({
      username,
      name,
      email,
      password,
      role,
    });
    await user.save();
  },
};
