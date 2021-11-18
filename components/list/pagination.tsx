import Link from "next/link";
import { BlogConfig } from "../../lib/config";
import { useTranslation } from "next-i18next";

interface Props {
  totalPages: number;
  currentPage: number;
}

export default function Pagination(props: Props) {
  const { totalPages, currentPage } = props;
  const hasNextPage = Math.ceil(totalPages / BlogConfig.pagination.perPage) > currentPage;
  const hasPreviousPage = currentPage > 1;

  const prevPageUrl =
    currentPage === 2
      ? "/blog"
      : `/blog/page/${currentPage - 1}`;

  const nextPageUrl = `/blog/page/${currentPage + 1}`;

  const { t } = useTranslation("common");

  return (
    <ol className={"flex justify-between items-center mt-10"}>
      <li>
        {!hasPreviousPage && <span className={"py-2 px-5 rounded ring-1 ring-gray-900 dark:ring-white opacity-10 bg-white dark:bg-gray-900 bg-opacity-20"}>{t("Previous page")}</span>}
        {hasPreviousPage && (
          <Link href={prevPageUrl}>
            <a className={"py-2 px-5 rounded ring-1 ring-gray-900 dark:ring-white bg-white dark:bg-gray-900 dark:bg-opacity-20 hover:text-white dark:hover:text-gray-900 hover:bg-gray-900 dark:hover:bg-white hover:text-black transition"}>{t("Previous page")}</a>
          </Link>
        )}
      </li>
      <li>
        {t('Page')} {currentPage} {t('of')} {totalPages}
      </li>
      <li>
        {!hasNextPage && <span className={"py-2 px-5 rounded ring-1 ring-gray-900 dark:ring-white opacity-10 bg-gray-900 bg-opacity-20"}>{t("Next page")}</span>}
        {hasNextPage && (
          <Link href={nextPageUrl}>
            <a className={"py-2 px-5 rounded ring-1 ring-gray-900 dark:ring-white bg-white dark:bg-gray-900 dark:bg-opacity-20 hover:text-white dark:hover:text-gray-900 hover:bg-gray-900 dark:hover:bg-white hover:text-black transition"}>{t("Next page")}</a>
          </Link>
        )}
      </li>
    </ol>
  );
}
