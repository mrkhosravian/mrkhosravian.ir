import { FC } from "react";

const Footer: FC = () => {
  return (
    <div className={"px-5 md:px-0 text-sm border-t border-gray-200 absolute bottom-0 left-0 w-full bg-white"}>
      <span
        className="block max-w-5xl mx-auto text-gray-900 text-opacity-60 py-3">
        @ {new Date().getFullYear()} Mohammad Reza Khosravian. All rights reserved.
      </span>
    </div>
  );
};

export default Footer;
