"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Roles } from "@/enum/enumexports";
import { sign } from "crypto";
import { NextResponse } from "next/server";

const cxDashboard = () => {
  const { data: session, status } = useSession();
  if (status) {
    if (status === "loading") {
      return <div>Please Wait...</div>;
    }
    if (status === "unauthenticated") {
      return <div>unauthenticated</div>;
    }
  }
  if (session && session.user.role !== Roles.CUSTOMER) {
    return <div>Unauthorized</div>;
  }
  return (
    <div>
      <div>cxDashboard</div>
      <button
        onClick={() => {
          signOut();
          NextResponse.redirect("/login");
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default cxDashboard;
