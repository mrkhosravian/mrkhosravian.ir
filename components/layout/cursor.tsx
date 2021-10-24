import { FC, useEffect, useRef } from "react";

const Cursor: FC = () => {

  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      if (cursor.current) {
        cursor.current.style.top = e.pageY + "px";
        cursor.current.style.left = e.pageX + "px";
      }
    });

    window.addEventListener("mousedown", () => {
      cursor.current!.classList.add("bg-gray-500");
      cursor.current!.classList.add("scale-75");
      cursor.current!.classList.remove("bg-gray-400");
      cursor.current!.classList.remove("opacity-60");
    });

    window.addEventListener("mouseup", () => {
      cursor.current!.classList.add("bg-gray-400");
      cursor.current!.classList.add("opacity-60");
      cursor.current!.classList.remove("scale-75");
      cursor.current!.classList.remove("bg-gray-500");
    });
  }, []);

  return (
    <div
      className={"cursor bg-gray-400 opacity-60"}
      ref={cursor} />
  );
};

export default Cursor;
