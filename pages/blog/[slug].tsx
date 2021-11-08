import type { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/layout";
import { getAllPosts } from "../../lib/api/blog";
import Image from "next/image";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Arrow from "../../components/icons/arrow";
import moment from "moment-jalaali";
import { useRouter } from "next/router";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Meta from "../../components/meta/meta";
import matter from "gray-matter";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../../components/blocks/code";
import { readFileSync } from "fs";
import Head from "next/head";

interface SingleBlogPostInterface {
  frontMatter: any;
  source: any;
}


const SingleBlogPost: NextPage<SingleBlogPostInterface> = (props) => {

  const { prismLoadLanguages } = props;

  const components = {
    code: props => <CodeBlock
      prismLoadLanguages={prismLoadLanguages} {...props} />
  };

  const { t } = useTranslation();

  const router = useRouter();

  return (
    <Layout>

      <Meta title={props.frontMatter.title} />

      <div className="max-w-5xl mx-auto px-5 md:px-0 xl:px-0 py-10">
        <main className="mt-10 lg:mt-20 space-y-6">
          <article className="lg:grid lg:grid-cols-12 gap-x-10">
            <div className="col-span-12 lg:text-center mb-10 relative">
              <Image
                src={props.frontMatter.image || "/mohammad-reza-khosravian.png"}
                alt={props.frontMatter.title}
                className={"rounded-xl"}
                width={400}
                height={400}
                objectFit={"cover"}
              />

              <p className="mt-4 block text-gray-400 text-xs">
                {t("Published")}:
                <time> {moment(props.frontMatter.date).locale(router.locale!).fromNow()}</time>
              </p>
            </div>

            <div className="col-span-12">
              <div className="hidden lg:flex mb-6">
                <Link href="/blog">
                  <a
                    className="transition-colors duration-300 relative inline-flex items-center text-lg hover:text-yellow-500">
                    <Arrow />
                    {t("Back to Posts")}
                  </a>
                </Link>
              </div>

              <h1 className="font-bold text-3xl lg:text-4xl mb-10">
                {props.frontMatter.title}
              </h1>

              <div className="single-post">
                <MDXProvider components={components}>
                  <MDXRemote {...props.source} />
                </MDXProvider>
              </div>
            </div>

            <section className="col-span-8 col-start-5 mt-10 space-y-6">
              {/*@include ('posts._add-comment-form')*/}

              {/*@foreach ($post->comments as $comment)*/}
              {/*<x-post-comment :comment="$comment"/>*/}
              {/*@endforeach*/}
            </section>
          </article>
        </main>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const x = readFileSync(`${process.cwd()}/data/posts/fa/${context.params!.slug}.mdx`);
  const {
    content,
    data
  } = matter(x);

  const mdxSource = await serialize(content, { scope: data });

  const kotlin = readFileSync(`${process.cwd()}/node_modules/prismjs/components/prism-kotlin.js`).toString();
  // const python = readFileSync(`${process.cwd()}/node_modules/prismjs/components/prism-python.js`).toString();
  // console.log(python);
  return {
    props: {
      ...await serverSideTranslations(context.locale!, ["common"]),
      source: mdxSource,
      frontMatter: data,
      prismLoadLanguages: [
        kotlin
        // python
      ]
    }
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {

  const faPosts = await getAllPosts("fa");
  let enPosts: any;
  try {
    enPosts = await getAllPosts("en");
  } catch (e) {
    enPosts = [];
  }

  const paths = enPosts.map(slug => ({
    params: { slug },
    locale: "en"
  }));

  paths.push(...faPosts.map(slug => ({
    params: { slug },
    locale: "fa"
  })));

  return {
    paths,
    fallback: false
  };
};

export default SingleBlogPost;
