import { FC } from "react";
import HorizontalMenu from "../menus/horizontal-menu";
import Link from "next/link";

const Header: FC = () => {
  return (
    <div
      className={"py-3 px-5 xl:px-0 border-b border-gray-300 fixed top-0 left-0 w-full bg-white bg-opacity-25 backdrop-blur-3xl z-10"}>
      <div className="max-w-5xl mx-auto flex justify-between">
        <h1 className={"w-64 font-bold text-gradient"}>
          <Link href={"/"}>
            <a>Mohammad Reza Khosravian</a>
          </Link>
        </h1>
        <HorizontalMenu />
        <a className={"w-64 text-right hidden md:block"} href="#">Contact</a>
      </div>
    </div>
  );
};

export default Header;
