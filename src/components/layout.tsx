import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import { graphql, useStaticQuery } from "gatsby";

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
  );
  return (
    <div className={"relative pb-48 w-full min-h-screen bg-gray-100"}>
      <Header siteTitle={site.siteMetadata.title} />
      <div className="container mx-auto px-5 md:px-0">{children}</div>
      <Footer />
    </div>
  );
}
