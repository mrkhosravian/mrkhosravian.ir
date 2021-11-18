import { FC, PropsWithChildren, useState } from "react";
import classNames from "classnames";
import ChevronDown from "../icons/chevron-down";

interface Props {
  title: string;
}

export const Accordion: FC<PropsWithChildren<Props>> = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={"accordion rounded overflow-hidden shadow-xl"}>
      <div className="bg-gray-300 dark:bg-gray-900 py-3 p-5 flex justify-between"
           onClick={() => setOpen(prevState => !prevState)}>
        {props.title}
        <ChevronDown
          className={classNames("transform rotate-90 transition-transform duration-200", {
            "rotate-0": open
          })} />
      </div>
      <div className={classNames("overflow-hidden bg-gray-300 dark:bg-gray-900 bg-opacity-40 dark:bg-opacity-70", {
        "h-0": !open,
        "p-4": open
      })}>
        {props.children}
      </div>
    </div>
  );
};

export default Accordion;
