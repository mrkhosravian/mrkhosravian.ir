import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Header from "../components/header"
import Footer from "../components/footer"
import { PageReplacementAlgorithm } from "../constants/os_constants"
import SEO from "../components/seo"
import { FaGithub, FaArrowRight } from "react-icons/fa"
import MemoryStatus from "../tools/os/models/MemoryStatus"


const sample = `2, 3, 2, 1, 5, 2, 4, 5, 3, 2, 5, 2
3`

export default function PageReplacementLayout({
                                                timeWindows,
                                                pageFaults,
                                                title,
                                                setInputString,
                                                githubUrl
                                              }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )
  return (
    <div className="bg-etour-bg-gray">
      <SEO title={title} />
      <Header siteTitle={site.siteMetadata.title} />
      <div className="container mx-auto px-5 md:px-0">
        <h1 className="text-2xl md:text-4xl bold mb-10">Operating Systems Page
          Replacement Algorithms</h1>


        <div
          className="my-5 grid md:grid-flow-col grid-cols-2 md:auto-cols-fr gap-5 text-center text-white">
          <Link to="/os/page-replacement/first-in-first-out"
                title={PageReplacementAlgorithm.FIFO_FULL}
                className="rounded bg-gray-700 p-2">{PageReplacementAlgorithm.FIFO}</Link>
          <Link to="/os/page-replacement/least-recently-used"
                title={PageReplacementAlgorithm.LRU_FULL}
                className="rounded bg-gray-700 p-2">{PageReplacementAlgorithm.LRU}</Link>
          <Link to="/os/page-replacement/optimal"
                title={PageReplacementAlgorithm.OPTIMAL_FULL}
                className="rounded bg-gray-700 p-2">{PageReplacementAlgorithm.OPTIMAL}</Link>
          <Link to="/os/page-replacement/clock"
                title={PageReplacementAlgorithm.CLOCK_FULL}
                className="rounded bg-gray-700 p-2">{PageReplacementAlgorithm.CLOCK}</Link>
        </div>

        <div
          className="flex md:justify-between my-10 md:items-center flex-col md:flex-row">
          <h2 className="text-2xl md:text-4xl mb-5 md:mb-0">{title}</h2>
          <a href={githubUrl}
             className="py-3 px-8 bg-gray-900 text-white rounded hover:bg-gray-500 text-lg text-center"
             target="_blank">
            <FaGithub className="inline-block mr-5" />
            View Code
          </a>
        </div>
        <textarea name=""
                  className="w-full p-3 leading-relaxed whitespace-pre-line mb-16"
                  onChange={(e) => setInputString(e.target.value)} rows={2}
                  placeholder={sample} />


        <MemoryViewComponent timeWindows={timeWindows} />


        <div
          className="md:w-1/2 mt-5 bg-gray-200 rounded-lg grid grid-cols-1 items-center content-center text-center text-xl h-32">
          <span>Page Faults</span>
          <span className="text-4xl bold">{pageFaults === 0 ? "..." : pageFaults}</span>
        </div>

      </div>
      <Footer />
    </div>
  )
}

function MemoryViewComponent({ timeWindows }: { timeWindows: MemoryStatus[] }) {
  return (
    <div className="grid grid-flow-col gap-5">
      {
        timeWindows.map((memoryStatus, i) => {
          return <div key={i}><MemorySlots memoryStatus={memoryStatus} /></div>
        })
      }
    </div>
  )
}

function MemorySlots({ memoryStatus }) {
  return (
    <ul
      className="bg-gray-200 rounded">
      {memoryStatus.pages.map((page, i) =>
        !memoryStatus.useBits
          ? <li key={i}
                className={`py-5 text-center border border-2 border-gray-300 ${(i % memoryStatus.pages.length) === memoryStatus.faultIndex && "bg-yellow-500"}`}>
            {page ?? <span className="text-gray-200">-1</span>}
          </li>
          : <li key={i}
                className={`relative py-5 text-center border border-2 border-gray-300 ${(i % memoryStatus.pages.length) === memoryStatus.faultIndex && "bg-yellow-500"}`}>
            <span
              className="absolute left-0 top-0 opacity-50">{memoryStatus.useBits[i]}</span>
            {
              i === memoryStatus.pointer && <FaArrowRight className="absolute right-full top-6" />
            }
            {page ?? <span className="text-gray-200">-1</span>}
          </li>
      )}
    </ul>
  )
}