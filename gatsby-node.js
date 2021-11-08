const path = require(`path`);
let gatsbyNodeModules = require("fs").realpathSync("node_modules/gatsby");
gatsbyNodeModules = require("path").resolve(gatsbyNodeModules, "..");

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

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const blogTemplate = require.resolve(`./src/templates/blog-post.tsx`);

  const result = await graphql(`
    {
      projects: allFile(filter:{sourceInstanceName: {eq: "projects"}, ext: {eq: ".mdx"}},) {
        nodes {
          id
          relativeDirectory
          name
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(result.errors);
    return;
  }

  const blogPosts = result.data.projects.nodes;
  blogPosts.forEach(({ relativeDirectory, name }) => {
    const lng = name.split(".")[1];

    console.log(relativeDirectory, name);

    createPage({
      path: getLocalizedPath(`projects/${relativeDirectory}`, lng),
      component: blogTemplate,
      context: {
        slug: `${relativeDirectory}/content.${lng}.mdx`
      }
    });
  });
};


function getLocalizedPath(path, lang) {
  switch (lang) {
    case "fa":
      return `/${lang}/${path}`
    case "en":
      return `/${path}`
  }
}
