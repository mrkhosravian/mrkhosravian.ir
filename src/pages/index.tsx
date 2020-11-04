import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Waves from "../components/Waves";
import Img from "gatsby-image"
import SEO from "../components/seo"

export default function IndexPage({ data }) {
  return (
    <Layout>
      <SEO title="Home" />
      {data.allMarkdownRemark.edges.map(({ node }: any, index: any) => {
        const { slug } = node.fields
        let featuredImgFluid =
          node.frontmatter.featuredImage.childImageSharp.fluid
        return (
          <div
            className="rounded-lg overflow-hidden bg-white shadow"
            key={node.frontmatter.title}
          >
            <Link to={`${slug}`}>
              <div className="relative overflow-hidden group cursor-pointer">
                <Img
                  fluid={featuredImgFluid}
                  className="w-full h-full object-cover  transition duration-300 transform group-hover:scale-150"
                />
                <Waves index={index % 3 + 1}/>
              </div>
            </Link>
            <div className="p-5 text-center">
              <Link to={`${slug}`} className="hover:underline">
                {node.frontmatter.title}
              </Link>
            </div>
          </div>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  query {
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
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
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
