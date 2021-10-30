import type { GetStaticProps, NextPage } from "next";
import { GetStaticPaths } from "next";
import Layout from "../../components/layout";
import Image from "next/image";
import { getAllProjects, getProject } from "../../lib/api/projects";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import moment from "moment-jalaali";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Meta from "../../components/meta/meta";

interface SingleProjectPageInterface {
  project: any;
}

const SingleProjectPage: NextPage<SingleProjectPageInterface> = (props) => {
  const router = useRouter();
  const { t } = useTranslation("projects");

  const project = props.project;

  return (
    <Layout>

      <Meta title={project.title} />

      <div className="max-w-5xl px-5 lg:px-0 mx-auto py-20">
        <div className="flex flex-col sm:flex-row border-b-2 pb-10">

          <figure className={"mb-5 md:mb-0 sm:w-64 mr-5 rtl:mr-0 rtl:ml-5"}>
            <Image
              src={project.featuredImage?.node.sourceUrl || "/mohammad-reza-khosravian.png"}
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
        <div dangerouslySetInnerHTML={{
          __html: project.content
        }} className={"single-post"} />
      </div>
    </Layout>
  );
};
export const getStaticProps: GetStaticProps = async (context) => {
  const data = await getProject(context.params!.slug as string, context.locale || "en");

  if (!data.project) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      ...await serverSideTranslations(context.locale!, ["common", "projects"]),
      project: data.project
    }
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {

  const projects = await getAllProjects();

  return {
    paths: projects.nodes.map((project: any) => ({
      params: { slug: project.slug },
      locale: project.language.code === "EN" ? "en" : "fa"
    })),
    fallback: false
  };
};


export default SingleProjectPage;
