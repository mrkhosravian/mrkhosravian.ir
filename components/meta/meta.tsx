import Head from "next/head";

interface MetaParams {
  title: string;
  desc?: string;
  canonical?: string;
  css?: string;
  image?: string;
  js?: string;
}

const Meta = (props: MetaParams) => (
  <Head>
    <title>{props.title}</title>
    <meta name="description" content={props.desc} />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={props.title} />
    <meta name="og:description" property="og:description"
          content={props.desc} />
    <meta property="og:site_name" content="Proper Noun" />
    <meta property="og:url" content={`${props.canonical}`} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={props.title} />
    <meta name="twitter:description" content={props.desc} />
    <meta name="twitter:site" content="@propernounco" />
    <meta name="twitter:creator" content="@propernounco" />
    <link rel="icon" type="image/png" href="/static/images/favicon.ico" />
    <link rel="apple-touch-icon" href="/static/images/favicon.ico" />
    {
      props.css &&
      <link rel="stylesheet" href={`${props.css}`} />
    }
    {
      props.image ? (
        <meta property="og:image" content={`${props.image}`} />
      ) : (
        <meta property="og:image"
              content="https://www.propernoun.co/static/images/proper-noun-social.png" />
      )
    }
    {
      props.image &&
      <meta name="twitter:image" content={`${props.image}`} />
    }
    {
      props.canonical &&
      <link rel="canonical" href={`${props.canonical}`} />
    }
    {
      props.js &&
      <script type="text/javascript" src={`${props.js}`} />
    }
  </Head>
);
export default Meta;
