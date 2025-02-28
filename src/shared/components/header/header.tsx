import { ChangeThemeButton } from "@/shared/components/change-theme-button/change-theme-button";
import { LogoIcon } from "@/shared/components/icons/logo-icon";
import Link from "next/link";

export const Header = () => {
  return (
    <header
      className={
        "h-headerHeight bgSecondary flex w-full items-center justify-between pt-1 pr-5 pb-1 pl-5 shadow-md"
      }
    >
      <Link href={"/"}>
        <LogoIcon />
      </Link>
      <ChangeThemeButton />
    </header>
  );
};
