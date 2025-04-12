"use client";
import * as React from "react";
import { Roles } from "@/enum/enumexports";
import { signOut, useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/common/sidebar/AppSidebar";
import Loading from "@/components/common/LoadlingPage";
import ErrorPage from "@/components/common/ErrorPage";
import { usePathname } from "next/navigation";
import { adminSidebarData } from "@/config/admin/sidebarNavItems";
export default function AdminLayout({ children }: any) {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith("/admin");
  const isCxPath = pathname.startsWith("/cx");
  const userRole = session?.user.role;
  React.useEffect(() => {
    setMounted(true);
  }, [status]);
  if (!mounted && status === "loading") return <Loading />;
  if (status === "unauthenticated")
    return <ErrorPage status={401} message="Unauthorized" />;
  if (session) {
    if (isAdminPath && userRole === Roles.CUSTOMER)
      return <ErrorPage status={403} message="Forbidden" />;
    if (isCxPath && userRole !== Roles.CUSTOMER)
      return <ErrorPage status={403} message="Forbidden" />;
  }
  return (
    <SidebarProvider>
      <div className="sticky top-0 h-screen">
        <AppSidebar
          data={adminSidebarData}
          userEmail={session?.user.email}
          onLogout={() => {
            signOut();
            NextResponse.redirect("/login");
          }}
        />
      </div>
      <div className="w-full px-6 py-4 overflow-y-auto">{children}</div>
    </SidebarProvider>
  );
}
