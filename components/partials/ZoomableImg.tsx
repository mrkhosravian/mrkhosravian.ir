import React, {
  FC,
  PropsWithChildren,
  useContext,
  useState,
  useRef
} from "react";
import Image from "next/image";
import classNames from "classnames";

interface Props {
  src: string;
  alt: string;
}

export const ZoomableImg: FC<PropsWithChildren<Props>> = (props) => {

  const containerRef = useRef<HTMLDivElement>(null);

  const [clicked, setClicked] = useState(false);

  const handleImageZoom = () => {
    if (!containerRef.current || clicked) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    let clientHeight = containerRect.height;
    let clientWidth = containerRect.width;

    const wPrim = (window.innerWidth - containerRect.width) / 2;
    const hPrim = (window.innerHeight - containerRect.height) / 2;
    const cL = containerRect.left;
    const cT = containerRect.top;

    if (window.innerWidth >= window.innerHeight) {
      containerRef.current.style.transform = `translate(${wPrim - cL}px,${hPrim - cT}px) scale(${(window.innerHeight * .9) / clientHeight})`;
    } else {
      containerRef.current.style.transform = `translate(${wPrim - cL}px,${hPrim - cT}px) scale(${(window.innerWidth * .9) / clientWidth})`;
    }

    // if (clientWidth >= clientHeight) {
    //   containerRef.current.style.transform = `translate(${wPrim - cL}px,${hPrim - cT}px) scale(${(window.innerWidth * .9) / clientWidth})`;
    // } else {
    //   containerRef.current.style.transform = `translate(${wPrim - cL}px,${hPrim - cT}px) scale(${(window.innerHeight * .9) / clientHeight})`;
    // }

    window.document.addEventListener("scroll", closeWrapper, { once: true });

    setClicked(true);
  };

  const closeWrapper = () => {
    if (!containerRef.current) return;

    containerRef.current.style.transform = `scale(1)`;
    setClicked(false);
  };

  return (
    <>
      <div
        style={{ aspectRatio: "1/1" }}
        className={classNames("relative transition-all duration-300", { "z-50": clicked })}
        ref={containerRef}>
        <Image src={props.src} alt={props.alt}
               layout={"fill"}
               objectFit={"contain"}
               className={classNames("bg-gray-200 dark:bg-gray-700 shadow-2xl rounded")}
               onClick={handleImageZoom} />
      </div>
      {clicked
        ? <div id="image_gallery_wrapper"
               className={"bg-white dark:bg-gray-900 opacity-80 fixed z-40 top-0 left-0 w-full h-full"}
               onClick={closeWrapper}
        />
        : null}
    </>
  );
};

export default ZoomableImg;