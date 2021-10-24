import { FC, PropsWithChildren } from "react";
import Cursor from "./cursor";
import Header from "./header";
import Footer from "./footer";

interface LayoutProps {
}

const Layout: FC<PropsWithChildren<LayoutProps>> = (props) => {
  return (
    <div className={"relative min-h-full"}>
      <Header />
      {props.children}
      <Footer />
      <Cursor />
    </div>
  );
};

export default Layout;
