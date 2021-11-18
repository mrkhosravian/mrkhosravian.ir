import * as React from "react";
import classNames from "classnames";

interface Props {
  className: string;
}

const ChevronDown: React.FC<Props> = ({ className }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         className={classNames("h-6 w-6", className.split(" "))} fill="none"
         viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 9l-7 7-7-7" />
    </svg>
  );
};

export default ChevronDown;
