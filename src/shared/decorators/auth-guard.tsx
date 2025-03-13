"use client"

import { useAuthStore } from "@/features/auth/model/auth-store"
import { useMeQuery } from "@/shared/api/use-me-query/use-me-query"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useEffect, useLayoutEffect, useState } from "react"

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const currentPath = usePathname()
  const { setIsLoggedIn, setUser } = useAuthStore()
  const { data: me, isLoading } = useMeQuery()
  const hasToken = typeof window !== "undefined" && !!localStorage.getItem("accessToken")
  const isPublicPath = currentPath.startsWith("/auth")

  const [mounted, setMounted] = useState(false)
  useLayoutEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || isLoading) return

    if (hasToken && me && (currentPath === "/" || isPublicPath)) {
      setUser(me)
      setIsLoggedIn(true)
      router.push("/todolists")
    } else if ((!hasToken || !me) && !isPublicPath) {
      setIsLoggedIn(false)
      setUser(null)
      router.push("/auth/sign-in")
    }
  }, [mounted, isLoading, hasToken, me, isPublicPath, router, currentPath, setIsLoggedIn, setUser])

  useEffect(() => {
    const handleLogout = () => {
      setIsLoggedIn(false)
      setUser(null)
      if (!isPublicPath) {
        router.push("/auth/sign-in")
      }
    }
    window.addEventListener("auth:logout", handleLogout)
    return () => window.removeEventListener("auth:logout", handleLogout)
  }, [isPublicPath, router, setIsLoggedIn, setUser])

  if (!mounted) return null

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    )
  }

  return <>{children}</>
}

export default AuthGuard
