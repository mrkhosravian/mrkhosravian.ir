import { FC, PropsWithChildren } from "react";
import Cursor from "./cursor";
import Settings from "../menus/settings";

interface LayoutProps {
}

const Base: FC<PropsWithChildren<LayoutProps>> = (props) => {
  return (
    <>
      {props.children}
      <Cursor />
      <Settings />
    </>
  );
};

export default Base;
