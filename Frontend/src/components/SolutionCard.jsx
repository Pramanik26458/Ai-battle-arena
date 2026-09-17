import { useState } from "react";
import { Copy, Check, Trophy, Bot, Cpu, FileText, Award } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";

const MODEL_CONFIGS = {
  1: {
    name: "Model A",
    subtitle: "Candidate 1",
    accentColor: "text-indigo-400",
    badgeBg: "bg-indigo-500/10",
    badgeBorder: "border-indigo-500/25",
    dotColor: "bg-indigo-400",
    headerBg: "from-indigo-500/5 to-transparent",
    icon: Bot,
  },
  2: {
    name: "Model B",
    subtitle: "Candidate 2",
    accentColor: "text-cyan-400",
    badgeBg: "bg-cyan-500/10",
    badgeBorder: "border-cyan-500/25",
    dotColor: "bg-cyan-400",
    headerBg: "from-cyan-500/5 to-transparent",
    icon: Cpu,
  },
};

function ScoreBadge({ score }) {
  const isHigh = score >= 8;
  const isMid = score >= 5 && score < 8;

  const colorStyles = isHigh
    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
    : isMid
    ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
    : "bg-rose-500/10 text-rose-400 border-rose-500/30";

  return (
    <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${colorStyles}`}>
      <span className="text-[10px] uppercase font-sans tracking-wide opacity-75">Score:</span>
      <span>{score}</span>
      <span className="text-[10px] opacity-60">/10</span>
    </div>
  );
}

export default function SolutionCard({ number, content, score, isWinner, animDelay = 0 }) {
  const [copied, setCopied] = useState(false);
  const config = MODEL_CONFIGS[number] || MODEL_CONFIGS[1];
  const IconComponent = config.icon;

  const wordCount = content ? content.trim().split(/\s+/).length : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={`animate-fade-up flex flex-col card overflow-hidden transition-all duration-300 relative
        ${isWinner
          ? "border-amber-400/50 shadow-glow-gold ring-1 ring-amber-400/30 bg-gradient-to-b from-amber-500/[0.03] to-transparent"
          : "hover:border-surface-border/80 hover:shadow-lg"
        }
      `}
      style={{ animationDelay: `${animDelay}ms` }}
    >
      {/* Top Banner if Winner */}
      {isWinner && (
        <div className="bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-yellow-500/20 border-b border-amber-500/30 py-1.5 px-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 tracking-wide uppercase">
            <Trophy size={13} className="text-amber-400 animate-bounce" />
            <span>Judge's Choice — Winner</span>
          </div>
          <span className="text-[10px] font-semibold text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
            Top Pick
          </span>
        </div>
      )}

      {/* Card Header */}
      <div className={`flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-surface-border bg-gradient-to-r ${config.headerBg} bg-surface-elevated/40`}>
        <div className="flex items-center gap-3">
          {/* Model Identity Badge */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${config.badgeBg} ${config.badgeBorder} shadow-sm`}>
            <IconComponent size={15} className={config.accentColor} />
            <div className="flex flex-col">
              <span className={`text-xs font-bold ${config.accentColor}`}>
                {config.name}
              </span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-[11px] text-text-muted">
            <FileText size={11} />
            <span>{wordCount} words</span>
          </div>
        </div>

        {/* Right Header Action: Score & Copy */}
        <div className="flex items-center gap-2.5">
          {score !== undefined && <ScoreBadge score={score} />}

          <button
            id={`copy-solution-${number}-btn`}
            onClick={handleCopy}
            className="btn-ghost text-xs px-2.5 py-1 rounded-lg border border-surface-border hover:border-text-secondary/30 transition-all active:scale-95"
            title="Copy solution text"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-400" />
                <span className="text-emerald-400 font-semibold text-[11px]">Copied</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Solution Markdown Body */}
      <div className="flex-1 px-5 sm:px-6 py-5 overflow-auto max-h-[650px] leading-relaxed">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
