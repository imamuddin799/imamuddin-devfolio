interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse rounded-lg ${className}`}
            style={{ background: 'var(--glass-bg-hover)' }}
            aria-hidden="true"
        />
    );
}

/* ── Preset skeletons ───────────────────────────────────────── */

export function CourseCardSkeleton() {
    return (
        <div
            className="rounded-2xl p-5 flex flex-col gap-4"
            style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-subtle)',
            }}
        >
            <div className="flex items-start justify-between">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <Skeleton className="w-16 h-5 rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
                <Skeleton className="w-3/4 h-5" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-2/3 h-4" />
            </div>
            <div className="flex gap-3 mt-auto pt-2">
                <Skeleton className="w-20 h-4" />
                <Skeleton className="w-20 h-4" />
            </div>
        </div>
    );
}

export function FileListSkeleton({ rows = 6 }: { rows?: number }) {
    return (
        <div className="flex flex-col gap-2">
            {Array.from({ length: rows }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-subtle)' }}
                >
                    <Skeleton className="w-4 h-4 rounded" />
                    <Skeleton className="flex-1 h-4" />
                    <Skeleton className="w-12 h-4 rounded-full" />
                </div>
            ))}
        </div>
    );
}

export function ProjectCardSkeleton() {
    return (
        <div
            className="rounded-2xl p-5 flex flex-col gap-3"
            style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-subtle)',
            }}
        >
            <div className="flex items-center justify-between">
                <Skeleton className="w-1/2 h-5" />
                <Skeleton className="w-20 h-5 rounded-full" />
            </div>
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-4/5 h-4" />
            <div className="flex gap-2 mt-2">
                <Skeleton className="w-14 h-5 rounded-full" />
                <Skeleton className="w-14 h-5 rounded-full" />
                <Skeleton className="w-14 h-5 rounded-full" />
            </div>
        </div>
    );
}

export function TabContentSkeleton() {
    return (
        <div className="flex flex-col gap-3">
            <FileListSkeleton rows={8} />
        </div>
    );
}