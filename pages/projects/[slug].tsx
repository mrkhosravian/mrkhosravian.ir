import type { GetStaticProps, NextPage } from "next";
import { GetStaticPaths } from "next";
import Layout from "../../components/layout";
import Image from "next/image";
import { getAllProjects } from "../../lib/api/projects";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import moment from "moment-jalaali";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Meta from "../../components/meta/meta";
import { readFileSync } from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { DateTypeEnum } from "../../lib/mdxUtils";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import ImageGallery from "../../components/gallery/ImageGallery";
import remarkGfm from "remark-gfm";
import { MDXComponents } from "mdx/types";

interface SingleProjectPageInterface {
  project: any;
  source: MDXRemoteSerializeResult;
  slug: any;
}

const SingleProjectPage: NextPage<SingleProjectPageInterface> = (props) => {
  const router = useRouter();
  const { t } = useTranslation("projects");

  const components = {
    ImageGallery
  };

  const project: any = props.source.frontmatter;

  return (
    <Layout>

      <Meta title={project.title} />

      <div className="max-w-5xl px-5 lg:px-0 mx-auto py-20">
        <div className="flex flex-col sm:flex-row border-b-2 pb-10 mb-10">

          <figure className={"mb-5 md:mb-0 sm:w-64 mr-5 rtl:mr-0 rtl:ml-5"}>
            <Image
              src={project.image || "/mohammad-reza-khosravian.png"}
              alt={project.title}
              width={300}
              height={300}
              layout={"responsive"}
              objectFit={"cover"}
              className={"rounded"}
            />
          </figure>

          <div className={"flex flex-col space-y-5 justify-between"}>
            <h2><span className={"text-2xl"}>{t("Project")}</span>
              <div className={"text-4xl text-gradient"}>{project.title}</div>
            </h2>
            <div>
              <span className={"text-2xl"}>{t("Description")}</span>
              <div
                className={"opacity-60 mt-1"}
                dangerouslySetInnerHTML={{ __html: project.excerpt }} />
            </div>
            <div>
              <span className={"text-2xl"}>{t("Date")}</span>
              <time
                className={"block opacity-60 mt-1"}>{moment(project.date).locale(router.locale!).format(
                router.locale! === "fa" ? "jYYYY/jM/jD" : "YYYY/M/D"
              )}</time>
            </div>
          </div>

        </div>
        <div className={"single-post"}>
          <MDXRemote {...props.source}
                     components={components as MDXComponents} />
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const content = readFileSync(`${process.cwd()}/data/${DateTypeEnum.Projects}/${context.locale}/${context.params!.slug}.mdx`);

  const mdxSource = await serialize(content.toString(), {
    parseFrontmatter: true,
    mdxOptions: { remarkPlugins: [remarkGfm] }
  });

  return {
    props: {
      ...(await serverSideTranslations(context.locale!, ["common", "projects"])),
      source: mdxSource,
      slug: context.params!.slug
    }
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {

  let enProjects: any, faProjects: any;

  try {
    faProjects = getAllProjects("fa");
  } catch (e) {
    faProjects = [];
  }
  try {
    enProjects = getAllProjects("en");
  } catch (e) {
    enProjects = [];
  }

  const paths = enProjects.map(({ slug }: { slug: string }) => ({
    params: { slug },
    locale: "en"
  }));

  paths.push(...faProjects.map(({ slug }: { slug: string }) => ({
    params: { slug },
    locale: "fa"
  })));

  return {
    paths,
    fallback: false
  };
};


export default SingleProjectPage;
