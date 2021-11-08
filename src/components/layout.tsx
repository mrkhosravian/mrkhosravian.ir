import * as React from "react";
import Header from "./layout/header";
import Footer from "./layout/footer";
import { graphql, useStaticQuery } from "gatsby";
import Base from "./layout/base";

export default function Layout({ children }: any) {
  const { site } = useStaticQuery(
    graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
        }
    `
  );
  return (
    <Base>
      <div className={"relative pb-48 w-full min-h-screen bg-gray-100 dark:bg-gray-800"}>
        <Header siteTitle={site.siteMetadata.title} />
        <div className="container mx-auto px-5 md:px-0">{children}</div>
        <Footer />
      </div>
    </Base>
  );
}
