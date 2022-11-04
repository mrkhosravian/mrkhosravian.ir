import { FunctionComponent } from "react";
import HorizontalMenu from "../menus/horizontal-menu";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import HamburgerMenu from "../menus/hamburger-menu";

const Header: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <div
      className={"py-3 px-5 xl:px-0 border-b border-gray-300 dark:border-gray-600 dark:bg-gray-900 fixed top-0 left-0 w-full bg-white z-20"}>
      <div className="max-w-5xl mx-auto flex justify-between relative">
        <h1 className={"w-64 font-bold text-gradient"}>
          <Link href={"/"}>
            {t("logo")}
          </Link>
        </h1>
        <HorizontalMenu />
        <HamburgerMenu />
        {/*<a className={"w-64 text-right rtl:text-left hidden md:block"} href="#">{t('Contact')}</a>*/}
      </div>
    </div>
  );
};

export default Header;
