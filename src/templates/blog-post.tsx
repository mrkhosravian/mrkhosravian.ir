import React from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout"
import Img from "gatsby-image";
import SEO from "../components/seo";

export default function BlogPost({data}) {
  const post = data.markdownRemark
  let featuredImgFluid = post.frontmatter.featuredImage.childImageSharp.fluid
  return (
    <Layout>
      <SEO title={post.frontmatter.title} description={post.frontmatter.excerpt}/>
      <div>
        <div className="container mx-auto px-5 md:px-0 mt-10 mb-20">
          <h1 className="text-4xl font-light antialiased">{post.frontmatter.title}</h1>
          <span className="opacity-75">{post.frontmatter.date}</span>
          <br/>
          <span className="opacity-75">{post.timeToRead} minutes to read</span>
        </div>
        <Img fluid={featuredImgFluid}
             className="w-full h-full object-cover  transition duration-300 transform group-hover:scale-150 mb-20"
        />
        <div className="container mx-auto px-5 md:px-0">
          <div className='single-post' dangerouslySetInnerHTML={{__html: post.html}}/>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            excerpt
            timeToRead
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
        }
    }
`