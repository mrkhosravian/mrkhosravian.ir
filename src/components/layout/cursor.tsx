import * as React from "react";

const Cursor: React.FC = () => {

  const cursor = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);

  const mouseDownHandler = React.useCallback(() => {
    if (cursor.current) {
      cursor.current.classList.add("bg-gray-500");
      cursor.current.classList.add("scale-75");
      cursor.current.classList.remove("bg-gray-400");
      cursor.current.classList.remove("opacity-60");
    }
  }, []);

  const mouseUpHandler = React.useCallback(() => {
    if (cursor.current) {
      cursor.current.classList.add("bg-gray-400");
      cursor.current.classList.add("opacity-60");
      cursor.current.classList.remove("scale-75");
      cursor.current.classList.remove("bg-gray-500");
    }
  }, []);

  const cursorShow = React.useCallback(() => {
    setShow(true);
  }, []);

  const cursorHide = React.useCallback(() => {
    setShow(false);
  }, []);

  React.useEffect(() => {

    cursorShow();

    window.addEventListener("mousemove", (e) => {
      if (cursor.current) {

        const element = e.target as HTMLElement;

        if (element && element.tagName.toLowerCase() === "a") {
          cursor.current.classList.add("bg-blue-700");
        } else {
          cursor.current.classList.remove("bg-blue-700");
        }

        cursor.current.style.top = e.clientY + "px";
        cursor.current.style.left = e.clientX + "px";
      }
    });

    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("touchstart", mouseDownHandler);

    window.addEventListener("mouseup", mouseUpHandler);
    window.addEventListener("touchend", cursorHide);

    document.addEventListener("mouseenter", cursorShow);
    document.addEventListener("mouseleave", cursorHide);


    return () => {
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("touchstart", mouseDownHandler);

      window.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("touchend", mouseUpHandler);

      document.removeEventListener("mouseenter", cursorShow);
      document.removeEventListener("mouseleave", cursorHide);
    };
  }, [mouseDownHandler, mouseUpHandler, cursorShow, cursorHide]);

  if (!show)
    return null;

  return (
    <div
      className={"cursor bg-gray-400 opacity-60 z-50"}
      ref={cursor} />
  );
};

export default Cursor;
