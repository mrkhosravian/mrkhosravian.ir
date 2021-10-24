import { FC, PropsWithChildren } from "react";
import Cursor from "./cursor";
import Header from "./header";

interface LayoutProps {
}

const Layout: FC<PropsWithChildren<LayoutProps>> = (props) => {
  return (
    <div className={"h-64"}>
      <Header />
      {props.children}
      <Cursor />
    </div>
  );
};

export default Layout;
