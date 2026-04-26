'use client';

import { useState } from 'react';
import { Database, Play, Loader2, RotateCcw, AlertCircle } from 'lucide-react';
import { useSqlRunner } from '@/hooks/useSqlRunner';

interface SqlPreviewProps {
    initialSql: string;
}

export default function SqlPreview({ initialSql }: SqlPreviewProps) {
    const [sql, setSql] = useState(initialSql);
    const { state, result, run, reset } = useSqlRunner();

    const handleRun = () => { void run(sql); };

    const handleReset = () => {
        setSql(initialSql);
        reset();
    };

    const isRunning = state === 'loading' || state === 'running';

    return (
        <div className="flex flex-col h-full overflow-hidden">

            {/* Header */}
            <div
                className="flex items-center gap-2 px-4 py-2.5 flex-shrink-0"
                style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)' }}
            >
                <Database className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>SQL Runner</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono ml-1"
                    style={{ background: 'rgba(6,182,212,0.12)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.25)' }}>
                    SQLite (in-browser)
                </span>

                <div className="ml-auto flex items-center gap-2">
                    <button
                        onClick={handleReset}
                        aria-label="Reset SQL"
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs transition-all duration-200 hover:scale-105"
                        style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-default)', color: 'var(--text-muted)' }}
                    >
                        <RotateCcw className="w-3 h-3" /> Reset
                    </button>

                    <button
                        onClick={handleRun}
                        disabled={isRunning}
                        aria-label="Run SQL"
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{
                            background: 'color-mix(in srgb, var(--accent-1) 12%, transparent)',
                            border: '1px solid color-mix(in srgb, var(--accent-1) 30%, transparent)',
                            color: 'var(--accent-1)',
                        }}
                    >
                        {isRunning
                            ? <><Loader2 className="w-3 h-3 animate-spin" /> Running…</>
                            : <><Play className="w-3 h-3" /> Run</>
                        }
                    </button>
                </div>
            </div>

            {/* Editable SQL textarea */}
            <div className="flex-shrink-0 p-3" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <textarea
                    value={sql}
                    onChange={(e) => setSql(e.target.value)}
                    spellCheck={false}
                    rows={Math.min(sql.split('\n').length + 1, 8)}
                    className="w-full resize-none text-xs font-mono rounded-xl p-3 outline-none transition-colors duration-200"
                    style={{
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-default)',
                        color: 'var(--text-primary)',
                        lineHeight: '1.6',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-default)'; }}
                />
            </div>

            {/* Output area */}
            <div className="flex-1 overflow-auto p-3">

                {/* Idle */}
                {state === 'idle' && (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                        <Database className="w-10 h-10" style={{ color: 'var(--text-muted)' }} />
                        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                            Edit SQL above and click <span style={{ color: 'var(--accent-1)' }}>Run</span>
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Results appear here</p>
                    </div>
                )}

                {/* Loading skeleton */}
                {isRunning && (
                    <div className="flex flex-col gap-2 animate-pulse">
                        <div className="h-7 rounded-lg" style={{ background: 'var(--border-subtle)' }} />
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-5 rounded" style={{ background: 'var(--glass-bg)', width: `${100 - i * 8}%` }} />
                        ))}
                    </div>
                )}

                {/* Error */}
                {result !== null && result.error !== null && (
                    <div
                        className="flex items-start gap-3 p-4 rounded-xl"
                        style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.20)' }}
                    >
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#f87171' }} />
                        <div>
                            <p className="text-xs font-semibold mb-1" style={{ color: '#f87171' }}>SQL Error</p>
                            <pre className="text-xs font-mono whitespace-pre-wrap" style={{ color: '#fca5a5' }}>
                                {result.error}
                            </pre>
                        </div>
                    </div>
                )}

                {/* Results table */}
                {result !== null && result.error === null && result.rows.length === 0 && state === 'done' && (
                    <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
                        Query executed successfully. No rows returned.
                        {result.timeMs > 0 && <span> ({result.timeMs.toFixed(1)}ms)</span>}
                    </p>
                )}

                {result !== null && result.error === null && result.rows.map((table, ti) => (
                    <div key={ti} className="mb-4">
                        {/* Time badge */}
                        <p className="text-[10px] mb-2" style={{ color: 'var(--text-muted)' }}>
                            {table.values.length} row{table.values.length !== 1 ? 's' : ''}
                            {result.timeMs > 0 && ` · ${result.timeMs.toFixed(1)}ms`}
                        </p>

                        {/* Table */}
                        <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--border-default)' }}>
                            <table className="w-full text-xs">
                                <thead>
                                    <tr style={{ background: 'var(--bg-elevated)' }}>
                                        {table.columns.map((col) => (
                                            <th
                                                key={col}
                                                className="px-3 py-2 text-left font-semibold font-mono whitespace-nowrap"
                                                style={{ color: 'var(--accent-1)', borderBottom: '1px solid var(--border-default)' }}
                                            >
                                                {col}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {table.values.map((row, ri) => (
                                        <tr
                                            key={ri}
                                            style={{ borderBottom: '1px solid var(--border-subtle)' }}
                                            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--glass-bg)'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                                        >
                                            {row.map((cell, ci) => (
                                                <td
                                                    key={ci}
                                                    className="px-3 py-2 font-mono whitespace-nowrap"
                                                    style={{ color: cell === null ? 'var(--text-muted)' : 'var(--text-primary)' }}
                                                >
                                                    {cell === null ? 'NULL' : String(cell)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}