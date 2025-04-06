// In _app.jsx or layout.jsx (Next.js 13+)
"use client";
import { SessionProvider } from "next-auth/react";
import SessionWrapper from "@/components/common/SessionWrapper";

export default function AdminLayout({ children }: any) {
  return (
    <SessionProvider>
      <SessionWrapper>{children}</SessionWrapper>
    </SessionProvider>
  );
}
