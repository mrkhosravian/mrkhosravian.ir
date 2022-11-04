import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";

const HorizontalMenu: FC = () => {

  const { t } = useTranslation();

  return (
    <ul className={"hidden md:flex"}>
      <li>
        <Link href={"/"} className={"py-2 px-5"}>
          {t("Home")}
        </Link>
      </li>
      <li>
        <Link href={"/projects"} className={"py-2 px-5"}>
          {t("Projects")}
        </Link>
      </li>
      {/*<li>*/}
      {/*  <Link href={"/play"}>*/}
      {/*    <a className={"py-2 px-5"}>{t("Play")}</a>*/}
      {/*  </Link>*/}
      {/*</li>*/}
      <li>
        <Link href={"/blog"} className={"py-2 px-5"}>
          {t("Blog")}
        </Link>
      </li>
    </ul>
  );
};

export default HorizontalMenu;
