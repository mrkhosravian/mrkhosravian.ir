import type { GetStaticProps, NextPage } from "next";
import Layout from "../../components/layout";
import Image from "next/image";
import { getAllProjects } from "../../lib/api/projects";
import Link from "next/link";

interface ProjectsPageInterface {
  projects: any;
}

const ProjectsPage: NextPage<ProjectsPageInterface> = (props) => {
  const projects = props.projects.nodes;
  return (
    <Layout>
      <div className="container mx-auto py-20 px-5">
        <div className={"text-4xl md:text-6xl leading-tight text-gradient mb-8 md:mb-20"}>
          Projects
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {
            projects.map((project: any) => {
              return (
                <div key={project.id}
                     className="relative bg-white shadow-md rounded-3xl p-2 cursor-pointer ">
                  <Link href={`/projects/${project.slug}`}>
                    <div
                      className="overflow-x-hidden rounded-2xl relative h-64">
                      <Image className="h-40 rounded-2xl w-full object-cover"
                             src={project.featuredImage?.node.sourceUrl || "/mohammad-reza-khosravian.png"}
                             layout={"fill"} />
                    </div>
                  </Link>
                  <div className="mt-4 pl-2 mb-2 flex justify-between ">
                    <div>
                      <p
                        className="text-lg font-semibold text-gray-900 mb-0">
                        <Link
                          href={`/projects/${project.slug}`}><a>{project.title}</a></Link>
                      </p>
                      <div className="text-md text-gray-800 mt-0"
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
  return {
    props: {
      projects: await getAllProjects()
    }
  };
};

export default ProjectsPage;
