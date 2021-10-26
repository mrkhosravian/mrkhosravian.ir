import { FunctionComponent, PropsWithChildren } from "react";

interface Card1Props {
  className?: string;
}

const Card1: FunctionComponent<PropsWithChildren<Card1Props>> = (props) => {
  return (
    <div
      className={"border border-gray-200 bg-white p-5 rounded-3xl".concat(` ${props.className}`)}>
      {props.children}
    </div>
  );
};

export default Card1;
