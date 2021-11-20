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
import { Accordion } from "../../components/blocks/accordion";
import DownloadBtn from "../../components/buttons/download";

interface SingleBlogPostInterface {
  frontMatter: any;
  source: any;
  prismLoadLanguages: any;
  slug: string;
}


const SingleBlogPost: NextPage<SingleBlogPostInterface> = (props) => {

  const { prismLoadLanguages } = props;

  const components = {
    code: (props: any) => <CodeBlock
      prismLoadLanguages={prismLoadLanguages} {...props} />,
    Accordion,
    DownloadBtn
  };

  const { t } = useTranslation(["common", "blog"]);

  const router = useRouter();

  return (
    <Layout>

      <Meta title={props.frontMatter.title} />

      <div className="max-w-5xl mx-auto px-5 lg:px-0 xl:px-0 py-10 mb-20">
        <main className="mt-10 lg:mt-20 space-y-6">
          <article className="lg:grid lg:grid-cols-12 gap-x-10">
            <div
              className="col-span-4 lg:text-center mb-10 relative lg:sticky lg:top-20 lg:self-start">
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

            <div className="col-span-8">
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

              <a
                className={"text-sm my-5 rounded py-2 flex items-center opacity-50 hover:opacity-100 no-underline hover:underline"}
                target={"_blank"}
                href={`https://github.com/mrkhosravian/mrkhosravian.ir/edit/main/data/posts/${router.locale}/${props.slug}.mdx`}
                rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="h-4 w-4 ltr:mr-5 rtl:ml-5"
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>

                {t("blog:Edit this post")}
              </a>

              <div className={"single-post"}>
                <MDXProvider components={components}>
                  <MDXRemote {...props.source} />
                </MDXProvider>
              </div>
            </div>
          </article>
        </main>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const x = readFileSync(`${process.cwd()}/data/posts/${context.locale}/${context.params!.slug}.mdx`);
  const {
    content,
    data
  } = matter(x);

  const mdxSource = await serialize(content, { scope: data });

  const kotlin = readFileSync(`${process.cwd()}/node_modules/prismjs/components/prism-kotlin.js`).toString();
  const java = readFileSync(`${process.cwd()}/node_modules/prismjs/components/prism-java.js`).toString();
  const docker = readFileSync(`${process.cwd()}/node_modules/prismjs/components/prism-docker.js`).toString();
  const bash = readFileSync(`${process.cwd()}/node_modules/prismjs/components/prism-bash.js`).toString();

  return {
    props: {
      ...await serverSideTranslations(context.locale!, ["common", "blog"]),
      source: mdxSource,
      frontMatter: data,
      prismLoadLanguages: [
        kotlin,
        java,
        docker,
        bash
      ],
      slug: context.params!.slug
    }
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {

  const faPosts = getAllPosts("fa");
  let enPosts: any;
  try {
    enPosts = getAllPosts("en");
  } catch (e) {
    enPosts = [];
  }

  const paths = enPosts.map((slug: string) => ({
    params: { slug },
    locale: "en"
  }));

  paths.push(...faPosts.map((slug: string) => ({
    params: { slug },
    locale: "fa"
  })));

  return {
    paths,
    fallback: false
  };
};

export default SingleBlogPost;
