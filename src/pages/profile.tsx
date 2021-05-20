import React from "react";
import Layout from "../components/layout";
import { GatsbyImage } from "gatsby-plugin-image";
import { graphql, Link, useStaticQuery } from "gatsby";


export default function() {

  const data = useStaticQuery(graphql`
      {
          placeholderImage: file(relativePath: {eq: "hanny-naibaho-aWXVxy8BSzc-unsplash.jpeg"}) {
              childImageSharp {
                  gatsbyImageData(width: 1200, height: 400, layout: CONSTRAINED)
              }
          }
      }
  `);

  return (
    <Layout>
      <h1 className={"text-5xl mb-20"}>About Me ?</h1>
      <h2 className={"text-3xl mb-5"}>My Favorites</h2>
      <ul>
        <li>
          <Link to={"/favorites/music"}>
            <div
              className={"bg-pink-500 w-full text-white flex justify-between rounded-md overflow-hidden"}>
              <h3
                className={"w-1/4 flex items-center justify-center text-6xl"}>Music</h3>
              <div className={"w-3/4"}>
                <GatsbyImage alt={"Music"}
                             className={"h-full"}
                             image={data.placeholderImage.childImageSharp.gatsbyImageData} />
              </div>
            </div>
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
