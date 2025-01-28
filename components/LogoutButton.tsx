import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./app.css";
import Providers from "./providers";
import LogoutButton from "../components/LogoutButton"; // Import the LogoutButton component
import { Authenticator } from '@aws-amplify/ui-react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <header>
            <Authenticator>
              {({ signOut, user }) => (
                user && <LogoutButton /> // Render LogoutButton only if user is authenticated
              )}
            </Authenticator>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
