import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
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
        {children}
      </div>
      <Footer />
    </div>
  )
}