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
        className={classNames("lg:hidden backdrop-blur-3xl backdrop-filter bg-opacity-0 fixed left-0 bottom-full h-full w-full transition-transform duration-300 ease-in-out transform z-30", {
          "translate-y-full": open
        })}>
        <div
          className="w-full h-full flex justify-center items-center text-center">
          <ul className={"lg:hidden text-4xl space-y-16"}>
            <li>
              <Link href={"/"}>
                <a className={classNames("py-2 px-5", {
                  "opacity-70": router.pathname !== "/",
                  "text-6xl": router.pathname === "/"
                })}>{t("Home")}</a>
              </Link>
            </li>
            <li>
              <Link href={"/projects"}>
                <a className={classNames("py-2 px-5", {
                  "opacity-70": router.pathname !== "/projects",
                  "text-6xl": router.pathname === "/projects"
                })}>{t("Projects")}</a>
              </Link>
            </li>
            <li>
              <Link href={"/blog"}>
                <a className={classNames("py-2 px-5", {
                  "opacity-70": router.pathname !== "/blog",
                  "text-6xl": router.pathname === "/blog"
                })}>{t("Blog")}</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
