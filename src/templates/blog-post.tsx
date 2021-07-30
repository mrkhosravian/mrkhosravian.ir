import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage } from "gatsby-plugin-image";
import SEO from "../components/seo";
import { MDXRenderer } from "gatsby-plugin-mdx";

export default function BlogPost({ data }) {
  const post = data.mdx;
  let featuredImgFluid = post.frontmatter.featuredImage.banner.gatsbyImageData;
  console.log(post);
  return (
    <Layout>
      <SEO title={post.frontmatter.title}
           description={post.frontmatter.description}
           article={true}
       image={post.frontmatter.featuredImage.seo.gatsbyImageData.images.fallback.src}/>
      <div>
        <div className="container mx-auto px-5 md:px-0 mt-10 mb-20">
          <h1
            className="text-4xl font-light antialiased">{post.frontmatter.title}</h1>
          <span className="opacity-75">{post.frontmatter.date}</span>
          <br />
          <span className="opacity-75">{post.timeToRead} minutes to read</span>
        </div>
        <GatsbyImage
          image={featuredImgFluid}
          className="w-full mb-20"
          alt={post.frontmatter.title}
        />
        <div className="container mx-auto px-5 md:px-0 single-post">
          <MDXRenderer>{post.body}</MDXRenderer>
          {/*<div className=""*/}
          {/*     dangerouslySetInnerHTML={{ __html: post.html }} />*/}
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`query ($slug: String!) {
    mdx(slug : {eq: $slug}) {
        body
        excerpt
        timeToRead
        frontmatter {
            title
            description
            date(formatString: "YYYY-MMMM-DD HH:mm")
            featuredImage {
                banner: childImageSharp {
                    gatsbyImageData(width: 800, layout: CONSTRAINED, height: 500)
                }
                seo: childImageSharp {
                    gatsbyImageData(width: 150, layout: FIXED, height: 150)
                }
            }
        }
    }
}
`;
