import * as React from "react";
import { FC } from "react";
import { useTranslation } from "next-i18next";

interface Props {
  href: string;
}

const DownloadBtn: FC<Props> = ({ href }) => {

  const { t } = useTranslation();

  return (
    <a href={href}
       className=" bg-gradient-to-br from-yellow-400 to-red-400 opacity-80 hover:opacity-100 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
      <svg className="fill-current w-4 h-4 ltr:mr-2 rtl:ml-2"
           xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
      </svg>
      <span>{t("Download")}</span>
    </a>
  );
};

export default DownloadBtn;
