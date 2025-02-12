"use client";
import { LogoIcon } from "@/shared/components/icons/logo-icon";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const changeThemeOnClick = () => setTheme(theme === "light" ? "dark" : "light");

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <div className={"flex justify-between items-center w-full h-[60px]"}>
      <Link href={"/"}>
        <LogoIcon />
      </Link>
      <button onClick={changeThemeOnClick} className={"border mr-10 px-3 py-1"}>
        {theme === "light" ? "light" : "dark"}
      </button>
    </div>
  );
};
