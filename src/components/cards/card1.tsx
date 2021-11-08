import * as React from "react";

interface Card1Props {
  className?: string;
}

const Card1: React.FunctionComponent<React.PropsWithChildren<Card1Props>> = (props) => {
  return (
    <div
      className={"border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 rounded-3xl".concat(` ${props.className}`)}>
      {props.children}
    </div>
  );
};

export default Card1;
