import { Trophy, Scale, Award, Bot, Cpu } from "lucide-react";

function ScoreBar({ score, label, modelNumber, isWinner }) {
  const percent = Math.min(Math.max(Math.round((score / 10) * 100), 5), 100);

  const isModelA = modelNumber === 1;
  const colorName = isModelA ? "text-indigo-400" : "text-cyan-400";
  const barGradient = isModelA
    ? "from-indigo-600 to-indigo-400"
    : "from-cyan-600 to-cyan-400";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          {isModelA ? <Bot size={15} className="text-indigo-400" /> : <Cpu size={15} className="text-cyan-400" />}
          <span className={`font-bold ${colorName}`}>{label}</span>
          {isWinner && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              Winner
            </span>
          )}
        </div>
        <div className="flex items-baseline gap-1 font-mono">
          <span className="text-base sm:text-lg font-bold text-text-primary">{score}</span>
          <span className="text-xs text-text-muted">/10 pts</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="h-3 w-full bg-surface-elevated rounded-full overflow-hidden p-0.5 border border-surface-border">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barGradient} transition-all duration-1000 ease-out shadow-sm`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function ReasoningCard({ modelNumber, label, reasoning }) {
  const isModelA = modelNumber === 1;
  const accentColor = isModelA ? "text-indigo-400" : "text-cyan-400";
  const borderColor = isModelA ? "border-indigo-500/20" : "border-cyan-500/20";
  const bgGradient = isModelA
    ? "from-indigo-500/[0.04] to-transparent"
    : "from-cyan-500/[0.04] to-transparent";

  return (
    <div className={`rounded-xl border ${borderColor} bg-gradient-to-b ${bgGradient} bg-surface-card p-5 sm:p-6 space-y-3 relative overflow-hidden`}>
      <div className="flex items-center gap-2">
        {isModelA ? <Bot size={16} className="text-indigo-400" /> : <Cpu size={16} className="text-cyan-400" />}
        <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${accentColor}`}>
          {label} Evaluation
        </span>
      </div>

      <p className="text-sm sm:text-base text-text-secondary leading-relaxed whitespace-pre-wrap">
        {reasoning}
      </p>
    </div>
  );
}

export default function JudgePanel({ judge }) {
  const { solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning } = judge;
  const winnerNumber = solution_1_score > solution_2_score ? 1 : solution_2_score > solution_1_score ? 2 : 0;
  const isTie = winnerNumber === 0;
  const winnerLabel = winnerNumber === 1 ? "Model A" : "Model B";
  const scoreDiff = Math.abs(solution_1_score - solution_2_score);

  return (
    <div className="animate-fade-up delay-200 card overflow-hidden border-amber-500/30 shadow-glow-gold" id="judge-panel">
      {/* Official Verdict Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-6 py-4.5 border-b border-surface-border bg-gradient-to-r from-amber-500/10 via-surface-elevated/80 to-indigo-500/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
            <Trophy size={20} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                <Scale size={13} />
                Official Judge Verdict
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-text-primary mt-0.5">
              {isTie ? (
                "Draw — Both Models Performed Equally"
              ) : (
                <>
                  <span className="text-amber-400">{winnerLabel}</span> Declared the Winner
                </>
              )}
            </h3>
          </div>
        </div>

        {/* Verdict Badge */}
        {!isTie && (
          <div className="self-start sm:self-center px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-xs sm:text-sm font-semibold text-amber-400 flex items-center gap-1.5">
            <Award size={14} />
            <span>+{scoreDiff} pt advantage</span>
          </div>
        )}
      </div>

      {/* Panel Content */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* Score comparison metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 rounded-xl bg-surface-elevated/40 border border-surface-border">
          <ScoreBar
            score={solution_1_score}
            label="Model A"
            modelNumber={1}
            isWinner={winnerNumber === 1}
          />
          <ScoreBar
            score={solution_2_score}
            label="Model B"
            modelNumber={2}
            isWinner={winnerNumber === 2}
          />
        </div>

        {/* In-depth reasoning grid */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-text-muted">
              Judge Analysis & Detailed Critique
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReasoningCard
              modelNumber={1}
              label="Model A"
              reasoning={solution_1_reasoning}
            />
            <ReasoningCard
              modelNumber={2}
              label="Model B"
              reasoning={solution_2_reasoning}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
