'use client';

import { Play, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { type ExecState } from './TerminalOutput';

interface RunButtonProps {
    state: ExecState;
    onRun: () => void;
    disabled?: boolean;
}

const CONFIG: Record<ExecState, { label: string; icon: React.ElementType; color: string; bg: string; border: string }> = {
    idle: {
        label: 'Run',
        icon: Play,
        color: 'var(--accent-1)',
        bg: 'color-mix(in srgb, var(--accent-1) 12%, transparent)',
        border: 'color-mix(in srgb, var(--accent-1) 30%, transparent)',
    },
    running: {
        label: 'Running…',
        icon: Loader2,
        color: '#fbbf24',
        bg: 'rgba(251,191,36,0.10)',
        border: 'rgba(251,191,36,0.25)',
    },
    success: {
        label: 'Done',
        icon: CheckCircle2,
        color: '#4ade80',
        bg: 'rgba(74,222,128,0.10)',
        border: 'rgba(74,222,128,0.25)',
    },
    error: {
        label: 'Error',
        icon: XCircle,
        color: '#f87171',
        bg: 'rgba(248,113,113,0.10)',
        border: 'rgba(248,113,113,0.25)',
    },
};

export default function RunButton({ state, onRun, disabled = false }: RunButtonProps) {
    const cfg = CONFIG[state];
    const Icon = cfg.icon;
    const isActive = state === 'running' || disabled;

    return (
        <button
            onClick={onRun}
            disabled={isActive}
            aria-label={cfg.label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            style={{
                color: cfg.color,
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
            }}
        >
            <Icon className={`w-3.5 h-3.5 ${state === 'running' ? 'animate-spin' : ''}`} />
            {cfg.label}
        </button>
    );
}