import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

const Logo = () => {
  const data = useStaticQuery(graphql`{
  placeholderImage: file(relativePath: {eq: "icon.png"}) {
    childImageSharp {
      gatsbyImageData(width: 300, layout: CONSTRAINED)
    }
  }
}
`)

  if (!data?.placeholderImage?.childImageSharp?.gatsbyImageData) {
    return <div>Picture not found</div>
  }

  return (
    <GatsbyImage
      image={data.placeholderImage.childImageSharp.gatsbyImageData}
      alt={"MRKHOSRAVIAN Logo"}
      className="w-16" />
  );
}

export default Logo
