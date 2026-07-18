import { useState, useRef, useEffect } from "react";
import { Send, Loader2, CornerDownLeft } from "lucide-react";

export default function ChatInput({ onSubmit, isLoading }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  // Auto-resize textarea
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

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-0">
      <div
        className={`relative card transition-all duration-200 ${
          isLoading
            ? "opacity-60"
            : "hover:border-accent/30 focus-within:border-accent/50 focus-within:shadow-glow"
        }`}
      >
        <textarea
          ref={textareaRef}
          id="prompt-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder="Ask anything — compare two AI solutions side by side..."
          rows={1}
          className="w-full resize-none bg-transparent px-4 pt-4 pb-12 text-sm text-text-primary placeholder-text-muted outline-none leading-relaxed"
          style={{ minHeight: "56px" }}
        />

        {/* Footer row */}
        <div className="absolute bottom-3 left-4 right-3 flex items-center justify-between">
          <p className="text-xs text-text-muted">
            <kbd className="inline-flex items-center gap-0.5 font-mono text-[10px] border border-surface-border rounded px-1 py-0.5 text-text-muted mr-1">
              ↵
            </kbd>
            to submit,{" "}
            <kbd className="inline-flex items-center gap-0.5 font-mono text-[10px] border border-surface-border rounded px-1 py-0.5 text-text-muted mx-1">
              ⇧↵
            </kbd>
            for new line
          </p>

          <button
            id="submit-prompt-btn"
            onClick={handleSubmit}
            disabled={!value.trim() || isLoading}
            className="btn-primary px-3 py-1.5 text-xs gap-1.5"
          >
            {isLoading ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                <span>Generating…</span>
              </>
            ) : (
              <>
                <Send size={13} />
                <span>Compare</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
