'use client';

import { Eye, EyeOff } from 'lucide-react';
import HtmlPreview from './HtmlPreview';
import { getPreviewType } from '@/lib/language';

interface LivePreviewProps {
    code: string;
    filename: string;
}

export default function LivePreview({ code, filename }: LivePreviewProps) {
    const previewType = getPreviewType(filename);

    /* ── HTML / CSS / JS → sandboxed iframe ─────────────────── */
    if (previewType === 'iframe') {
        return <HtmlPreview code={code} />;
    }

    /* ── Execution languages → placeholder for Phase 3 ──────── */
    if (previewType === 'terminal') {
        return (
            <div className="flex flex-col h-full">
                <PreviewHeader label="Terminal Output" />
                <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
                    <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                        style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--border-default)',
                        }}
                    >
                        ⚡
                    </div>
                    <p className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                        Code Execution
                    </p>
                    <p className="text-xs leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
                        Click <strong style={{ color: 'var(--accent-1)' }}>Run</strong> to execute via Judge0 API.
                        Available in Phase 3.
                    </p>
                </div>
            </div>
        );
    }

    /* ── SQL → placeholder for Phase 3 ──────────────────────── */
    if (previewType === 'sql') {
        return (
            <div className="flex flex-col h-full">
                <PreviewHeader label="SQL Runner" />
                <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
                    <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                        style={{
                            background: 'var(--glass-bg)',
                            border: '1px solid var(--border-default)',
                        }}
                    >
                        🗄️
                    </div>
                    <p className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                        SQL Runner
                    </p>
                    <p className="text-xs leading-relaxed max-w-xs" style={{ color: 'var(--text-muted)' }}>
                        In-browser SQLite via sql.js. Available in Phase 3.
                    </p>
                </div>
            </div>
        );
    }

    /* ── No preview available ────────────────────────────────── */
    return (
        <div className="flex flex-col h-full">
            <PreviewHeader label="Preview" />
            <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
                <EyeOff className="w-10 h-10" style={{ color: 'var(--text-muted)' }} />
                <p className="font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    No preview available
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Preview is only available for HTML, CSS, JS, SQL and executable files.
                </p>
            </div>
        </div>
    );
}

function PreviewHeader({ label }: { label: string }) {
    return (
        <div
            className="flex items-center gap-2 px-4 py-2 flex-shrink-0"
            style={{
                background: 'var(--bg-surface)',
                borderBottom: '1px solid var(--border-subtle)',
            }}
        >
            <Eye className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                {label}
            </span>
        </div>
    );
}