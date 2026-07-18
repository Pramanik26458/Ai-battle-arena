import { useState, useEffect } from "react";
import { Swords, CornerRightDown, Zap } from "lucide-react";
import Header from "../components/Header";
import ChatInput from "../components/ChatInput";
import ProblemCard from "../components/ProblemCard";
import SolutionCard from "../components/SolutionCard";
import JudgePanel from "../components/JudgePanel";
import LoadingState from "../components/LoadingState";
import { fetchComparison } from "../lib/mockApi";

// ── Hero / Empty State ───────────────────────────────────────────────────────
function EmptyState({ onExampleClick }) {
  const examples = [
    "Write a binary search function in TypeScript",
    "Explain React's useEffect hook in depth",
    "Design a rate limiter for 10k RPS",
    "Build a debounce utility in JavaScript",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[55vh] text-center space-y-10 animate-fade-up px-4">
      {/* Logo mark */}
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center shadow-glow mx-auto">
          <Swords size={28} className="text-white" />
        </div>
        <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-accent blur-2xl opacity-30 mx-auto animate-pulse-slow" />
      </div>

      {/* Headline */}
      <div className="space-y-3 max-w-lg">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-tight leading-tight">
          Compare AI Solutions{" "}
          <span className="text-accent">Side by Side</span>
        </h1>
        <p className="text-text-secondary text-base leading-relaxed">
          Submit any prompt and get two independent AI-generated solutions,
          then let the judge pick the best one.
        </p>
      </div>

      {/* Example prompts */}
      <div className="space-y-2.5 w-full max-w-xl">
        <p className="text-xs text-text-muted uppercase tracking-widest font-medium flex items-center gap-1.5 justify-center">
          <Zap size={11} className="text-accent" />
          Try an example
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => onExampleClick(ex)}
              className="text-left px-4 py-3 rounded-xl card text-sm text-text-secondary
                         hover:text-text-primary hover:border-accent/30 hover:bg-accent-muted
                         transition-all duration-150 group"
            >
              <span className="text-accent mr-2 opacity-60 group-hover:opacity-100">→</span>
              {ex}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Results View ─────────────────────────────────────────────────────────────
function ResultsView({ data }) {
  const { problem, solution_1, solution_2, judge } = data;
  const winnerNumber = judge.solution_1_score >= judge.solution_2_score ? 1 : 2;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Problem */}
      <ProblemCard problem={problem} />

      {/* Solutions grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

      {/* Judge */}
      <JudgePanel judge={judge} />
    </div>
  );
}

// ── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [status, setStatus] = useState("idle"); // idle | loading | done | error
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isDark, setIsDark] = useState(() => {
    // Check local storage or system preference
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  // Effect to apply class
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
    setIsDark((prev) => {
      const next = !prev;
      const root = window.document.documentElement;
      if (next) {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  const handleSubmit = async (prompt) => {
    setStatus("loading");
    setResult(null);
    setError(null);

    try {
      const res = await fetchComparison(prompt);
      setResult(res.data);
      setStatus("done");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const handleExampleClick = (prompt) => {
    handleSubmit(prompt);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col transition-colors duration-200">
      <Header isDark={isDark} onToggleTheme={toggleTheme} />

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        {/* Content area */}
        {status === "idle" && (
          <EmptyState onExampleClick={handleExampleClick} />
        )}

        {status === "loading" && <LoadingState />}

        {status === "done" && result && (
          <ResultsView data={result} />
        )}

        {/* Chat input — placed at the bottom */}
        <ChatInput onSubmit={handleSubmit} isLoading={status === "loading"} />

        {status === "error" && (
          <div className="animate-fade-up card px-5 py-6 text-center space-y-2">
            <p className="text-sm font-medium text-red-400">Error</p>
            <p className="text-sm text-text-secondary">{error}</p>
            <button
              onClick={() => setStatus("idle")}
              className="btn-ghost mt-2 mx-auto"
            >
              Try again
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-border py-5 px-4 text-center">
        <p className="text-xs text-text-muted">
          AI Battle Arena — Compare, Evaluate, Choose
        </p>
      </footer>
    </div>
  );
}
