// In _app.jsx or layout.jsx (Next.js 13+)
"use client";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: any) {
  return <SessionProvider>{children}</SessionProvider>;
}
