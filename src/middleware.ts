import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Roles } from "@/enum/enumexports";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req: req,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const url = req.nextUrl;
  const urlPath = url.pathname;

  const exemptPaths = ["/register", "/verify", "/admin/register", "/login"];

  if (exemptPaths.includes(urlPath)) {
    if (token) {
      const userRole = token.role;
      if (
        userRole === Roles.SUPERADMIN ||
        userRole === Roles.ADMIN ||
        userRole === Roles.EDITOR ||
        userRole === Roles.INVENTORY ||
        userRole === Roles.MARKETER
      ) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }

      if (userRole === Roles.CUSTOMER) {
        return NextResponse.redirect(new URL("/cx/dashboard", req.url));
      }
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const userRole = token.role;
  if (
    userRole === Roles.SUPERADMIN ||
    userRole === Roles.ADMIN ||
    userRole === Roles.EDITOR ||
    userRole === Roles.INVENTORY ||
    userRole === Roles.MARKETER
  ) {
    if (
      urlPath.startsWith("/register") ||
      urlPath.startsWith("/cx") ||
      urlPath === "/verify" ||
      urlPath === "/admin/register"
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  if (userRole === Roles.CUSTOMER) {
    if (urlPath.startsWith("/admin") || urlPath === "/register") {
      return NextResponse.redirect(new URL("/cx/dashboard", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/cx/:path*",
    "/login",
    "/register",
    "/verify",
    "/admin/register",
  ],
};
