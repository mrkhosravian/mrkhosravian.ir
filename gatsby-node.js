const path = require(`path`);
let gatsbyNodeModules = require("fs").realpathSync("node_modules/gatsby");
gatsbyNodeModules = require("path").resolve(gatsbyNodeModules, "..");
const { createFilePath } = require(`gatsby-source-filesystem`);
const axios = require("axios");


exports.onCreateWebpackConfig = ({ stage, actions }) => {

  actions.setWebpackConfig({
    resolve: {
      modules: [gatsbyNodeModules, "node_modules"],
      fallback: {
        "querystring": require.resolve("querystring-es3")
      }
    }
  });

};

exports.onCreateNode = ({ node, getNode, actions }) => {

  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    let slug = createFilePath({ node, getNode, basePath: `posts` });
    createNodeField({
      node,
      name: `slug`,
      value: `posts${slug}`
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        nodes {
            id
            slug
        }
      }
    }
  `);


  result.data.allMdx.nodes.forEach(node => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/blog-post.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.slug
      }
    });
  });
};
