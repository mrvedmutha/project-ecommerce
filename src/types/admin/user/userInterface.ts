export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: string;
  isStoreSetup: boolean;
}
