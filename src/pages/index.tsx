import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Waves from "../components/Waves";
import { GatsbyImage } from "gatsby-plugin-image";
import SEO from "../components/seo"

export default function IndexPage({ data }) {
  return (
    <Layout>
      <SEO title="Home" />
      {data.allMarkdownRemark.edges.map(({ node }: any, index: any) => {
        const { slug } = node.fields
        let featuredImgFluid =
          node.frontmatter.featuredImage.childImageSharp.gatsbyImageData
        return (
          <div
            className="rounded-lg overflow-hidden bg-white shadow"
            key={node.frontmatter.title}
          >
            <Link to={`${slug}`}>
              <div className="relative overflow-hidden group cursor-pointer">
                <GatsbyImage
                  alt={node.frontmatter.title}
                  image={featuredImgFluid}
                  className="w-full h-full object-cover  transition duration-300 transform group-hover:scale-150" />
                <Waves index={index % 3 + 1}/>
              </div>
            </Link>
            <div className="p-5 text-center">
              <Link to={`${slug}`} className="hover:underline">
                {node.frontmatter.title}
              </Link>
            </div>
          </div>
        );
      })}
    </Layout>
  );
}

export const query = graphql`{
  allMarkdownRemark {
    totalCount
    edges {
      node {
        id
        frontmatter {
          title
          date(formatString: "DD MMMM, YYYY")
          featuredImage {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
        excerpt
        fields {
          slug
        }
      }
    }
  }
}
`
