import * as React from "react";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div
      className={"px-5 md:px-0 text-sm border-t border-gray-200 dark:border-gray-600 absolute bottom-0 left-0 w-full bg-white dark:bg-gray-900"}>
      <span
        className="block max-w-5xl mx-auto text-gray-900 dark:text-white text-opacity-60 py-3">
        {t("copyright", { year: new Date().getFullYear() })}
      </span>
    </div>
  );
};

export default Footer;
