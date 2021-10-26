import { FC } from "react";
import Link from "next/link";

const HorizontalMenu: FC = () => {
  return (
    <ul className={"hidden md:flex"}>
      <li>
        <Link href={"/"}>
          <a className={"py-2 px-5"}>Home</a>
        </Link>
      </li>
      <li>
        <Link href={"/projects"}>
          <a className={"py-2 px-5"}>Projects</a>
        </Link>
      </li>
      {/*<li>*/}
      {/*  <Link href={"/play"}>*/}
      {/*    <a className={"py-2 px-5"}>Play</a>*/}
      {/*  </Link>*/}
      {/*</li>*/}
      <li>
        <Link href={"/blog"}>
          <a className={"py-2 px-5"}>Blog</a>
        </Link>
      </li>
    </ul>
  );
};

export default HorizontalMenu;
