"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Roles } from "@/enum/enumexports";
import { NextResponse } from "next/server";
import { AppSidebar } from "@/components/common/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const AdminDashboard = () => {
  const { data: session, status } = useSession();
  console.log(status);
  if (status) {
    if (status === "loading") {
      return <div>Please Wait...</div>;
    }
    if (status === "unauthenticated") {
      return <div>unauthenticated</div>;
    }
  }
  if (session && session.user.role === Roles.CUSTOMER) {
    return <div>Unauthorized</div>;
  }
  return (
    <SidebarProvider>
      <div>
        <AppSidebar
          userEmail={session?.user.email}
          onLogout={() => {
            signOut();
            NextResponse.redirect("/login");
          }}
        />
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
