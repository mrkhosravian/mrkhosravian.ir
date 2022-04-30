import type { GetStaticProps } from "next";
import { GetStaticPaths } from "next";
import { getAllPosts } from "../../../lib/api/blog";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import matter from "gray-matter";
import { count } from "../../../lib/mdxUtils";
import { BlogConfig } from "../../../lib/config";
import BlogPage from "../index";


export const getStaticProps: GetStaticProps = async (context) => {
  let posts = getAllPosts(context.locale! as "fa" | "en");
  let currentPage = Number(context.params!.page);
  const start = (currentPage - 1) * BlogConfig.pagination.perPage;
  posts = posts.slice(start, start + BlogConfig.pagination.perPage);

  let postsData = [];

  for (let i = 0; i < posts.length; i++) {
    const slug = posts[i];
    const { data } = matter.read(`${process.cwd()}/data/posts/${context.locale!}/${slug}.mdx`);
    data.slug = slug;
    postsData.push(data);
  }

  return {
    props: {
      ...await serverSideTranslations(context.locale!, ["common", "blog"]),
      posts: postsData,
      currentPage: currentPage,
      totalPages: count(context.locale! as "fa" | "en")
    }
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {

  const faPosts = count("fa");
  const enPosts = count("en");

  const paths = [];
  let page = 1;

  for (let i = 0; i < faPosts; i++) {
    if (i > 0 && i % 1 == 0) page++;
    paths.push({
      params: { page: page.toString() },
      locale: "fa"
    });
  }

  page = 1;
  for (let i = 0; i < enPosts; i++) {
    if (i > 0 && i % 1 == 0) page++;
    paths.push({
      params: { page: page.toString() },
      locale: "en"
    });
  }

  return {
    paths,
    fallback: false
  };
};

export default BlogPage;
