import { queryClient } from "@/shared/api/query-client"
import { ThemeProvider } from "@/shared/components/theme-provider"
import AuthGuard from "@/shared/decorators/auth-guard"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { domAnimation, LazyMotion } from "framer-motion"
import { type PropsWithChildren } from "react"

export const ProvidersAndDecorators = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <LazyMotion features={domAnimation}>
          <AuthGuard>{children}</AuthGuard>
        </LazyMotion>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
