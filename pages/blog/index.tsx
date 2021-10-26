import type { NextPage, NextPageContext } from "next";
import Layout from "../../components/layout";
import { getAllPosts } from "../../lib/api/blog";
import Image from "next/image";
import Link from "next/link";
import Card1 from "../../components/cards/card1";

interface BlogPageInterface {
  posts: any;
}

const BlogPage: NextPage<BlogPageInterface> = (props) => {
  const posts = props.posts.nodes;
  return (
    <Layout>
      <div className="max-w-5xl mx-auto py-20 px-5 xl:px-0">
        <div className={"text-4xl md:text-6xl leading-tight text-gradient mb-10"}>
          Blog Posts
        </div>
        <div className="space-y-5">
          {
            posts.map((post: any) => {
              return (
                <Card1 key={post.id}>
                  <article className={"flex flex-col md:flex-row items-center"}>
                    <Link href={`/blog/${post.slug}`}>
                      <figure
                        className={"blog-shadows-left flex overflow-hidden rounded-full mr-5 w-32 md:w-auto mb-8 md:mb-5 mt-5 md:ml-8"}>
                        <Image
                          src={post.featuredImage?.node.sourceUrl || "/mohammad-reza-khosravian.png"}
                          alt={post.title}
                          width={200}
                          height={200}
                          quality={60}
                          objectFit={'cover'}
                        />
                      </figure>
                    </Link>
                    <div className={"flex-1"}>
                      <Link
                        href={`/blog/${post.slug}`}><a
                        className={"text-2xl md:text-3xl font-bold mb-5 block"}>{post.title}</a></Link>
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
      posts: await getAllPosts()
    }
  };
}

export default BlogPage;
