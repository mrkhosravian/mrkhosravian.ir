import React from "react";
import Highlight from "prism-react-renderer";
import _Prism from "prism-react-renderer/prism";
import Head from "next/head";

const CodeBlock = ({ children, className, prismLoadLanguages }: any) => {

  let Prism = _Prism;
  prismLoadLanguages.forEach((lng: string) => {
    eval(lng);
  });

  const language = className.replace(/language-/, "");

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"
              crossOrigin={"anonymous"} />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&display=swap"
          rel="stylesheet" />
      </Head>
      <Highlight Prism={Prism} code={children} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => {
          // console.log(tokens);
          return (
            <pre className={className + " rounded shadow-xl"} style={{
              ...style,
              fontFamily: "'JetBrains Mono', monospace"
            }} dir={"ltr"}>
          {tokens.slice(0, tokens.length - 1).map((line, i) => {
            return (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            );
          })}
        </pre>
          );
        }}
      </Highlight>
    </>
  );
};

export default CodeBlock;
