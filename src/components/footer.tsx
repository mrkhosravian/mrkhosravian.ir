// @ts-ignore
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="text-white">
        <div className="container mx-auto md:py-5">

          <div className="mx-auto border-none px-4">
            <section
              className="flex flex-col md:flex-row md:justify-between text-gray-700 font-light text-sm pt-4 pb-6 md:pt-5 md:pb-6 w-full"
            >
              <div>
                <p className="leading-8 tracking-wide">
                  &copy; Mohammad Reza Khosravian. {new Date().getFullYear()}
                </p>
              </div>
            </section>
          </div>

        </div>
      </div>
    </footer>
  );
}
