import type { GetStaticProps, NextPage } from "next";
import Layout from "../../components/layout";
import Image from "next/image";
import { getAllProjects, getAllProjectsByLocale } from "../../lib/api/projects";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Meta from "../../components/meta/meta";
import { count, DateTypeEnum } from "../../lib/mdxUtils";

interface ProjectsPageInterface {
  posts: any;
}

const ProjectsPage: NextPage<ProjectsPageInterface> = (props) => {
  const { t } = useTranslation(["projects"]);
  const projects = props.posts;
  return (
    <Layout>

      <Meta title={t("title")} />

      <div className="max-w-5xl mx-auto py-20 px-5 md:px-0">
        <h2
          className={"text-4xl md:text-6xl leading-tight text-gradient mb-8 md:mb-10 py-3 md:py-10"}>
          {t("Projects")}
        </h2>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {
            projects.map((project: any) => {
              return (
                <div key={project.slug}
                     className="relative bg-white dark:bg-gray-700 shadow-md rounded-3xl p-2 cursor-pointer ">
                  <Link href={`/projects/${project.slug}`}>

                    <div
                      className="overflow-x-hidden rounded-2xl relative h-64">
                      <Image className="h-40 rounded-2xl w-full object-cover"
                             src={project.image || "/mohammad-reza-khosravian.png"}
                             layout={"fill"} alt={project.title} />
                    </div>

                  </Link>
                  <div className="mt-4 pl-2 mb-2 flex justify-between ">
                    <div>
                      <p
                        className="text-lg font-semibold mb-0">
                        <Link
                          href={`/projects/${project.slug}`}>{project.title}</Link>
                      </p>
                      <div className="text-md opacity-60 mt-0"
                           dangerouslySetInnerHTML={{
                             __html: project.excerpt
                           }} />
                    </div>
                    <div
                      className="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
                    </div>
                  </div>
                </div>
              );
            })
          }

        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  let posts = getAllProjects(context.locale! as "fa" | "en");

  return {
    props: {
      ...(await serverSideTranslations(context.locale!, ["projects", "common"])),
      posts,
      currentPage: 1,
      totalPages: count(context.locale! as "fa" | "en", DateTypeEnum.Projects)
    }
  };
};


export default ProjectsPage;
