import React, { FC, PropsWithChildren, useContext, useState } from "react";
import classNames from "classnames";

interface Props {
  src: string;
  alt: string;
}

export const ZoomableImg: FC<PropsWithChildren<Props>> = (props) => {

  const [clicked, setClicked] = useState(false);

  const handleImageZoom = () => {
    setClicked(true);
  };

  const closeWrapper = () => {
    setClicked(false);
  };

  return (
    <div className={"relative w-full h-full"}>
      <img src={props.src} alt={props.alt}
           className={classNames("transition-all duration-300", {
             // "absolute": !clicked,
             "fixed": clicked,
             "left-0": clicked,
             "top-0": clicked,
             "right-0": clicked,
             "bottom-0": clicked,
             "m-auto": clicked,
             "h-3/4": clicked,
             "h-full": !clicked,
             "z-50": clicked,
             "rounded": clicked,
             "shadow-2xl": clicked
           })} onClick={handleImageZoom} />
      {clicked
        ? <div id="image_gallery_wrapper"
               className={"bg-white dark:bg-gray-900 opacity-80 fixed z-40 top-0 left-0 w-full h-full"}
               onClick={closeWrapper}
        />
        : null}
    </div>
  );
};

export default ZoomableImg;