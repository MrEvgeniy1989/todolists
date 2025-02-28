import { queryClient } from "@/shared/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { domAnimation, LazyMotion } from "framer-motion";
import { type PropsWithChildren } from "react";
import { ThemeProvider } from "@/shared/components/theme-provider";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <LazyMotion features={domAnimation}>{children}</LazyMotion>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
