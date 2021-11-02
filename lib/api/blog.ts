import { fetchAPI } from "./api";
import { postFilePaths } from "../mdxUtils";

export async function getAllPosts(lange: "en"|"fa", preview: boolean = false) {
  return postFilePaths(lange)
}

export async function getPost(slug: string) {
  return await fetchAPI(
    `
    fragment PostFields on Post {
      title
      excerpt
      slug
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
      }
    }
  `,
    {
      variables: {
        id: slug,
        idType: "SLUG"
      }
    }
  );
}
