import { Swords, Bot, Cpu, Sparkles, Loader2 } from "lucide-react";

function SkeletonLine({ width = "w-full", height = "h-3" }) {
  return (
    <div
      className={`${width} ${height} rounded-md shimmer-bg`}
    />
  );
}

function CardSkeleton({ modelNumber, label, icon: Icon, colorClass, borderClass }) {
  return (
    <div className={`card overflow-hidden border ${borderClass} relative`}>
      {/* Header Skeleton */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-surface-border bg-surface-elevated/40">
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg ${colorClass} flex items-center justify-center`}>
            <Icon size={14} className="text-white animate-pulse" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-text-primary">{label}</span>
            <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
              <Loader2 size={10} className="animate-spin text-indigo-400" />
              <span>Generating response...</span>
            </div>
          </div>
        </div>

        <div className="h-6 w-16 rounded-full shimmer-bg" />
      </div>

      {/* Body Skeleton */}
      <div className="px-6 py-5 space-y-3.5">
        <SkeletonLine width="w-3/4" height="h-4" />
        <SkeletonLine width="w-full" />
        <SkeletonLine width="w-5/6" />
        <SkeletonLine width="w-4/6" />

        {/* Mock Code Block Skeleton */}
        <div className="my-4 rounded-xl border border-surface-border p-4 space-y-2.5 bg-surface-elevated/50">
          <div className="flex items-center justify-between pb-2 border-b border-surface-border/50">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-slate-600" />
              <div className="w-2 h-2 rounded-full bg-slate-600" />
              <div className="w-2 h-2 rounded-full bg-slate-600" />
            </div>
            <div className="h-2.5 w-12 rounded shimmer-bg" />
          </div>
          <SkeletonLine width="w-1/2" height="h-3" />
          <SkeletonLine width="w-3/4" height="h-3" />
          <SkeletonLine width="w-2/3" height="h-3" />
        </div>

        <SkeletonLine width="w-full" />
        <SkeletonLine width="w-4/5" />
        <SkeletonLine width="w-3/5" />
      </div>
    </div>
  );
}

function JudgeSkeleton() {
  return (
    <div className="card overflow-hidden border-surface-border/80">
      <div className="flex items-center gap-3 px-6 py-4.5 border-b border-surface-border bg-surface-elevated/40">
        <div className="w-8 h-8 rounded-xl shimmer-bg flex-shrink-0" />
        <div className="space-y-1.5 flex-1">
          <div className="h-2.5 w-28 rounded shimmer-bg" />
          <div className="h-4 w-44 rounded shimmer-bg" />
        </div>
      </div>
      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl bg-surface-elevated/30 border border-surface-border">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <div className="h-3 w-16 rounded shimmer-bg" />
                <div className="h-3 w-12 rounded shimmer-bg" />
              </div>
              <div className="h-2.5 w-full rounded-full shimmer-bg" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-surface-border p-5 space-y-2.5">
              <div className="h-3 w-28 rounded shimmer-bg" />
              <SkeletonLine width="w-full" />
              <SkeletonLine width="w-5/6" />
              <SkeletonLine width="w-4/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LoadingState() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Live Duel Banner */}
      <div className="p-4 rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-glow">
            <Swords size={18} className="animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Battle in Progress</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            </div>
            <p className="text-xs text-text-secondary">
              Both models are generating responses simultaneously. The AI Judge will evaluate results once complete.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-text-muted bg-surface-card px-3 py-1.5 rounded-lg border border-surface-border">
          <Loader2 size={13} className="animate-spin text-indigo-400" />
          <span>Awaiting outputs…</span>
        </div>
      </div>

      {/* Solutions grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <CardSkeleton
          modelNumber={1}
          label="Model A"
          icon={Bot}
          colorClass="bg-indigo-500"
          borderClass="border-indigo-500/20"
        />
        <CardSkeleton
          modelNumber={2}
          label="Model B"
          icon={Cpu}
          colorClass="bg-cyan-500"
          borderClass="border-cyan-500/20"
        />
      </div>

      {/* Judge skeleton */}
      <JudgeSkeleton />
    </div>
  );
}
