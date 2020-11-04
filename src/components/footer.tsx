import React from "react";

export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#222832" fillOpacity="1"
                d="M0,128L120,106.7C240,85,480,43,720,42.7C960,43,1200,85,1320,106.7L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"/>
        </svg>
      </div>
      <div className="bg-etour-gray text-white">

        <div className="container mx-auto md:pb-20">

          <div className="mx-auto border-none px-4">
            <section
              className="flex flex-col md:flex-row md:justify-between text-gray-700 font-light text-sm pt-4 pb-6 md:pt-5 md:pb-6 w-full"
            >
              <div>
                <p className="leading-8 tracking-wide">
                  &copy; Mohammad Reza Khosravian. {new Date().getFullYear()}
                </p>
              </div>
              <div>
                <p className="leading-8 tracking-wide">Privacy Policy</p>
              </div>
            </section>
          </div>

        </div>
      </div>
    </footer>
  )
}
