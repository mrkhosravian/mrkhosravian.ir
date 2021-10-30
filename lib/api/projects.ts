import { fetchAPI } from "./api";

export async function getAllProjects(preview: boolean = false) {
  const data = await fetchAPI(
    `
    query AllProjects($lang: LanguageCodeFilterEnum) {
      projects(where: {language: $lang}) {
        nodes {
          id
          title
          slug
          excerpt
          language {
            code
          }
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

export async function getAllProjectsByLocale(locale: string) {
  const data = await fetchAPI(
    `
    query AllProjects($lang: LanguageCodeFilterEnum) {
      projects(where: {language: $lang}) {
        nodes {
          id
          title
          slug
          excerpt
          language {
            code
          }
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
    `, {
      variables: {
        lang: locale === "en" ? "EN" : "FA"
      }
    }
  );

  return data?.projects;
}

export async function getProject(slug: string, locale: string) {

  let query = `query ProjectBySlug($slug: String!) {
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
    }`;

  if (locale === "fa") {
    query = `query ProjectBySlug($slug: String!) {
  project: projectBy(slug: $slug) {
    slug
    date
    featuredImage {
      node {
        sourceUrl
      }
    }
    translation(language: FA) {
      title
      excerpt
      content
    }
  }
}`;
  }

  let result = await fetchAPI(query, {
    variables: {
      slug
    }
  });


  if (locale === "fa") {
    result.project = {
      ...result.project,
      ...result.project.translation
    };
    delete result.project.translation;
  }

  return result;
}
