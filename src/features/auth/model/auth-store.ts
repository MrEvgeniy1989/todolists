import { UserT } from "@/entities/user/model/user.types"
import { create } from "zustand"

export type AuthStoreT = {
  isLoggedIn: boolean
  user: UserT | null
  setIsLoggedIn: (isLoggedIn: boolean) => void
  setUser: (user: UserT | null) => void
}

export const useAuthStore = create<AuthStoreT>()((set) => ({
  isLoggedIn: false,
  user: null,
  setIsLoggedIn: (isLoggedIn: boolean) => {
    set({ isLoggedIn })
  },
  setUser: (user: UserT | null) => {
    set({ user })
  },
}))
