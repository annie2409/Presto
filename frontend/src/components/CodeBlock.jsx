import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlock = ({ codeString, width, height, langauge }) => {
  return (
    <SyntaxHighlighter
      language={langauge}
      style={dark}
      customStyle={{
        width,
        height,
        backgroundColor: '#2b2b2b', // Optional background color
        borderRadius: 4, // Optional border radius
        padding: 16, // Optional padding
        fontSize: 14, // Optional font size
      }}
    >
      {codeString.trim()}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
