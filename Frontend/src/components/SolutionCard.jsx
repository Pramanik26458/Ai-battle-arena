import { useState } from "react";
import { Copy, Check, Trophy } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";

const MODEL_LABELS = {
  1: { name: "Model A", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  2: { name: "Model B", color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
};

function ScoreBadge({ score }) {
  const color =
    score >= 8 ? "bg-score-high/10 text-score-high border-score-high/20"
    : score >= 5 ? "bg-score-mid/10 text-score-mid border-score-mid/20"
    : "bg-score-low/10 text-score-low border-score-low/20";

  return (
    <span className={`score-pill border ${color}`}>
      {score}<span className="opacity-50">/10</span>
    </span>
  );
}

export default function SolutionCard({ number, content, score, isWinner, animDelay = 0 }) {
  const [copied, setCopied] = useState(false);
  const meta = MODEL_LABELS[number] || MODEL_LABELS[1];

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={`animate-fade-up flex flex-col card overflow-hidden transition-all duration-200
        ${isWinner ? "ring-1 ring-winner-gold/40 shadow-glow-gold" : "hover:border-white/10"}
      `}
      style={{ animationDelay: `${animDelay}ms` }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border bg-surface-elevated/50">
        <div className="flex items-center gap-2.5">
          {/* Model badge */}
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-md border ${meta.bg} ${meta.color} ${meta.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${meta.color.replace("text-", "bg-")}`} />
            {meta.name}
          </span>

          {/* Winner badge */}
          {isWinner && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-winner-goldMuted text-winner-gold border border-winner-gold/25">
              <Trophy size={10} />
              Winner
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {score !== undefined && <ScoreBadge score={score} />}

          {/* Copy button */}
          <button
            id={`copy-solution-${number}-btn`}
            onClick={handleCopy}
            className="btn-ghost"
            title="Copy solution"
          >
            {copied ? (
              <><Check size={12} className="text-score-high" /><span>Copied</span></>
            ) : (
              <><Copy size={12} /><span>Copy</span></>
            )}
          </button>
        </div>
      </div>

      {/* Solution Body */}
      <div className="flex-1 px-5 py-4 overflow-auto">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
