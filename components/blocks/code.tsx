import React from "react";
import Highlight from "prism-react-renderer";
// @ts-ignore
import _Prism from "prism-react-renderer/prism";

const CodeBlock = ({ children, className, prismLoadLanguages }: any) => {

  let Prism = _Prism;
  prismLoadLanguages.forEach((lng: string) => {
    eval(lng);
  });

  const language = className?.replace(/language-/, "");

  return (
    !language
      ? <span className={"rounded shadow-xl whitespace-nowrap"}>{children}</span>
    : <Highlight Prism={Prism} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        return (
          <pre className={className + " rounded shadow-xl whitespace-nowrap"} style={{
            ...style,
            fontSize: "14px",
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
  );
};

export default CodeBlock;
