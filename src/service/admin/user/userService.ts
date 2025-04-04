import User from "@/models/admin/user/user";

export const userService = {
  async createUser(
    username: string,
    name: string,
    email: string,
    password: string,
    role: string,
    createdBy?: string
  ) {
    const user = new User({
      username,
      name,
      email,
      password,
      role,
      createdBy,
    });
    await user.save();
  },
  async getUser() {
    return await User.find({});
  },
  async getUserbyUsername(username: string | null) {
    return await User.findOne({ username });
  },
  async getUserbyEmail(email: string | null) {
    return await User.findOne({ email });
  },
  async getUserById(id: string) {
    return await User.findById(id);
  },
  async getUserByRole(role: string | null) {
    return await User.find({ role });
  },
};
