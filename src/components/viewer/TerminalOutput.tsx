'use client';

import { Terminal, Clock, Cpu, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { type ExecutionResult, PISTON_STATUS } from '@/types/Execution.types';

export type ExecState = 'idle' | 'running' | 'success' | 'error';

interface TerminalOutputProps {
    result: ExecutionResult | null;
    state: ExecState;
}

/* ── helpers ──────────────────────────────────────────────── */
function getStatus(result: ExecutionResult): { text: string; color: string } {
    const id = result.status.id;
    if (id === PISTON_STATUS.ACCEPTED) return { text: 'Accepted', color: '#4ade80' };
    if (id === PISTON_STATUS.COMPILATION_ERROR) return { text: 'Compilation Error', color: '#fbbf24' };
    if (id === PISTON_STATUS.RUNTIME_ERROR) return { text: 'Runtime Error', color: '#f87171' };
    if (id === PISTON_STATUS.INTERNAL_ERROR) return { text: 'Internal Error', color: '#f97316' };
    return { text: result.status.description, color: '#94a3b8' };
}

function Block({ label, text, color }: { label: string; text: string; color: string }) {
    return (
        <div className="flex flex-col gap-1.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                {label}
            </p>
            <pre
                className="text-xs leading-relaxed whitespace-pre-wrap break-words font-mono p-3 rounded-xl"
                style={{ color, background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-subtle)' }}
            >
                {text.trim() !== '' ? text : '(empty)'}
            </pre>
        </div>
    );
}

export default function TerminalOutput({ result, state }: TerminalOutputProps) {
    const status = result !== null ? getStatus(result) : null;

    return (
        <div className="flex flex-col h-full overflow-hidden">

            {/* Header */}
            <div
                className="flex items-center gap-2 px-4 py-2.5 flex-shrink-0"
                style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)' }}
            >
                <Terminal className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Terminal</span>

                {state === 'running' && (
                    <span className="ml-auto flex items-center gap-1.5 text-xs font-medium" style={{ color: '#fbbf24' }}>
                        <Loader2 className="w-3 h-3 animate-spin" /> Running…
                    </span>
                )}

                {status !== null && state !== 'running' && (
                    <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold" style={{ color: status.color }}>
                        {state === 'success'
                            ? <CheckCircle2 className="w-3.5 h-3.5" />
                            : <AlertCircle className="w-3.5 h-3.5" />
                        }
                        {status.text}
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

                {/* Idle */}
                {state === 'idle' && (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                        <Terminal className="w-10 h-10" style={{ color: 'var(--text-muted)' }} />
                        <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                            Click <span style={{ color: 'var(--accent-1)' }}>Run</span> to execute
                        </p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Output appears here</p>
                    </div>
                )}

                {/* Running skeleton */}
                {state === 'running' && (
                    <div className="flex flex-col gap-3 animate-pulse">
                        {[90, 65, 80, 50, 75].map((w, i) => (
                            <div
                                key={i}
                                className="h-3 rounded"
                                style={{ width: `${w}%`, background: 'var(--border-subtle)' }}
                            />
                        ))}
                    </div>
                )}

                {/* Results */}
                {result !== null && state !== 'running' && (
                    <>
                        {(result.stdout ?? '').trim() !== '' && (
                            <Block label="Output" text={result.stdout ?? ''} color="#e8f0fe" />
                        )}
                        {(result.stderr ?? '').trim() !== '' && (
                            <Block label="Stderr" text={result.stderr ?? ''} color="#f87171" />
                        )}
                        {(result.compile_output ?? '').trim() !== '' && (
                            <Block label="Compile Error" text={result.compile_output ?? ''} color="#fbbf24" />
                        )}
                        {(result.stdout ?? '').trim() === '' &&
                            (result.stderr ?? '').trim() === '' &&
                            (result.compile_output ?? '').trim() === '' && (
                                <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
                                    No output produced.
                                </p>
                            )}

                        {/* Meta */}
                        <div
                            className="flex items-center gap-5 pt-1 border-t"
                            style={{ borderColor: 'var(--border-subtle)' }}
                        >
                            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                                <Clock className="w-3 h-3" />{result.time ?? '—'}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
                                <Cpu className="w-3 h-3" />{result.memory !== 0 ? `${result.memory} KB` : '—'}
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}