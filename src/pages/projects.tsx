import * as React from "react";
import { useTranslation } from "react-i18next";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";

interface ProjectsPageInterface {
  projects: any;
}

const ProjectsPage = (props) => {
  const { t } = useTranslation(["projects"]);
  console.log(props);
  const projects = props.data.allMdx.nodes;
  return (
    <Layout>

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
                <div key={project.id}
                     className="relative bg-white dark:bg-gray-700 shadow-md rounded-3xl p-2 cursor-pointer ">
                  <Link to={`/${project.slug}`}>
                    <a>
                      <div
                        className="overflow-x-hidden rounded-2xl relative h-64">
                        {/*<Image className="h-40 rounded-2xl w-full object-cover"*/}
                        {/*       src={project.featuredImage?.node.sourceUrl || "/mohammad-reza-khosravian.png"}*/}
                        {/*       layout={"fill"} alt={project.title} />*/}
                      </div>
                    </a>
                  </Link>
                  <div className="mt-4 pl-2 mb-2 flex justify-between ">
                    <div>
                      <p
                        className="text-lg font-semibold mb-0">
                        <Link
                          to={`/${project.slug}`}><a>{project.title}</a></Link>
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

export const query = graphql`query {
    allMdx(filter: {slug: {regex: "/^projects/"}}) {
      nodes {
        slug
        fileAbsolutePath
      }
    }
}
`;

export default ProjectsPage;
