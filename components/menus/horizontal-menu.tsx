import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const HorizontalMenu: FC = () => {

  const { t } = useTranslation();

  return (
    <ul className={"hidden md:flex"}>
      <li>
        <Link href={"/"}>
          <a className={"py-2 px-5"}>{t("Home")}</a>
        </Link>
      </li>
      <li>
        <Link href={"/projects"}>
          <a className={"py-2 px-5"}>{t("Projects")}</a>
        </Link>
      </li>
      {/*<li>*/}
      {/*  <Link href={"/play"}>*/}
      {/*    <a className={"py-2 px-5"}>{t("Play")}</a>*/}
      {/*  </Link>*/}
      {/*</li>*/}
      <li>
        <Link href={"/blog"}>
          <a className={"py-2 px-5"}>{t("Blog")}</a>
        </Link>
      </li>
    </ul>
  );
};

export default HorizontalMenu;
