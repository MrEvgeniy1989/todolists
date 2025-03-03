"use client";
import { authApi } from "@/features/auth/api/auth-api";
import { ChangeThemeButton } from "@/shared/components/change-theme-button/change-theme-button";
import { LogoIcon } from "@/shared/components/icons/logo-icon";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const Header = () => {
  const router = useRouter();
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      console.log("Starting logout...");
      const response = await authApi.logout();
      console.log("Logout response:", response);
      return response;
    },
    onSuccess: () => {
      console.log("Logout successful");
      localStorage.removeItem("accessToken");
      router.push("/auth/sign-in");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleLogout = () => {
    const cookies = document.cookie;
    console.log("Current cookies:", cookies);
    logout();
  };

  return (
    <header
      className={"h-headerHeight bgSecondary flex w-full items-center justify-between pt-1 pr-5 pb-1 pl-5 shadow-md"}
    >
      <Link href={"/"}>
        <LogoIcon />
      </Link>
      <div className={"flex gap-2"}>
        <button onClick={handleLogout}>Logout</button>
        <ChangeThemeButton />
      </div>
    </header>
  );
};
