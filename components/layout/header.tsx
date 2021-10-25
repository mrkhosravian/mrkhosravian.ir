import { FC } from "react";
import HorizontalMenu from "../menus/horizontal-menu";

const Header: FC = () => {
  return (
    <div
      className={"py-3 border-b border-gray-300 absolute top-0 left-0 w-full"}>
      <div className="max-w-5xl mx-auto flex justify-between">
        <h1 className={"w-64 font-bold text-gradient"}>Mohammad Reza Khosravian</h1>
        <HorizontalMenu />
        <a className={"w-64 text-right"} href="#">Contact</a>
      </div>
    </div>
  );
};

export default Header;
