'use client';

import { useMemo } from 'react';

interface ReadmeRendererProps {
    markdown: string;
    className?: string;
}

/* ── Very lightweight markdown → HTML (no external lib) ───── */
function parseMarkdown(md: string): string {
    return md
        // Code blocks (``` ```)
        .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code: string) =>
            `<pre class="rm-pre" data-lang="${lang}"><code>${escHtml(code.trim())}</code></pre>`
        )
        // Inline code
        .replace(/`([^`]+)`/g, '<code class="rm-code">$1</code>')
        // H1 H2 H3
        .replace(/^### (.+)$/gm, '<h3 class="rm-h3">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 class="rm-h2">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 class="rm-h1">$1</h1>')
        // Bold / italic
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Unordered list items
        .replace(/^[-*] (.+)$/gm, '<li class="rm-li">$1</li>')
        // Ordered list items
        .replace(/^\d+\. (.+)$/gm, '<li class="rm-li rm-oli">$1</li>')
        // Horizontal rule
        .replace(/^---$/gm, '<hr class="rm-hr" />')
        // Paragraphs (blank line separation)
        .replace(/\n\n(?!<)/g, '</p><p class="rm-p">')
        // Wrap start
        .replace(/^(?!<)/, '<p class="rm-p">')
        .replace(/$(?!>)/, '</p>');
}

function escHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

export default function ReadmeRenderer({ markdown, className = '' }: ReadmeRendererProps) {
    const html = useMemo(() => parseMarkdown(markdown), [markdown]);

    if (markdown.trim() === '') return null;

    return (
        <>
            <style>{`
        .rm-h1 { font-size: 1.4rem; font-weight: 800; margin: 1rem 0 0.5rem; color: var(--text-primary); }
        .rm-h2 { font-size: 1.1rem; font-weight: 700; margin: 0.9rem 0 0.4rem; color: var(--text-primary); }
        .rm-h3 { font-size: 0.95rem; font-weight: 600; margin: 0.7rem 0 0.3rem; color: var(--text-secondary); }
        .rm-p  { margin: 0.5rem 0; font-size: 0.875rem; line-height: 1.7; color: var(--text-secondary); }
        .rm-li {
          font-size: 0.875rem; line-height: 1.6; color: var(--text-secondary);
          margin-left: 1.25rem; list-style: disc; margin-bottom: 0.2rem;
        }
        .rm-oli { list-style: decimal; }
        .rm-code {
          font-family: var(--font-mono); font-size: 0.8rem;
          padding: 0.15rem 0.4rem; border-radius: 6px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.10);
          color: var(--accent-1);
        }
        .rm-pre {
          font-family: var(--font-mono); font-size: 0.8rem;
          padding: 1rem; border-radius: 12px; overflow-x: auto;
          background: var(--bg-surface);
          border: 1px solid var(--border-default);
          color: var(--text-primary); margin: 0.75rem 0;
          line-height: 1.6;
        }
        .rm-hr {
          border: none; border-top: 1px solid var(--border-subtle);
          margin: 1rem 0;
        }
      `}</style>
            <div
                className={className}
                // markdown rendered as HTML — content is generated locally, not from user input
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </>
    );
}