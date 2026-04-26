'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, FileCode2, Command } from 'lucide-react';
import { MOCK_FILES } from '@/data/mockFiles';
import { detectLanguage } from '@/lib/language';
import { LANGUAGE_MAP } from '@/constants/LANGUAGES';
import { ROUTES } from '@/constants/ROUTES';

interface SearchResult {
    path: string;
    name: string;
    language: string;
    excerpt: string;
    color: string;
}

function searchFiles(query: string): SearchResult[] {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();

    return MOCK_FILES
        .filter((f) =>
            f.name.toLowerCase().includes(q) ||
            f.path.toLowerCase().includes(q) ||
            f.content.toLowerCase().includes(q)
        )
        .slice(0, 8)
        .map((f) => {
            const lang = detectLanguage(f.name);
            const config = LANGUAGE_MAP[lang];
            const color = config?.color != null ? `var(${config.color})` : 'var(--text-muted)';

            // Find matching line in content for excerpt
            const lines = f.content.split('\n');
            const matchLine = lines.find((l) => l.toLowerCase().includes(q)) ?? '';
            const excerpt = matchLine.trim().slice(0, 60);

            return { path: f.path, name: f.name, language: lang, excerpt, color };
        });
}

export default function GlobalSearch() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [active, setActive] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    /* ── keyboard shortcut Cmd/Ctrl + K ─────────────────────── */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setOpen((p) => !p);
            }
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    /* ── focus input when opened ─────────────────────────────── */
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
            setQuery('');
            setResults([]);
            setActive(0);
        }
    }, [open]);

    /* ── search ──────────────────────────────────────────────── */
    useEffect(() => {
        setResults(searchFiles(query));
        setActive(0);
    }, [query]);

    /* ── navigate to result ──────────────────────────────────── */
    const navigate = useCallback((path: string) => {
        router.push(ROUTES.VIEWER_WITH_PATH(path));
        setOpen(false);
    }, [router]);

    /* ── arrow key navigation ────────────────────────────────── */
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
        if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
        if (e.key === 'Enter' && results[active] !== undefined) navigate(results[active]!.path);
    };

    return (
        <>
            {/* ── Trigger button (shown in Navbar) ─────────────────── */}
            <button
                onClick={() => setOpen(true)}
                aria-label="Search files (Ctrl+K)"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all duration-200 hover:scale-105"
                style={{
                    background: 'var(--glass-bg)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-muted)',
                    minWidth: '140px',
                }}
            >
                <Search className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="flex-1 text-left hidden sm:block">Search files…</span>
                <kbd
                    className="hidden sm:flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded"
                    style={{ background: 'var(--border-subtle)', color: 'var(--text-muted)' }}
                >
                    <Command className="w-2.5 h-2.5" />K
                </kbd>
            </button>

            {/* ── Modal ────────────────────────────────────────────── */}
            {open && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-50"
                        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                        onClick={() => setOpen(false)}
                    />

                    {/* Panel */}
                    <div
                        className="fixed top-[15%] left-1/2 -translate-x-1/2 z-50 w-full max-w-lg mx-4 rounded-2xl overflow-hidden animate-scale-in"
                        style={{
                            background: 'var(--bg-elevated)',
                            border: '1px solid var(--border-strong)',
                            boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
                        }}
                    >
                        {/* Input row */}
                        <div
                            className="flex items-center gap-3 px-4 py-3"
                            style={{ borderBottom: '1px solid var(--border-subtle)' }}
                        >
                            <Search className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--accent-1)' }} />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search files, snippets, code…"
                                className="flex-1 bg-transparent outline-none text-sm"
                                style={{ color: 'var(--text-primary)', caretColor: 'var(--accent-1)' }}
                            />
                            {query !== '' && (
                                <button onClick={() => setQuery('')} aria-label="Clear">
                                    <X className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                                </button>
                            )}
                        </div>

                        {/* Results */}
                        <div className="max-h-80 overflow-y-auto">
                            {query.length < 2 && (
                                <p className="text-xs text-center py-8" style={{ color: 'var(--text-muted)' }}>
                                    Type at least 2 characters to search
                                </p>
                            )}

                            {query.length >= 2 && results.length === 0 && (
                                <p className="text-xs text-center py-8" style={{ color: 'var(--text-muted)' }}>
                                    No results for &ldquo;{query}&rdquo;
                                </p>
                            )}

                            {results.map((r, i) => (
                                <button
                                    key={r.path}
                                    onClick={() => navigate(r.path)}
                                    className="w-full flex items-start gap-3 px-4 py-3 text-left transition-colors duration-100"
                                    style={{
                                        background: i === active ? 'var(--glass-bg-hover)' : 'transparent',
                                        borderLeft: i === active ? `2px solid ${r.color}` : '2px solid transparent',
                                    }}
                                    onMouseEnter={() => setActive(i)}
                                >
                                    <FileCode2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: r.color }} />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                                            {r.name}
                                        </p>
                                        <p className="text-[11px] truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                            {r.path}
                                        </p>
                                        {r.excerpt !== '' && (
                                            <p className="text-[11px] font-mono truncate mt-1" style={{ color: 'var(--text-secondary)' }}>
                                                {r.excerpt}
                                            </p>
                                        )}
                                    </div>
                                    <span
                                        className="flex-shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded self-start"
                                        style={{
                                            background: `color-mix(in srgb, ${r.color} 12%, transparent)`,
                                            color: r.color,
                                            border: `1px solid color-mix(in srgb, ${r.color} 25%, transparent)`,
                                        }}
                                    >
                                        {r.language}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Footer hint */}
                        <div
                            className="flex items-center gap-4 px-4 py-2"
                            style={{ borderTop: '1px solid var(--border-subtle)' }}
                        >
                            {[['↑↓', 'navigate'], ['↵', 'open'], ['esc', 'close']].map(([key, label]) => (
                                <span key={key} className="flex items-center gap-1.5 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                                    <kbd
                                        className="px-1.5 py-0.5 rounded text-[10px]"
                                        style={{ background: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
                                    >
                                        {key}
                                    </kbd>
                                    {label}
                                </span>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}