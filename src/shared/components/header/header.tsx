import { ChangeThemeButton } from "@/shared/components/change-theme-button/change-theme-button";
import { LogoIcon } from "@/shared/components/icons/logo-icon";
import Link from "next/link";

export const Header = () => {
  return (
    <div className={"flex justify-between items-center w-full h-[60px]"}>
      <Link href={"/"}>
        <LogoIcon />
      </Link>
      <ChangeThemeButton />
    </div>
  );
};
