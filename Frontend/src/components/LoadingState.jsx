function SkeletonLine({ width = "w-full", height = "h-3" }) {
  return (
    <div
      className={`${width} ${height} rounded shimmer-bg`}
    />
  );
}

function CardSkeleton({ label, colorClass }) {
  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-surface-border bg-surface-elevated/50">
        <div className={`h-5 w-20 rounded-md shimmer-bg`} />
        <div className="h-5 w-16 rounded shimmer-bg" />
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-3">
        <SkeletonLine />
        <SkeletonLine width="w-5/6" />
        <SkeletonLine width="w-4/6" />
        <div className="my-2 h-20 rounded-lg shimmer-bg" />
        <SkeletonLine />
        <SkeletonLine width="w-3/4" />
        <SkeletonLine width="w-5/6" />
        <SkeletonLine width="w-2/3" />
      </div>
    </div>
  );
}

function JudgeSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-surface-border bg-surface-elevated/50">
        <div className="w-7 h-7 rounded-lg shimmer-bg flex-shrink-0" />
        <div className="space-y-1.5 flex-1">
          <div className="h-2.5 w-32 rounded shimmer-bg" />
          <div className="h-3.5 w-24 rounded shimmer-bg" />
        </div>
      </div>
      <div className="px-5 py-5 space-y-4">
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between">
                <div className="h-3 w-16 rounded shimmer-bg" />
                <div className="h-3 w-10 rounded shimmer-bg" />
              </div>
              <div className="h-1.5 w-full rounded-full shimmer-bg" />
            </div>
          ))}
        </div>
        <div className="h-px bg-surface-border" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-surface-border p-4 space-y-2">
              <div className="h-2.5 w-28 rounded shimmer-bg" />
              <div className="space-y-1.5">
                <SkeletonLine />
                <SkeletonLine width="w-5/6" />
                <SkeletonLine width="w-4/6" />
              </div>
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
      {/* Solutions grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CardSkeleton label="Model A" colorClass="bg-violet-500/20" />
        <CardSkeleton label="Model B" colorClass="bg-sky-500/20" />
      </div>

      {/* Judge skeleton */}
      <JudgeSkeleton />
    </div>
  );
}
