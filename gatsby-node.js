const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const axios = require("axios")


exports.onPreInit = async () => {
  await axios.get("http://mhdarabi.ir/mamad_jakesh_hastam/some.json")
    .then(res => console.log(JSON.stringify(res.data, null, 4)))
    .catch(err => console.log(JSON.stringify(err, null, 4)))
}

exports.onCreateNode = ({ node, getNode, actions }) => {

  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    let slug = createFilePath({ node, getNode, basePath: `posts` })
    createNodeField({
      node,
      name: `slug`,
      value: `posts${slug}`
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug
      }
    })
  })
}