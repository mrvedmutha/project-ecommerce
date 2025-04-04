import "next-auth";
import { DefaultSession } from "next-auth";
import "next";

declare module "next-auth" {
  interface User {
    _id?: string;
    username?: string;
    name?: string;
    email?: string;
    role?: string;
    isVerified?: boolean;
    isStoreSetup?: boolean;
  }
  interface Session {
    user: {
      _id?: string;
      username?: string;
      name?: string;
      email?: string;
      role?: string;
      isVerified?: boolean;
      isStoreSetup?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    name?: string;
    email?: string;
    role?: string;
    isVerified?: boolean;
    isStoreSetup?: boolean;
  }
}

declare module "next/server" {
  interface NextRequest {
    session: {
      user: any;
    };
  }
}
