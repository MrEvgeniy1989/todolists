import { UserT } from "@/entities/user/model/user.types";
import { create } from "zustand";

export type UserStoreT = {
  user: UserT | null;
  setUser: (user: UserT) => void;
};

export const useUserStore = create<UserStoreT>()((set) => ({
  user: null,
  setUser: (user: UserT | null) => set({ user }),
}));
