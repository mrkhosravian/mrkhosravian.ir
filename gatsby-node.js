const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const axios = require("axios")


exports.onPreInit = async () => {
  console.log("START:::::::::::::::Test Kojaro")
  await axios.get("https://www.kojaro.com/")
    .then(res => console.log(JSON.stringify(res.data, null, 4)))
    .catch(err => console.log(JSON.stringify(err, null, 4)))
  console.log("START:::::::::::::::TestAPI")
  await axios.get("https://cat-fact.herokuapp.com/facts")
    .then(res => console.log(JSON.stringify(res.data, null, 4)))
    .catch(err => console.log(JSON.stringify(err, null, 4)))
  console.log("START:::::::::::::::Digikala")
  await axios.get("https://www.digikala.com")
    .then(res => console.log(JSON.stringify(res.data, null, 4)))
    .catch(err => console.log(JSON.stringify(err, null, 4)))
  console.log("START:::::::::::::::Axios")
  await axios.get("https://wp.itourapp.ir/wp-json/wp/v2/posts/1")
    .then(res => console.log(JSON.stringify(res.data, null, 4)))
    .catch(err => console.log(JSON.stringify(err, null, 4)))
  console.log("END::::::::::test netlify connection to https://wp.itourapp.ir")
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