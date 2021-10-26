import { FC, useEffect, useRef } from "react";

const Cursor: FC = () => {

  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      if (cursor.current) {

        const element = e.target as HTMLElement;

        if (element && element.tagName.toLowerCase() === "a")
          cursor.current.classList.add('bg-blue-700')
        else
          cursor.current.classList.remove('bg-blue-700')

        cursor.current.style.top = e.clientY + "px";
        cursor.current.style.left = e.clientX + "px";
      }
    });

    window.addEventListener("mousedown", () => {
      if (cursor.current) {
        cursor.current.classList.add("bg-gray-500");
        cursor.current.classList.add("scale-75");
        cursor.current.classList.remove("bg-gray-400");
        cursor.current.classList.remove("opacity-60");
      }
    });

    window.addEventListener("mouseup", () => {
      if (cursor.current) {
        cursor.current.classList.add("bg-gray-400");
        cursor.current.classList.add("opacity-60");
        cursor.current.classList.remove("scale-75");
        cursor.current.classList.remove("bg-gray-500");
      }
    });
  }, []);

  return (
    <div
      className={"cursor bg-gray-400 opacity-60 z-50"}
      ref={cursor} />
  );
};

export default Cursor;
