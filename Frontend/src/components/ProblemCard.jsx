import { useState } from "react";
import { MessageSquare, Copy, Check, Sparkles } from "lucide-react";

export default function ProblemCard({ problem }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!problem) return;
    navigator.clipboard.writeText(problem).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="animate-fade-up card p-5 sm:p-6 relative overflow-hidden group border-indigo-500/20 bg-gradient-to-r from-surface-card via-surface-card to-indigo-500/[0.02]">
      {/* Decorative accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-60" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3.5 min-w-0 flex-1">
          {/* Icon */}
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400 mt-0.5 shadow-sm">
            <MessageSquare size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Sparkles size={12} />
                Arena Evaluation Prompt
              </span>
            </div>

            <p className="text-base sm:text-lg text-text-primary font-medium leading-relaxed whitespace-pre-wrap break-words">
              {problem}
            </p>
          </div>
        </div>

        {/* Copy Prompt Button */}
        {problem && (
          <button
            onClick={handleCopy}
            className="flex-shrink-0 btn-ghost text-xs px-3 py-1.5 rounded-lg border border-surface-border hover:border-indigo-500/30 transition-all cursor-pointer"
            title="Copy prompt"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span className="text-xs text-emerald-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span className="text-xs hidden sm:inline">Copy Prompt</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
