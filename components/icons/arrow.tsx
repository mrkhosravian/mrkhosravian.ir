import { FC } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";

const Arrow: FC = () => {

  const router = useRouter();

  return (
    <svg width="22" height="22" viewBox="0 0 22 22"
         className={classNames("mr-2", { "transform rotate-180": router.locale === "fa" })}>
      <g fill="none" fillRule="evenodd">
        <path stroke="#000" strokeOpacity=".012"
              strokeWidth=".5"
              d="M21 1v20.16H.84V1z">
        </path>
        <path className="fill-current"
              d="M13.854 7.224l-3.847 3.856 3.847 3.856-1.184 1.184-5.04-5.04 5.04-5.04z">
        </path>
      </g>
    </svg>
  );
};
export default Arrow;
