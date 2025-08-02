"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const codeContent = (
    <div className="relative">
      <SyntaxHighlighter
        language={language}
        style={theme === "light" ? oneLight : oneDark}
        customStyle={{
          margin: 0,
          borderRadius: "0.375rem",
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
          paddingRight: "3rem", // Make space for copy button
        }}
        wrapLongLines={true}
      >
        {children.trim()}
      </SyntaxHighlighter>
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-background/80"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="sr-only">
          {copied ? "Copied!" : "Copy code"}
        </span>
      </Button>
    </div>
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