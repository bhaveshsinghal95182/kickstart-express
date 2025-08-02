"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Card, CardContent } from "@/components/ui/card";

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
  showCard?: boolean;
}

export function CodeBlock({ 
  children, 
  language = "bash", 
  className = "", 
  showCard = true 
}: CodeBlockProps) {
  const codeContent = (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      customStyle={{
        margin: 0,
        borderRadius: "0.375rem",
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
      }}
      wrapLongLines={true}
    >
      {children.trim()}
    </SyntaxHighlighter>
  );

  if (showCard) {
    return (
      <Card className={className}>
        <CardContent className="pt-4">
          {codeContent}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      {codeContent}
    </div>
  );
}