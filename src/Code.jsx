import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import nighhtowl from "prism-react-renderer/themes/nightOwl";

const Code = ({ code }) => {
  return (
    <Highlight {...defaultProps} code={code} language="json" theme={nighhtowl}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className + " p-4"}
          style={{ ...style, backgroundColor: "transparent" }}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
