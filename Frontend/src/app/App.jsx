import { useState, useEffect } from "react";
import { Swords, Zap, Bot, Cpu, Scale, Sparkles, AlertCircle, RefreshCw, Layers } from "lucide-react";
import Header from "../components/Header";
import ChatInput from "../components/ChatInput";
import ProblemCard from "../components/ProblemCard";
import SolutionCard from "../components/SolutionCard";
import JudgePanel from "../components/JudgePanel";
import LoadingState from "../components/LoadingState";
import { fetchComparison } from "../lib/mockApi";

// ── Hero / Empty State View (ChatGPT / Gemini / Claude Style) ────────────────
function EmptyState({ onExampleClick }) {
  const examples = [
    {
      category: "Algorithm",
      title: "Binary search in TypeScript with edge cases",
      icon: "⚡",
    },
    {
      category: "Frontend",
      title: "Explain React's useEffect pitfalls & cleanups",
      icon: "💡",
    },
    {
      category: "Architecture",
      title: "Design a distributed rate limiter for 10k RPS",
      icon: "🏗️",
    },
    {
      category: "Utility",
      title: "Build a modern debounce utility in JavaScript",
      icon: "🔧",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8 animate-fade-up my-auto py-4">
      {/* Top Dual Engine Badge */}
      <div className="inline-flex items-center gap-2.5 bg-surface-card/90 backdrop-blur-md py-1.5 px-4 rounded-full border border-surface-border shadow-sm">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-400">
          <Bot size={15} />
          <span>Model A</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-white shadow-glow text-[10px] font-black">
          VS
        </div>
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-cyan-400">
          <span>Model B</span>
          <Cpu size={15} />
        </div>
      </div>

      {/* Hero Headline with larger, bolder typography */}
      <div className="space-y-3 max-w-2xl">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-text-primary tracking-tight leading-tight">
          Two AI Models Enter. <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            One Champion Solution.
          </span>
        </h1>
        <p className="text-text-secondary text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg mx-auto">
          Submit any engineering problem to evaluate two models head-to-head with autonomous AI judge scoring and critique.
        </p>
      </div>

      {/* Quick Example Suggestions */}
      <div className="w-full space-y-3 pt-2">
        <div className="flex items-center justify-center gap-2 text-xs text-text-muted font-semibold uppercase tracking-wider">
          <Zap size={13} className="text-indigo-400" />
          <span>Select an example to run a benchmark</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {examples.map((ex) => (
            <button
              key={ex.title}
              onClick={() => onExampleClick(ex.title)}
              className="text-left p-3.5 sm:p-4 rounded-2xl card hover:border-indigo-500/50 hover:bg-surface-elevated/90
                         transition-all duration-200 group flex items-center gap-3 cursor-pointer shadow-sm hover:shadow-md"
            >
              <span className="text-base sm:text-lg flex-shrink-0">{ex.icon}</span>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block mb-0.5">
                  {ex.category}
                </span>
                <p className="text-sm sm:text-[15px] text-text-primary group-hover:text-indigo-300 font-semibold truncate transition-colors">
                  {ex.title}
                </p>
              </div>
              <span className="text-indigo-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Micro Feature Chips */}
      <div className="hidden sm:flex items-center justify-center gap-5 text-xs font-medium text-text-muted pt-2">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles size={13} className="text-indigo-400" /> Side-by-Side Comparison
        </span>
        <span>•</span>
        <span className="inline-flex items-center gap-1.5">
          <Scale size={13} className="text-amber-400" /> Automated AI Judge
        </span>
        <span>•</span>
        <span className="inline-flex items-center gap-1.5">
          <Layers size={13} className="text-cyan-400" /> Granular Scoring
        </span>
      </div>
    </div>
  );
}

// ── Results View ─────────────────────────────────────────────────────────────
function ResultsView({ data }) {
  const { problem, solution_1, solution_2, judge } = data;
  const winnerNumber = judge.solution_1_score >= judge.solution_2_score ? 1 : 2;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Problem Card */}
      <ProblemCard problem={problem} />

      {/* Solutions Side-by-Side */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-text-muted">
            Candidate Solutions
          </span>
          <span className="text-xs text-text-muted font-mono">
            Side-by-Side Evaluation
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SolutionCard
            number={1}
            content={solution_1}
            score={judge.solution_1_score}
            isWinner={winnerNumber === 1}
            animDelay={0}
          />
          <SolutionCard
            number={2}
            content={solution_2}
            score={judge.solution_2_score}
            isWinner={winnerNumber === 2}
            animDelay={100}
          />
        </div>
      </div>

      {/* Judge Recommendation & Critique */}
      <JudgePanel judge={judge} />
    </div>
  );
}

// ── Root App Component ────────────────────────────────────────────────────────
export default function App() {
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  // Dark mode theme sync
  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      if (isDark) {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleReset = () => {
    setStatus("idle");
    setResult(null);
    setError(null);
    setCurrentPrompt("");
  };

  const handleSubmit = async (prompt) => {
    setStatus("loading");
    setCurrentPrompt(prompt);
    setResult(null);
    setError(null);

    try {
      const res = await fetchComparison(prompt);

      if (res.success && res.data) {
        setResult(res.data);
        setStatus("done");
      } else {
        throw new Error(res.message || "Failed to process the ModelBench response.");
      }
    } catch (err) {
      console.error("API error encountered:", err);
      setError(err.response?.data?.message || err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col transition-colors duration-200 relative">
      {/* Ambient background glows */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-glow-1" />
        <div className="ambient-glow-2" />
      </div>

      {/* Header */}
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        showNewBattle={status !== "idle"}
        onNewBattle={handleReset}
      />

      {/* Main Layout Area - pb-44 ensures bottom fixed dock never covers content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 pb-44 sm:pb-48 relative z-10 flex flex-col">
        {status === "idle" && (
          <div className="flex-1 flex flex-col justify-center items-center min-h-[calc(100dvh-16rem)]">
            <EmptyState onExampleClick={handleSubmit} />
          </div>
        )}

        {status === "loading" && (
          <div className="space-y-6 animate-fade-in">
            <ProblemCard problem={currentPrompt} />
            <LoadingState />
          </div>
        )}

        {status === "done" && result && (
          <ResultsView data={result} />
        )}

        {status === "error" && (
          <div className="animate-fade-up card p-6 text-center space-y-3 border-rose-500/30 bg-rose-500/5 max-w-xl mx-auto shadow-lg my-auto">
            <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400 mx-auto">
              <AlertCircle size={22} />
            </div>
            <p className="text-base font-bold text-rose-400">Execution Error</p>
            <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">{error}</p>
            <button
              onClick={handleReset}
              className="btn-ghost mt-2 mx-auto text-xs px-4 py-2 border border-surface-border rounded-xl flex items-center gap-1.5 hover:border-text-secondary/40 cursor-pointer"
            >
              <RefreshCw size={13} />
              <span>Dismiss & Return to Bench</span>
            </button>
          </div>
        )}
      </main>

      {/* Fixed bottom input dock */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 sm:pb-6 pt-6 bg-gradient-to-t from-surface via-surface/95 to-transparent pointer-events-none">
        <div className="max-w-3xl mx-auto pointer-events-auto">
          <ChatInput
            onSubmit={handleSubmit}
            isLoading={status === "loading"}
            placeholder={
              status === "idle"
                ? "Ask anything — compare two AI solutions side by side..."
                : "Ask another prompt to run a new benchmark..."
            }
          />
          <p className="text-[11px] sm:text-xs text-text-muted text-center mt-2.5 select-none">
            ModelBench AI benchmarks independent LLMs. Scores provided by automated AI judge.
          </p>
        </div>
      </div>
    </div>
  );
}