import classNames from "classnames";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Hamburger: FC<Props> = ({ open, setOpen }: Props) => {

  const { t } = useTranslation();

  const [loaded, setLoaded] = useState(false);

  const increase = () => {
    setTimeout(() => {
      setLoaded(true);
    }, 300);
  };

  const decrease = () => {
    setLoaded(false);
  };

  useEffect(() => {
    if (open)
      increase();
    else
      decrease();
  }, [open]);

  return (
    <button className={classNames("lg:hidden z-50 transition-width-height", {
      "w-16 h-16 transform translate-y-10 -translate-x-10": loaded,
      "w-6 h-6": !loaded
    })} onClick={() => {
      setOpen(prevState => !prevState);
    }}>
      <div className="relative">
        <span aria-hidden="true"
              className={classNames("block rounded-2xl absolute  h-0.5 w-full bg-current transform  transition duration-300 ease-in-out", {
                "rotate-45": open,
                "translate-y-2": !open
              })} />
        <span aria-hidden="true"
              className={classNames("block rounded-2xl absolute  h-0.5 w-full bg-current transform transition duration-300 ease-in-out", { "opacity-0": open })} />
        <span aria-hidden="true"
              className={classNames("block rounded-2xl absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out", {
                "-rotate-45": open,
                "-translate-y-2": !open
              })} />
      </div>
    </button>
  );
};

export default Hamburger;
