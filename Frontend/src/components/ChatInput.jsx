import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles, X, CornerDownLeft } from "lucide-react";

export default function ChatInput({ onSubmit, isLoading, placeholder = "Type your prompt to compare two AI models head-to-head..." }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize text container dynamically
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 180) + "px";
  }, [value]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleClear = () => {
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className={`relative card backdrop-blur-2xl transition-all duration-200 shadow-xl border-surface-border/90 ${
          isLoading
            ? "opacity-70 cursor-not-allowed"
            : "hover:border-indigo-500/50 focus-within:border-indigo-500/70 focus-within:ring-2 focus-within:ring-indigo-500/25 focus-within:shadow-glow"
        }`}
      >
        <div className="relative">
          <textarea
            ref={textareaRef}
            id="prompt-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder={placeholder}
            rows={1}
            className="w-full resize-none bg-transparent px-5 sm:px-6 pt-4 pb-14 text-base sm:text-lg text-text-primary placeholder:text-text-muted outline-none leading-relaxed font-normal"
            style={{ minHeight: "64px" }}
          />

          {/* Clear Button */}
          {value && !isLoading && (
            <button
              onClick={handleClear}
              className="absolute top-3.5 right-4 p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors cursor-pointer"
              title="Clear input"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Action tray controls */}
        <div className="absolute bottom-2.5 left-5 right-3 flex items-center justify-between pointer-events-none">
          {/* Keyboard hints */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-text-muted select-none">
            <span className="flex items-center gap-1">
              <kbd className="inline-flex items-center font-mono text-[11px] bg-surface-elevated border border-surface-border rounded px-1.5 py-0.5 text-text-secondary font-medium">
                Enter ↵
              </kbd>
              <span>to send</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <kbd className="inline-flex items-center font-mono text-[11px] bg-surface-elevated border border-surface-border rounded px-1.5 py-0.5 text-text-secondary font-medium">
                Shift + Enter
              </kbd>
              <span>newline</span>
            </span>
          </div>

          <div className="sm:hidden text-xs text-text-muted">
            {value.length > 0 ? `${value.length} chars` : ""}
          </div>

          {/* Submit Button */}
          <div className="pointer-events-auto">
            <button
              id="submit-prompt-btn"
              onClick={handleSubmit}
              disabled={!value.trim() || isLoading}
              className="btn-primary text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-2 shadow-md cursor-pointer disabled:cursor-not-allowed font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Evaluating…</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} className="text-indigo-200" />
                  <span>Fight & Compare</span>
                  <CornerDownLeft size={13} className="opacity-75 hidden sm:inline" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
