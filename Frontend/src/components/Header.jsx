import { Swords, Sun, Moon, Plus } from "lucide-react";

export default function Header({ isDark, onToggleTheme, showNewBattle, onNewBattle }) {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-surface/80 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo & Brand */}
        <div
          onClick={onNewBattle}
          className={`flex items-center gap-2.5 group ${showNewBattle ? "cursor-pointer" : "cursor-default"}`}
          title={showNewBattle ? "Back to ModelBench AI Home" : undefined}
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-105 border border-white/20">
              <Swords size={16} className="text-white transform group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="absolute -inset-0.5 rounded-xl bg-indigo-500/20 blur-xs -z-10" />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-extrabold tracking-tight text-text-primary flex items-center">
              Model<span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Bench</span>
            </span>
            <span className="hidden sm:inline-block text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              AI
            </span>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* New Battle Button (when viewing results) */}
          {showNewBattle && (
            <button
              onClick={onNewBattle}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 transition-all duration-150 active:scale-95 shadow-xs"
            >
              <Plus size={13} />
              <span>New Benchmark</span>
            </button>
          )}

          {/* Live Status indicator */}
          <div className="flex items-center gap-1.5 text-xs font-medium text-text-secondary bg-surface-card/80 border border-surface-border rounded-full px-2.5 py-1 shadow-2xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="hidden xs:inline text-[11px] font-medium">Ready</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-lg border border-surface-border bg-surface-card hover:bg-surface-elevated text-text-secondary hover:text-text-primary flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xs"
            aria-label="Toggle Theme"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <Sun size={15} className="text-amber-400 transition-transform duration-200 rotate-0 hover:rotate-45" />
            ) : (
              <Moon size={15} className="text-indigo-600 transition-transform duration-200 -rotate-12 hover:rotate-0" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
