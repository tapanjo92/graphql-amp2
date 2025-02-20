"use client";

import React from "react";
import HeaderComponent from "../components/HeaderComponent";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    // Instead of accessing props directly from children, we need to check if it's a View component
    const childrenArray = React.Children.toArray(children);
    const shouldShowHeader = childrenArray.length > 0 && 
        React.isValidElement(childrenArray[0]) && 
        childrenArray[0].props['data-should-show-header'] === 'true';

    return (
        <>
            {shouldShowHeader && <HeaderComponent />}
            {children}
        </>
    );
}
