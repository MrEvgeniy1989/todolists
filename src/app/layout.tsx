import { queryClient } from "@/shared/api/query-client";
import { Header } from "@/shared/components/header/header";
import { ThemeProvider } from "@/shared/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export function generateMetadata(): Metadata {
  return {
    title: "Todolists",
    description: "This is a task tracking app.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={"flex h-dvh justify-center"}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <main className={"h-full w-full max-w-[1280px]"}>
              <Header />
              <div className={"h-[calc(100%-60px)]"}>{children}</div>
            </main>
          </ThemeProvider>
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
