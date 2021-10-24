import { FC } from "react";
import HorizontalMenu from "../menus/horizontal-menu";

const Header: FC = () => {
  return (
    <div
      className={"py-5 border border-b-2 border-gray-400"}>
      <div className="container mx-auto flex justify-between">
        logo
        <HorizontalMenu />
        link
      </div>
    </div>
  );
};

export default Header;
