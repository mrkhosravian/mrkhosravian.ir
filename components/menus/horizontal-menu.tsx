import { FC } from "react";

const HorizontalMenu: FC = () => {
  return (
    <ul className={"flex space-x-12"}>
      <li>Home</li>
      <li>Projects</li>
      <li>About</li>
    </ul>
  );
};

export default HorizontalMenu;
