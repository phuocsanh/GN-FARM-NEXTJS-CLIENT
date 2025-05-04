"use client";

import React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import AppProviderTanStack from "./app-provider-tanstack";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <AppProviderTanStack>
        {children}
      </AppProviderTanStack>
      <Toaster />
    </ThemeProvider>
  );
}
