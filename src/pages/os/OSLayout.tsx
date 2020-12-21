import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import Header from "../../components/header"
import Footer from "../../components/footer"

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
          <Link to="/os/first-come-first-served" className="rounded bg-gray-700 p-2">FCFS</Link>
          <Link to="/os/shortest-remaining-time-first" className="rounded bg-gray-700 p-2">SRT</Link>
          <Link to="/os/first-come-first-served" className="rounded bg-gray-700 p-2">FCFS</Link>
          <Link to="/os/first-come-first-served" className="rounded bg-gray-700 p-2">FCFS</Link>
          <Link to="/os/first-come-first-served" className="rounded bg-gray-700 p-2">FCFS</Link>
          <Link to="/os/first-come-first-served" className="rounded bg-gray-700 p-2">FCFS</Link>
        </div>
        {children}
      </div>
      <Footer />
    </div>
  )
}