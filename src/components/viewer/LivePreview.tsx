'use client';

import { Eye, EyeOff } from 'lucide-react';
import HtmlPreview from './HtmlPreview';
import TerminalOutput from './TerminalOutput';
import SqlPreview from './SqlPreview';
import { getPreviewType } from '@/lib/language';
import { type ExecutionResult } from '@/types/Execution.types';
import { type ExecState } from './TerminalOutput';

interface LivePreviewProps {
    code: string;
    filename: string;
    // execution (terminal languages)
    execState?: ExecState;
    execResult?: ExecutionResult | null;
}

function Header({ label }: { label: string }) {
    return (
        <div
            className="flex items-center gap-2 px-4 py-2.5 flex-shrink-0"
            style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)' }}
        >
            <Eye className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{label}</span>
        </div>
    );
}

export default function LivePreview({
    code,
    filename,
    execState = 'idle',
    execResult = null,
}: LivePreviewProps) {
    const previewType = getPreviewType(filename);

    if (previewType === 'iframe') {
        return <HtmlPreview code={code} />;
    }

    if (previewType === 'terminal') {
        return <TerminalOutput result={execResult} state={execState} />;
    }

    if (previewType === 'sql') {
        return <SqlPreview initialSql={code} />;
    }

    // No preview
    return (
        <div className="flex flex-col h-full">
            <Header label="Preview" />
            <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
                <EyeOff className="w-10 h-10" style={{ color: 'var(--text-muted)' }} />
                <p className="font-semibold" style={{ color: 'var(--text-secondary)' }}>No preview available</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Preview supports HTML/CSS/JS (live), SQL (runner) and Java/Python (execution).
                </p>
            </div>
        </div>
    );
}