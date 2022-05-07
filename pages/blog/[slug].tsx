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
import { readFileSync } from "fs";
import { Accordion } from "../../components/blocks/accordion";
import DownloadBtn from "../../components/buttons/download";
import { DateTypeEnum } from "../../lib/mdxUtils";
import remarkGfm from "remark-gfm";
// @ts-ignore
import rehypePrism from "@mapbox/rehype-prism";

interface SingleBlogPostInterface {
  source: any;
  prismLoadLanguages: any;
  slug: string;
}


const SingleBlogPost: NextPage<SingleBlogPostInterface> = (props) => {

  const components = {
    Accordion,
    DownloadBtn
  };

  const { t } = useTranslation(["common", "blog"]);

  const router = useRouter();

  return (
    <Layout>

      <Meta title={props.source.frontmatter.title} />

      <div className="max-w-5xl mx-auto px-5 lg:px-0 xl:px-0 py-10 mb-20">
        <main className="mt-10 lg:mt-20 space-y-6">
          <article className="lg:grid lg:grid-cols-12 gap-x-10">
            <div
              className="col-span-4 lg:text-center mb-10 relative lg:sticky lg:top-20 lg:self-start">
              <Image
                src={props.source.frontmatter.image || "/mohammad-reza-khosravian.png"}
                alt={props.source.frontmatter.title}
                className={"rounded-xl"}
                width={400}
                height={400}
                objectFit={"cover"}
              />

              <p className="mt-4 block text-gray-400 text-xs">
                {t("Published")}:
                <time> {moment(props.source.frontmatter.date).locale(router.locale!).fromNow()}</time>
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
                {props.source.frontmatter.title}
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
                <MDXRemote {...props.source} components={components}/>
              </div>
            </div>
          </article>
        </main>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const content = readFileSync(`${process.cwd()}/data/${DateTypeEnum.Posts}/${context.locale}/${context.params!.slug}.mdx`);
  const mdxSource = await serialize(content.toString(), {
    parseFrontmatter: true,
    mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypePrism] }
  });

  return {
    props: {
      ...await serverSideTranslations(context.locale!, ["common", "blog"]),
      source: mdxSource,
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
