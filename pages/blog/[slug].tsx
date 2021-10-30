import type { GetStaticPropsContext, NextPage } from "next";
import Layout from "../../components/layout";
import { getPost } from "../../lib/api/blog";
import Image from "next/image";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Arrow from "../../components/icons/arrow";
import moment from "moment-jalaali";
import { useRouter } from "next/router";
import Meta from "../../components/meta/meta";

interface SingleBlogPostInterface {
  post: any;
}

const SingleBlogPost: NextPage<SingleBlogPostInterface> = (props) => {

  const { t } = useTranslation();

  const router = useRouter();

  const post = props.post.post;
  return (
    <Layout>

      <Meta title={post.title} />

      <div className="max-w-5xl mx-auto px-5 md:px-0 xl:px-0 py-10">
        <main className="mt-10 lg:mt-20 space-y-6">
          <article className="lg:grid lg:grid-cols-12 gap-x-10">
            <div className="col-span-4 lg:text-center mb-10 relative">
              <Image
                src={post.featuredImage?.node.sourceUrl || "/mohammad-reza-khosravian.png"}
                alt={post.title}
                className={"rounded-xl"}
                width={400}
                height={400}
                objectFit={"cover"}
              />

              <p className="mt-4 block text-gray-400 text-xs">
                {t('Published')}:
                <time> {moment(post.date).locale(router.locale!).fromNow()}</time>
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
                {post.title}
              </h1>

              <div
                dangerouslySetInnerHTML={{
                  __html: post.content
                }}
                className="space-y-4 lg:text-lg leading-loose single-post"/>
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

export async function getServerSideProps(context: GetStaticPropsContext) {
  return {
    props: {
      ...await serverSideTranslations(context.locale!, ["common"]),
      post: await getPost(context.params!.slug as string)
    }
  };
}

export default SingleBlogPost;
