import { Trophy, ChevronRight } from "lucide-react";

function ScoreBar({ score, label, modelColor }) {
  const percent = Math.round((score / 10) * 100);
  const barColor =
    score >= 8 ? "bg-score-high"
    : score >= 5 ? "bg-score-mid"
    : "bg-score-low";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className={`font-medium ${modelColor}`}>{label}</span>
        <span className="font-semibold font-mono text-text-primary">
          {score}<span className="text-text-muted">/10</span>
        </span>
      </div>
      <div className="h-1.5 w-full bg-surface-elevated rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-700`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function ReasoningBlock({ label, reasoning, modelColor, borderColor }) {
  return (
    <div className={`rounded-lg border ${borderColor} bg-surface p-4 space-y-2`}>
      <p className={`text-xs font-semibold uppercase tracking-widest ${modelColor}`}>
        {label}
      </p>
      <p className="text-sm text-text-secondary leading-relaxed">{reasoning}</p>
    </div>
  );
}

export default function JudgePanel({ judge }) {
  const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judge;
  const winnerNumber = solution_1_score >= solution_2_score ? 1 : 2;
  const winnerLabel = winnerNumber === 1 ? "Model A" : "Model B";
  const isTie = solution_1_score === solution_2_score;

  return (
    <div className="animate-fade-up delay-300 card overflow-hidden" id="judge-panel">
      {/* Panel Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-surface-border bg-surface-elevated/50">
        <div className="w-7 h-7 rounded-lg bg-winner-goldMuted border border-winner-gold/25 flex items-center justify-center flex-shrink-0">
          <Trophy size={13} className="text-winner-gold" />
        </div>
        <div>
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest">
            Judge Recommendation
          </p>
          <p className="text-sm font-semibold text-text-primary mt-0.5">
            {isTie ? "It's a Tie!" : `${winnerLabel} wins`}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-5 space-y-5">
        {/* Score bars */}
        <div className="space-y-3">
          <ScoreBar
            score={solution_1_score}
            label="Model A"
            modelColor="text-violet-400"
          />
          <ScoreBar
            score={solution_2_score}
            label="Model B"
            modelColor="text-sky-400"
          />
        </div>

        <div className="h-px bg-surface-border" />

        {/* Reasoning blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ReasoningBlock
            label="Model A reasoning"
            reasoning={solution_1_reasoning}
            modelColor="text-violet-400"
            borderColor="border-violet-500/15"
          />
          <ReasoningBlock
            label="Model B reasoning"
            reasoning={solution_2_reasoning}
            modelColor="text-sky-400"
            borderColor="border-sky-500/15"
          />
        </div>
      </div>
    </div>
  );
}
