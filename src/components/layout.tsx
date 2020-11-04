import React from "react"
import Header from "./header"
import Footer from "./footer"
import { graphql, useStaticQuery } from "gatsby"

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
      <div className="container mx-auto px-5 md:px-0">{children}</div>
      <Footer />
    </div>
  )
}