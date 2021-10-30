import type { NextPage, NextPageContext } from "next";
import Layout from "../../components/layout";
import { getAllPosts } from "../../lib/api/blog";
import Image from "next/image";
import Link from "next/link";
import Card1 from "../../components/cards/card1";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Meta from "../../components/meta/meta";

interface BlogPageInterface {
  posts: any;
}

const BlogPage: NextPage<BlogPageInterface> = (props) => {
  const { t } = useTranslation(["blog"]);
  const posts = props.posts.nodes;
  return (
    <Layout>

      <Meta title={t('title')} />

      <div className="max-w-5xl mx-auto py-20 px-5 xl:px-0">
        <h2
          className={"text-4xl md:text-6xl py-5 text-gradient mb-10"}>
          {t("Blog Posts")}
        </h2>
        <div className="space-y-5">
          {
            posts.map((post: any) => {
              return (
                <Card1 key={post.id}>
                  <article className={"flex flex-col md:flex-row items-center"}>
                    <Link href={`/blog/${post.slug}`}>
                      <a>
                        <figure
                          className={"blog-shadows-left flex overflow-hidden rounded-full mr-5 w-32 md:w-auto mb-8 md:mb-5 mt-5 md:ml-8 rtl:ml-16"}>
                          <Image
                            src={post.featuredImage?.node.sourceUrl || "/mohammad-reza-khosravian.png"}
                            alt={post.title}
                            width={200}
                            height={200}
                            quality={60}
                            objectFit={"cover"}
                          />
                        </figure>
                      </a>
                    </Link>
                    <div className={"flex-1"}>
                      <Link
                        href={`/blog/${post.slug}`}><a
                        className={"text-2xl md:text-3xl font-bold mb-5 block text-start"}>{post.title}</a></Link>
                      <div className={"font-light text-xl"}
                           dangerouslySetInnerHTML={{
                             __html: post.excerpt
                           }} />
                    </div>
                  </article>
                </Card1>
              );
            })
          }
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      ...await serverSideTranslations(context.locale!, ["common", "blog"]),
      posts: await getAllPosts()
    }
  };
}

export default BlogPage;
