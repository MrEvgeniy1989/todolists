"use client"
import { useAuthStore } from "@/features/auth/model/auth-store"
import { useLogoutMutation } from "@/shared/api/hooks/use-logout-mutation"
import { ChangeThemeButton } from "@/shared/components/change-theme-button/change-theme-button"
import { LogoIcon } from "@/shared/components/icons/logo-icon"
import { ROUTES_PATH } from "@/shared/constants/routes"
import Link from "next/link"

export const Header = () => {
  const { isLoggedIn } = useAuthStore()
  const { mutate: logout } = useLogoutMutation()

  const handleLogout = () => {
    logout()
  }

  return (
    <header
      className={
        "h-headerHeight bgSecondary flex w-full items-center justify-between pt-1 pr-5 pb-1 pl-5 shadow-md"
      }
    >
      <Link href={"/"}>
        <LogoIcon />
      </Link>
      <div className={"flex gap-2"}>
        <Link href={"/"}>Home</Link>
        <Link href={ROUTES_PATH.auth.login}>Sign In</Link>
        <Link href={ROUTES_PATH.auth.register}>Sign up</Link>
        {isLoggedIn && <button onClick={handleLogout}>Выход</button>}
        <ChangeThemeButton />
      </div>
    </header>
  )
}
