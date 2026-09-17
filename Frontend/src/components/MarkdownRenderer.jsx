import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "code";
  const code = String(children).replace(/\n$/, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative group/code my-4 rounded-xl overflow-hidden border border-surface-border bg-[#0d0f18] shadow-md">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#131724]/90 border-b border-white/5 select-none">
        <div className="flex items-center gap-2">
          {/* Mac-style traffic lights */}
          <div className="flex items-center gap-1.5 mr-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-400">
            <Terminal size={13} className="text-indigo-400" />
            <span>{language}</span>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all duration-150 border border-white/5 active:scale-95 cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Syntax Code Body */}
      <div className="text-xs sm:text-[13px] font-mono overflow-x-auto leading-relaxed">
        <SyntaxHighlighter
          style={oneDark}
          language={language}
          PreTag="div"
          className="syntax-block !bg-transparent !m-0 !p-4"
          customStyle={{
            background: "transparent",
            margin: 0,
            padding: "1.1rem 1.35rem",
          }}
          codeTagProps={{ style: { fontFamily: '"JetBrains Mono", monospace' } }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default function MarkdownRenderer({ content }) {
  return (
    <div className="prose dark:prose-invert prose-base max-w-none
      prose-p:text-text-secondary prose-p:leading-relaxed prose-p:my-3 prose-p:text-[15px] sm:prose-p:text-base
      prose-headings:text-text-primary prose-headings:font-bold prose-headings:tracking-tight
      prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
      prose-strong:text-text-primary prose-strong:font-bold
      prose-em:text-text-secondary
      prose-ul:text-text-secondary prose-ul:my-2.5 prose-ol:text-text-secondary prose-ol:my-2.5
      prose-li:my-1 prose-li:leading-relaxed prose-li:text-[15px] sm:prose-li:text-base
      prose-blockquote:border-l-2 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-500/5 prose-blockquote:py-1.5 prose-blockquote:px-3.5 prose-blockquote:rounded-r-lg prose-blockquote:text-text-secondary prose-blockquote:text-[15px]
      prose-hr:border-surface-border
      prose-a:text-indigo-400 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
      prose-table:border-collapse prose-table:w-full prose-table:my-3.5
      prose-th:border prose-th:border-surface-border prose-th:bg-surface-elevated prose-th:p-2.5 prose-th:text-left prose-th:text-xs sm:prose-th:text-sm prose-th:font-semibold prose-th:text-text-primary
      prose-td:border prose-td:border-surface-border prose-td:p-2.5 prose-td:text-xs sm:prose-td:text-sm prose-td:text-text-secondary
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
