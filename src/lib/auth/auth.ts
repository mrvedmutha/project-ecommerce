import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/database/connectToDatabase";
import User from "@/models/admin/user/user";
import bcrypt from "bcryptjs";
import CxUser from "@/models/customer/user/user";
import { Roles } from "@/enum/enumexports";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, res: any): Promise<any> {
        try {
          await dbConnect();
          let user = await User.findOne({
            $or: [
              { email: credentials.identifier },
              { identifier: credentials.identifier },
            ],
          });

          if (!user) {
            user = await CxUser.findOne({
              $or: [
                { email: credentials.identifier },
                { identifier: credentials.identifier },
              ],
            });
          }
          if (!user) {
            throw new Error("User not found");
          }
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Password is incorrect");
          }
          return user;
        } catch (error: any) {
          throw new Error("Error connecting to database", error);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.role = user.role;
        token.name = user.name;
        if (user.role === Roles.CUSTOMER) {
          token.isVerified = user.isVerified;
        }
        if (user.role === Roles.SUPERADMIN || user.role === Roles.ADMIN) {
          token.isStoreSetup = user.isStoreSetup;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.role = token.role;
        session.user.name = token.name;
        if (token.role === Roles.CUSTOMER) {
          session.user.isVerified = token.isVerified;
        }
        if (token.role === Roles.SUPERADMIN || token.role === Roles.ADMIN) {
          session.user.isStoreSetup = token.isStoreSetup;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};
