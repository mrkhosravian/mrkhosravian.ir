import { useRouter } from "next/router";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useTheme } from "next-themes";

const Settings: FunctionComponent = () => {

  const router = useRouter();

  const { setTheme, resolvedTheme } = useTheme();

  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const toggleOpen = () => {
    setOpen(true);
  };

  useOnClickOutside(ref, useCallback(() => {
      if (!open)
        return;
      setOpen(false);
    }, [open])
  );

  function changeLocale(locale: "fa" | "en") {
    if (router.locale === locale)
      return;

    const { pathname, asPath, query } = router;
    router.push({
      pathname,
      query
    }, asPath, { locale: locale })
      .then(() => {
        document.documentElement.setAttribute("dir", locale === "en" ? "ltr" : "rtl");
      });
  }

  const toggleLight = useCallback(() => setTheme("light"), [setTheme]);
  const toggleDark = useCallback(() => setTheme("dark"), [setTheme]);

  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      ref={ref}
      className={classNames("bg-white dark:bg-gray-600 rounded-xl fixed left-5 md:left-16 bottom-5 md:bottom-16 drop-shadow-xl overflow-hidden duration-100 select-none bg-gray-300 z-40", {
        "w-16 h-16": !open,
        "w-56 h-56": open
      })}
    >
      <div
        className={classNames("absolute left-0 bottom-0 w-16 h-16 flex items-center justify-center", {
          hidden: open,
          "text-gray-900 dark:text-white": !open
        })}
        onClick={toggleOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div className={
        classNames(
          "w-56 h-56 absolute left-0 bottom-0 flex flex-col justify-between p-3", {
            hidden: !open
          })}>
        <div>
          <span>{t("Theme")}</span>
          <ul
            className={"flex justify-between py-2 px-3 rounded bg-gray-200 dark:bg-gray-500 mt-2"}
            style={{ direction: "ltr" }}>
            <li className={"flex-1"}>
              <button
                onClick={toggleLight}
                className={classNames("w-full py-2 px-3 rounded", {
                  "bg-gray-100 dark:bg-gray-700": resolvedTheme === "light"
                })}>Light
              </button>
            </li>
            <li className={"flex-1 ml-3"}>
              <button
                onClick={toggleDark}
                className={classNames("w-full py-2 px-3 rounded", {
                  "bg-gray-100 dark:bg-gray-700": resolvedTheme === "dark"
                })}>Dark
              </button>
            </li>
          </ul>
        </div>
        <div>
          <span>{t("Language")}</span>
          <ul
            className={"flex justify-between py-2 px-3 rounded bg-gray-200 dark:bg-gray-500 mt-2"}
            style={{ direction: "ltr" }}>
            <li className={"flex-1"}>
              <button
                onClick={() => changeLocale("en")}
                className={classNames("w-full py-2 px-3 rounded", {
                  "bg-gray-100 dark:bg-gray-700": router.locale === "en"
                })}>EN
              </button>
            </li>
            <li className={"flex-1 ml-3"}>
              <button
                onClick={() => changeLocale("fa")}
                className={classNames("w-full py-2 px-3 rounded", {
                  "bg-gray-100 dark:bg-gray-700": router.locale === "fa"
                })}>FA
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
