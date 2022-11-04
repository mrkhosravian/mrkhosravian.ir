import { FC, useState } from "react";
import { useTranslation } from "next-i18next";
import classNames from "classnames";
import Link from "next/link";
import Hamburger from "../icons/hamburger";
import { useRouter } from "next/router";

const HamburgerMenu: FC = () => {

  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const router = useRouter();

  return (
    <>
      <Hamburger open={open} setOpen={setOpen} />
      <div
        className={classNames("lg:hidden bg-white dark:bg-gray-900 fixed inset-0 transition-transform duration-300 ease-in-out transform z-30 -translate-y-full", {
          "translate-y-0": open
        })}
      >
        <div
          className="w-full h-full flex justify-center items-center text-center">
          <ul className={"lg:hidden text-4xl space-y-16"}>
            <li>
              <Link href={"/"} className={classNames("py-2 px-5", {
                "opacity-70": router.pathname !== "/",
                "text-6xl": router.pathname === "/"
              })}>
                {t("Home")}
              </Link>
            </li>
            <li>
              <Link href={"/projects"} className={classNames("py-2 px-5", {
                "opacity-70": router.pathname !== "/projects",
                "text-6xl": router.pathname === "/projects"
              })}>
                {t("Projects")}
              </Link>
            </li>
            <li>
              <Link href={"/blog"} className={classNames("py-2 px-5", {
                "opacity-70": router.pathname !== "/blog",
                "text-6xl": router.pathname === "/blog"
              })}>
                {t("Blog")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
