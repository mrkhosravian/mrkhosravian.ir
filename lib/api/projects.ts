import { fetchAPI } from "./api";
import { DateTypeEnum, getFilePaths } from "../mdxUtils";
import { BlogConfig } from "../config";
import matter from "gray-matter";

export function getAllProjects(lang: "en"|"fa", preview: boolean = false) {
  let filePaths = getFilePaths(lang, DateTypeEnum.Projects)

  const start = 0;
  filePaths = filePaths.slice(start, start + BlogConfig.pagination.perPage);

  const postsData = [];

  for (let i = 0; i < filePaths.length; i++) {
    const slug = filePaths[i];
    const { data } = matter.read(`${process.cwd()}/data/${DateTypeEnum.Projects}/${lang}/${slug}.mdx`);
    data.slug = slug;
    postsData.push(data);
  }

  return postsData;
}

// export async function getAllProjects(preview: boolean = false) {
//   const data = await fetchAPI(
//     `
//     query AllProjects {
//       projects {
//         nodes {
//           id
//           title
//           slug
//           excerpt
//           language {
//             code
//           }
//           featuredImage {
//             node {
//               sourceUrl
//             }
//           }
//         }
//       }
//     }
//     `
//   );
//
//   return data?.projects;
// }

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
