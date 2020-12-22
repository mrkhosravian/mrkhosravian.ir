import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Header from "../../components/header"
import Footer from "../../components/footer"
import { CpuSchedulers } from "../../constants/os_constants"

export default function Layout({ children }: any) {
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
      <Header siteTitle={site.siteMetadata.title}/>
      <div className="container mx-auto px-5 md:px-0">
        <h1 className="text-4xl mb-10">Operating Systems Time Scheduling Algorithms</h1>
        <div className="my-5 grid grid-cols-12 gap-5 text-center text-white">
          <Link to="/os/first-come-first-served" className="rounded bg-gray-700 p-2">{CpuSchedulers.FCFS}</Link>
          <Link to="/os/shortest-remaining-time-first" className="rounded bg-gray-700 p-2">{CpuSchedulers.SRTF}</Link>
          <Link to="/os/round-robin" className="rounded bg-gray-700 p-2">{CpuSchedulers.RR}</Link>
          <Link to="/os/highest-response-ratio-next" title="highest-response-ratio Next" className="rounded bg-gray-700 p-2">{CpuSchedulers.HRRN}</Link>
        </div>
        {children}
      </div>
      <Footer />
    </div>
  )
}