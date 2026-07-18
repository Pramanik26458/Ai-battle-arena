import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "text";
  const code = String(children).replace(/\n$/, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative group/code my-3">
      {/* Language label + copy */}
      <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover/code:opacity-100 transition-opacity z-10">
        <span className="text-[10px] font-mono text-text-muted bg-surface/80 border border-surface-border rounded px-1.5 py-0.5">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="p-1 rounded bg-surface/80 border border-surface-border text-text-muted hover:text-text-primary transition-colors"
          title="Copy code"
        >
          {copied ? <Check size={11} className="text-score-high" /> : <Copy size={11} />}
        </button>
      </div>

      <SyntaxHighlighter
        style={oneDark}
        language={language}
        PreTag="div"
        className="syntax-block !rounded-lg !text-xs !m-0"
        customStyle={{
          background: "#0d0d11",
          borderColor: "#1e1e24",
          padding: "1rem 1.25rem",
        }}
        codeTagProps={{ style: { fontFamily: '"JetBrains Mono", monospace' } }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default function MarkdownRenderer({ content }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none
      prose-p:text-text-secondary prose-p:leading-relaxed prose-p:my-2
      prose-headings:text-text-primary prose-headings:font-semibold
      prose-h1:text-base prose-h2:text-sm prose-h3:text-sm
      prose-strong:text-text-primary prose-strong:font-semibold
      prose-em:text-text-secondary
      prose-ul:text-text-secondary prose-ol:text-text-secondary
      prose-li:my-0.5
      prose-blockquote:border-accent/40 prose-blockquote:text-text-muted
      prose-hr:border-surface-border
      prose-a:text-accent prose-a:no-underline hover:prose-a:underline
    ">
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }) {
            if (inline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <CodeBlock className={className} {...props}>
                {children}
              </CodeBlock>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
