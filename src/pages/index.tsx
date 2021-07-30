import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Waves from "../components/Waves";
import { GatsbyImage } from "gatsby-plugin-image";
import SEO from "../components/seo"

export default function IndexPage({ data }) {
  console.log(data);
  return (
    <Layout>
      <SEO title="Home" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.allMdx.nodes.map((node : any, index: any) => {
          console.log(node);
          const slug = node.slug
          let featuredImgFluid =
            node.frontmatter.featuredImage.childImageSharp.gatsbyImageData
          return (
            <div
              className="rounded-lg overflow-hidden bg-white shadow flex flex-col"
              key={node.frontmatter.title}
            >
              <Link to={`${slug}`} className={"flex-1"}>
                <div className="relative overflow-hidden group cursor-pointer h-32 sm:h-64 md:h-[400px]]">
                  <GatsbyImage
                    alt={node.frontmatter.title}
                    image={featuredImgFluid}
                    objectFit={"cover"}
                    className="w-full h-full bg-red-500 transition duration-300 transform group-hover:scale-150" />
                  <Waves index={index % 3 + 1}/>
                </div>
              </Link>
              <div className="p-5 text-center h-16">
                <Link to={`${slug}`} className="hover:underline">
                  {node.frontmatter.title}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export const query = graphql`{
  allMdx(sort: {fields: [frontmatter___date],order: [DESC]}) {
    totalCount
    nodes {
        id
        slug
        frontmatter {
          title
          date(formatString: "YYYY-MMMM-DD HH:mm:ss")
          featuredImage {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED, height: 400,)
            }
          }
        }
        excerpt
      }
  }
}
`
