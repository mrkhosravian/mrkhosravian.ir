import { FC, PropsWithChildren } from "react";
import Header from "./header";
import Footer from "./footer";
import Base from "./base";

interface LayoutProps {
}

const Layout: FC<PropsWithChildren<LayoutProps>> = (props) => {
  return (
    <Base>
      <div
        className={"relative min-h-screen w-full float-left bg-gray-100 dark:bg-gray-800"}>
          <Header />
          {props.children}
          <Footer />
      </div>
    </Base>
  );
};

export default Layout;
