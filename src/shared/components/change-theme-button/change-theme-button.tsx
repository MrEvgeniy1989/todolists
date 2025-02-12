"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ChangeThemeButton = () => {
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
    <button onClick={changeThemeOnClick} className={"border mr-10 px-3 py-1"}>
      {theme === "light" ? "light" : "dark"}
    </button>
  );
};
