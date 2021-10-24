import { FC } from "react";

interface LayoutProps {
}

const Footer: FC = () => {
  return (
    <div className={"border-t border-gray-200 absolute bottom-0 left-0 w-full"}>
      <span
        className="block max-w-5xl mx-auto text-gray-900 text-opacity-60 py-3">
        @ {new Date().getFullYear()} Mohammad Reza Khosravian. All rights reserved.
      </span>
    </div>
  );
};

export default Footer;
