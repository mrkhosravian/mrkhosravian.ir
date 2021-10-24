import { FC } from "react";
import HorizontalMenu from "../menus/horizontal-menu";

const Header: FC = () => {
  return (
    <div
      className={"py-3 border border-b-1 border-gray-300"}>
      <div className="max-w-5xl mx-auto flex justify-between">
        <h1 className={"w-64 font-bold"}>Mohammad Reza Khosravian</h1>
        <HorizontalMenu />
        <a className={"w-64 text-right"} href="#">Contact</a>
      </div>
    </div>
  );
};

export default Header;
