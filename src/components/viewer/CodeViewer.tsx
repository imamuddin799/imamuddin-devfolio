'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import type { OnMount } from '@monaco-editor/react';

/* ── Monaco loaded only on client, never SSR ─────────────── */
const MonacoEditor = dynamic(
    () => import('@monaco-editor/react'),
    {
        ssr: false,
        loading: () => <EditorSkeleton />,
    }
);

function EditorSkeleton() {
    return (
        <div
            className="w-full h-full flex flex-col gap-3 p-5 animate-pulse"
            style={{ background: 'var(--bg-surface)' }}
        >
            {[100, 75, 90, 55, 80, 65, 45, 70].map((w, i) => (
                <div
                    key={i}
                    className="h-4 rounded"
                    style={{
                        width: `${w}%`,
                        background: 'var(--border-subtle)',
                    }}
                />
            ))}
        </div>
    );
}

/* ── Monaco theme matching our dark design system ─────────── */
const MONACO_THEME = {
    base: 'vs-dark' as const,
    inherit: true,
    rules: [
        { token: 'comment', foreground: '475569', fontStyle: 'italic' },
        { token: 'keyword', foreground: '818cf8', fontStyle: 'bold' },
        { token: 'string', foreground: '34d399' },
        { token: 'number', foreground: 'f97316' },
        { token: 'type', foreground: '38bdf8' },
        { token: 'function', foreground: 'a78bfa' },
    ],
    colors: {
        'editor.background': '#0a1628',
        'editor.foreground': '#e8f0fe',
        'editor.lineHighlightBackground': '#0f1f3d',
        'editor.selectionBackground': '#1e3a5f',
        'editorLineNumber.foreground': '#334155',
        'editorLineNumber.activeForeground': '#64748b',
        'editorCursor.foreground': '#06b6d4',
        'editorIndentGuide.background1': '#1e293b',
        'editor.inactiveSelectionBackground': '#1e2d45',
        'scrollbarSlider.background': '#1e293b',
        'scrollbarSlider.hoverBackground': '#334155',
    },
};

interface CodeViewerProps {
    code: string;
    language: string;
    readOnly?: boolean;
    height?: string;   // e.g. "100%" or "500px"
    onChange?: (value: string) => void;
}

export default function CodeViewer({
    code,
    language,
    readOnly = true,
    height = '100%',
    onChange,
}: CodeViewerProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const monacoRef = useRef<any>(null);

    const handleMount: OnMount = (_editor, monaco) => {
        monacoRef.current = monaco;
        monaco.editor.defineTheme('devfolio-dark', MONACO_THEME);
        monaco.editor.setTheme('devfolio-dark');
    };

    /* ── re-apply theme if ref already populated ─────────────── */
    useEffect(() => {
        if (monacoRef.current !== null) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            monacoRef.current.editor.setTheme('devfolio-dark');
        }
    }, []);

    return (
        <div className="w-full h-full overflow-hidden" style={{ background: '#0a1628' }}>
            <MonacoEditor
                height={height}
                language={language}
                value={code}
                theme="devfolio-dark"
                onMount={handleMount}
                onChange={(val) => onChange?.(val ?? '')}
                options={{
                    readOnly,
                    fontSize: 14,
                    fontFamily: 'JetBrains Mono, Fira Code, monospace',
                    fontLigatures: true,
                    lineHeight: 22,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    renderWhitespace: 'none',
                    folding: true,
                    glyphMargin: false,
                    lineDecorationsWidth: 0,
                    lineNumbersMinChars: 3,
                    overviewRulerBorder: false,
                    hideCursorInOverviewRuler: true,
                    scrollbar: {
                        vertical: 'auto',
                        horizontal: 'auto',
                        verticalScrollbarSize: 6,
                        horizontalScrollbarSize: 6,
                    },
                    padding: { top: 16, bottom: 16 },
                    bracketPairColorization: { enabled: true },
                    guides: { bracketPairs: true, indentation: true },
                    smoothScrolling: true,
                    cursorSmoothCaretAnimation: 'on',
                    renderLineHighlight: 'line',
                    contextmenu: false,
                }}
            />
        </div>
    );
}