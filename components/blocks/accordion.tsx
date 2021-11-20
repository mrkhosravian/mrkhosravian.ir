import { FC, PropsWithChildren, useState } from "react";
import classNames from "classnames";
import ChevronDown from "../icons/chevron-down";

interface Props {
  title: string;
  color?: "yellow";
  defaultOpen?: boolean;
}

export const Accordion: FC<PropsWithChildren<Props>> = (props) => {
  const [open, setOpen] = useState(props.defaultOpen || false);

  let contentColors, headerColors;

  switch (props.color) {
    case "yellow":
      headerColors = "bg-yellow-300 dark:bg-yellow-300 text-black";
      contentColors = "bg-yellow-200 dark:bg-yellow-200 text-black bg-opacity-40";
      break;
    default:
      headerColors = "bg-gray-300 dark:bg-gray-900";
      contentColors = "bg-gray-300 dark:bg-gray-900 bg-opacity-40 dark:bg-opacity-70";
  }

  return (
    <div className={"accordion rounded overflow-hidden shadow-lg"}>
      <div
        className={classNames("py-3 p-5 flex justify-between", headerColors)}
        onClick={() => setOpen(prevState => !prevState)}>
        {props.title}
        <ChevronDown
          className={classNames("transform rotate-90 transition-transform duration-200", {
            "rotate-0": open
          })} />
      </div>
      <div
        className={classNames("overflow-hidden", contentColors, {
          "h-0": !open,
          "p-4": open
        })}>
        {props.children}
      </div>
    </div>
  );
};

export default Accordion;
