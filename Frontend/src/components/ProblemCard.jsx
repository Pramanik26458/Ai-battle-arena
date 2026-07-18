import { MessageSquare } from "lucide-react";

export default function ProblemCard({ problem }) {
  return (
    <div className="animate-fade-up card px-5 py-4 flex gap-3.5 items-start">
      <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-lg bg-accent-muted border border-accent/20 flex items-center justify-center">
        <MessageSquare size={13} className="text-accent" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-1.5">
          Problem
        </p>
        <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap break-words">
          {problem}
        </p>
      </div>
    </div>
  );
}
