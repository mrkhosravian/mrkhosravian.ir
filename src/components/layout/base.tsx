import * as React from "react";
import Cursor from "./cursor";
import Settings from "../menus/settings";

interface LayoutProps {
}

const Base: React.FC<React.PropsWithChildren<LayoutProps>> = (props) => {
  return (
    <>
      {props.children}
      <Cursor />
      <Settings />
    </>
  );
};

export default Base;
