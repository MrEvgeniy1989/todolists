import "./globals.css";
import { Header } from "@/shared/components/header/header";
import { ThemeProvider } from "@/shared/components/theme-provider";
import { ReactNode } from "react";
import type { Metadata } from "next";

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
      <body className={"h-dvh flex justify-center dark:bg-dark-100 bg-dark-100"}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className={"max-w-[1280px] h-full w-full"}>
            <Header />
            <div className={"h-[calc(100%-60px)]"}>{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
