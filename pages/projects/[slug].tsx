import type { GetStaticProps, NextPage } from "next";
import { GetStaticPaths } from "next";
import Layout from "../../components/layout";
import Image from "next/image";
import { getAllProjects, getProject } from "../../lib/api/projects";

interface SingleProjectPageInterface {
  project: any;
}

const SingleProjectPage: NextPage<SingleProjectPageInterface> = (props) => {
  const project = props.project;
  return (
    <Layout>
      <div className="container mx-auto py-20">
        <figure>
          <Image
            src={project.featuredImage?.node.sourceUrl || "/mohammad-reza-khosravian.png"}
            alt={project.title}
            width={300}
            height={300}
          />
        </figure>
        <div dangerouslySetInnerHTML={{
          __html: project.content
        }} />
      </div>
    </Layout>
  );
};
export const getStaticProps: GetStaticProps = async (context) => {
  const data = await getProject(context.params!.slug as string);

  if (!data.project) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      project: data.project
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {

  const projects = await getAllProjects();

  return {
    paths: projects.nodes.map((project: any) => ({ params: { slug: project.slug } })),
    fallback: false
  };
};

export default SingleProjectPage;
