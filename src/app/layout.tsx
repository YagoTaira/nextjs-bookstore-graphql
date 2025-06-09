"use client";

import "./globals.css";
import { RelayEnvironmentProvider } from "react-relay";
import { RelayEnvironment } from "@/lib/relay/RelayEnvironment";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <RelayEnvironmentProvider environment={RelayEnvironment}>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </RelayEnvironmentProvider>
      </body>
    </html>
  );
}
