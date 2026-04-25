'use client';

import { useState, useRef, useCallback, type ReactNode } from 'react';
import { GripVertical } from 'lucide-react';

interface SplitLayoutProps {
    left: ReactNode;
    right: ReactNode;
    defaultSplit?: number;   // percentage for left panel, default 55
}

export default function SplitLayout({
    left,
    right,
    defaultSplit = 55,
}: SplitLayoutProps) {
    const [splitPct, setSplitPct] = useState(defaultSplit);
    const [dragging, setDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    /* ── Drag handler ────────────────────────────────────────── */
    const onMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setDragging(true);

        const startX = e.clientX;
        const startPct = splitPct;
        const container = containerRef.current;
        if (container === null) return;

        const onMove = (ev: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const delta = ev.clientX - startX;
            const newPct = startPct + (delta / rect.width) * 100;
            setSplitPct(Math.min(80, Math.max(20, newPct)));
        };

        const onUp = () => {
            setDragging(false);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
    }, [splitPct]);

    /* ── Mobile: full-width tabs instead of split ────────────── */
    const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

    return (
        <>
            {/* ── Desktop split view ──────────────────────────────── */}
            <div
                ref={containerRef}
                className="hidden md:flex h-full w-full overflow-hidden"
                style={{ cursor: dragging ? 'col-resize' : 'default', userSelect: dragging ? 'none' : 'auto' }}
            >
                {/* Left — code */}
                <div className="flex flex-col overflow-hidden" style={{ width: `${splitPct}%` }}>
                    {left}
                </div>

                {/* Drag handle */}
                <div
                    className="flex-shrink-0 flex items-center justify-center w-1.5 transition-colors duration-150 cursor-col-resize group relative"
                    style={{
                        background: dragging ? 'var(--accent-1)' : 'var(--border-subtle)',
                    }}
                    onMouseDown={onMouseDown}
                >
                    <div
                        className="absolute flex items-center justify-center w-5 h-8 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{
                            background: 'var(--bg-elevated)',
                            border: '1px solid var(--border-default)',
                        }}
                    >
                        <GripVertical className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
                    </div>
                </div>

                {/* Right — preview */}
                <div
                    className="flex flex-col overflow-hidden"
                    style={{ width: `${100 - splitPct - 0.4}%` }}
                >
                    {right}
                </div>
            </div>

            {/* ── Mobile tab view ─────────────────────────────────── */}
            <div className="flex flex-col md:hidden h-full">
                {/* Tab switcher */}
                <div
                    className="flex flex-shrink-0"
                    style={{ borderBottom: '1px solid var(--border-subtle)' }}
                >
                    {(['code', 'preview'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="flex-1 py-2.5 text-sm font-semibold capitalize transition-all duration-200"
                            style={{
                                color: activeTab === tab ? 'var(--accent-1)' : 'var(--text-muted)',
                                borderBottom: activeTab === tab ? '2px solid var(--accent-1)' : '2px solid transparent',
                                background: 'transparent',
                            }}
                        >
                            {tab === 'code' ? '⌨️ Code' : '👁️ Preview'}
                        </button>
                    ))}
                </div>

                {/* Active panel */}
                <div className="flex-1 overflow-hidden">
                    {activeTab === 'code' ? left : right}
                </div>
            </div>
        </>
    );
}