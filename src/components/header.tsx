import { Link } from "gatsby"
import * as React from "react"
import { useState } from "react"
import Logo from "./logo"

const Header = ({ siteTitle }) => {

  const [appsShow, setAppsShow] = useState(false)
  const [menuShow, setMenuShow] = useState(false)

  return (
    <header className="py-10">
      <div className="flex flex-wrap container mx-auto select-none">
        <div className="w-full">
          <nav
            className="relative flex flex-wrap items-center justify-between py-3 navbar-expand-lg text-gray-900 rounded">
            <div
              className="mx-auto flex flex-wrap items-center justify-between w-full">
              <div
                className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">

                {/* APPS  */}
                <div
                  className={`${!appsShow && "hidden"} absolute right-0 top-full bg-white w-64 h-64 z-50 shadow-2xl rounded-lg p-5`}
                  style={{ transform: "translate(-0.75rem, 0.75rem)" }}>
                  <div className="grid grid-cols-3 gap-5">
                    <Link to="/os" title={"Operating Systems Algorithms"}
                          className="w-16 h-16 bg-gray-200 rounded-lg flex justify-center items-center hover:shadow-lg">OS
                    </Link>
                    <Link to="/graph" title={"Graph Drawing Toll"}
                          className="w-16 h-16 bg-gray-200 rounded-lg flex justify-center items-center hover:shadow-lg">GRAPH
                    </Link>
                  </div>
                </div>


                <div className="flex items-center">
                  <Link to="/">
                    <Logo />
                  </Link>
                  <Link to="/"
                        className="ml-5 font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase">{siteTitle}</Link>
                </div>
                <div className="flex">
                  <button
                    className="block lg:hidden outline-none focus:outline-none"
                    onClick={() => {
                    setAppsShow(it => !it)
                    setMenuShow(false)
                  }}>
                    <AppsIcon />
                  </button>
                  <button onClick={() => {
                    setMenuShow(it => !it)
                    setAppsShow(false)
                  }}
                          className="cursor-pointer text-xl leading-none px-3 py-1 ml-5 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                          type="button">
                <span
                  className="block relative w-6 h-px rounded-sm bg-gray-900" />
                    <span
                      className="block relative w-6 h-px rounded-sm bg-gray-900 mt-1" />
                    <span
                      className="block relative w-6 h-px rounded-sm bg-gray-900 mt-1" />
                  </button>
                </div>
              </div>
              <div
                className={`flex lg:flex-grow items-center pl-4 overflow-hidden mt-5 md:mt-0 ${!menuShow && "h-0"} lg:h-auto`}
                id="example-navbar-info">
                <ul
                  className="flex flex-col lg:flex-row list-none ml-auto md:items-center">
                  <li className="nav-item">
                    <Link
                      className="md:px-3 py-2 flex items-center uppercase font-bold leading-snug hover:opacity-75"
                      to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="md:px-3 py-2 flex items-center uppercase font-bold leading-snug hover:opacity-75"
                      to="#soon">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item hidden md:block">
                    <div
                      className="md:px-3 py-2 uppercase font-bold leading-snug">
                      <div
                        onClick={() => setAppsShow(it => !it)}
                        className="flex items-center hover:opacity-75 cursor-pointer">Apps&nbsp;
                        <AppsIcon /></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

function AppsIcon() {
  return <svg className="block w-6" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
}

export default Header
