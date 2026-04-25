'use client';

import { useEffect, useRef, useState } from 'react';
import { RefreshCw, Monitor } from 'lucide-react';

interface HtmlPreviewProps {
    code: string;
}

export default function HtmlPreview({ code }: HtmlPreviewProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [key, setKey] = useState(0); // force re-render on refresh

    /* ── Write code into iframe srcdoc ──────────────────────── */
    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe === null) return;

        // Small debounce so it doesn't flash on every keystroke
        const timer = setTimeout(() => {
            iframe.srcdoc = code;
        }, 300);

        return () => clearTimeout(timer);
    }, [code, key]);

    return (
        <div className="flex flex-col h-full">
            {/* ── Preview toolbar ─────────────────────────────────── */}
            <div
                className="flex items-center justify-between px-4 py-2 flex-shrink-0"
                style={{
                    background: 'var(--bg-surface)',
                    borderBottom: '1px solid var(--border-subtle)',
                }}
            >
                <div className="flex items-center gap-2">
                    <Monitor className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                    <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                        Live Preview
                    </span>
                </div>

                {/* Fake browser dots */}
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ef4444' }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#fbbf24' }} />
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#22c55e' }} />
                </div>

                {/* Refresh button */}
                <button
                    onClick={() => setKey((k) => k + 1)}
                    aria-label="Refresh preview"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105"
                    style={{
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--border-default)',
                        color: 'var(--text-secondary)',
                    }}
                >
                    <RefreshCw className="w-3 h-3" />
                    Refresh
                </button>
            </div>

            {/* ── Iframe ──────────────────────────────────────────── */}
            <div className="flex-1 relative overflow-hidden">
                <iframe
                    key={key}
                    ref={iframeRef}
                    title="HTML Live Preview"
                    sandbox="allow-scripts"          // NO allow-same-origin — security rule
                    className="w-full h-full border-0"
                    style={{ background: '#fff' }}
                />
            </div>
        </div>
    );
}