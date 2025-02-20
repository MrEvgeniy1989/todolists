import { ChangeThemeButton } from "@/shared/components/change-theme-button/change-theme-button";
import { LogoIcon } from "@/shared/components/icons/logo-icon";
import Link from "next/link";

export const Header = () => {
  return (
    <div className={"h-headerHeight bg-Dark-500 flex w-full items-center justify-between border"}>
      <Link href={"/"}>
        <LogoIcon />
      </Link>
      <ChangeThemeButton />
    </div>
  );
};
