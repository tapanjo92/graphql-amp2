"use client";

import React from "react";
// No need for useAuthenticator here anymore!
import HeaderComponent from "../components/HeaderComponent";

export default function ClientLayout({ children }: { children: React.ReactNode }) {

    // Get shouldShowHeader from the parent (Providers)
    const shouldShowHeader = (children as React.ReactElement).props['data-should-show-header'] === 'true';


  return (
    <>
      {shouldShowHeader && <HeaderComponent />}
      {children}
    </>
  );
}
