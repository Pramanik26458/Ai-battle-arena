import { Swords, Sparkles, Sun, Moon } from "lucide-react";

export default function Header({ isDark, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-surface/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shadow-glow">
            <Swords size={14} className="text-white" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-text-primary">
            AI Battle Arena
          </span>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-text-muted border border-surface-border rounded-full px-3 py-1">
            <Sparkles size={11} className="text-accent" />
            <span>Compare AI Solutions</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-lg border border-surface-border bg-surface-card hover:bg-surface-elevated text-text-secondary hover:text-text-primary flex items-center justify-center transition-all duration-150"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
}
