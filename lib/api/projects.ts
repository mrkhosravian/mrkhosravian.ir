import { fetchAPI } from "./api";

export async function getAllProjects(preview: boolean = false) {
  const data = await fetchAPI(
    `
    query AllProjects {
      projects {
        nodes {
          id
          title
          slug
          excerpt
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
    `
  );

  return data?.projects;
}

export async function getProject(slug: string) {
  return await fetchAPI(
    `
    query ProjectBySlug($slug: String!) {
      project: projectBy(slug: $slug) {
        title
        slug
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
        content
      }
    }
  `,
    {
      variables: {
        slug
      }
    }
  );
}
