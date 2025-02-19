"use client";

import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { usePathname } from "next/navigation";
import HeaderComponent from "../components/HeaderComponent";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { route, authStatus } = useAuthenticator((context) => [context.route, context.authStatus]);
  const pathname = usePathname();
  const isProtectedRoute = pathname.startsWith('/pte') || pathname.startsWith('/profile');
  const isAuthenticated = route === 'authenticated' && authStatus === "authenticated";

  return (
    <>
      {isAuthenticated && isProtectedRoute && <HeaderComponent />}
      {children}
    </>
  );
}
