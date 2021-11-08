import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";

const HorizontalMenu: React.FC = () => {

  const { t } = useTranslation();

  return (
    <ul className={"hidden md:flex"}>
      <li>
        <Link to={"/"}>
          <a className={"py-2 px-5"}>{t("Home")}</a>
        </Link>
      </li>
      <li>
        <Link to={"/projects"}>
          <a className={"py-2 px-5"}>{t("Projects")}</a>
        </Link>
      </li>
      {/*<li>*/}
      {/*  <Link href={"/play"}>*/}
      {/*    <a className={"py-2 px-5"}>{t("Play")}</a>*/}
      {/*  </Link>*/}
      {/*</li>*/}
      <li>
        <Link to={"/blog"}>
          <a className={"py-2 px-5"}>{t("Blog")}</a>
        </Link>
      </li>
    </ul>
  );
};

export default HorizontalMenu;
