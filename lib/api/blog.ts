import { fetchAPI } from "./api";

export async function getAllPosts(preview: boolean = false) {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: {orderby: {field: DATE, order: DESC}}) {
        nodes {
          id
          date
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

  return data?.posts;
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
