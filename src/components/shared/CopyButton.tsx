'use client';

import { Check, Copy } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface CopyButtonProps {
    text: string;
    size?: 'sm' | 'md';
    label?: boolean;    // show "Copy" / "Copied!" text
}

export default function CopyButton({ text, size = 'md', label = false }: CopyButtonProps) {
    const { copied, copy } = useCopyToClipboard(2000);
    const isSm = size === 'sm';

    const iconSize = isSm ? 'w-3.5 h-3.5' : 'w-4 h-4';
    const padding = isSm ? 'px-2 py-1' : 'px-3 py-1.5';
    const textSize = isSm ? 'text-xs' : 'text-sm';

    return (
        <button
            onClick={() => void copy(text)}
            aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
            className={[
                'flex items-center gap-1.5 rounded-lg font-medium transition-all duration-200',
                'hover:scale-105 active:scale-95',
                padding,
                textSize,
            ].join(' ')}
            style={{
                background: copied
                    ? 'rgba(74,222,128,0.12)'
                    : 'var(--glass-bg)',
                border: `1px solid ${copied
                    ? 'rgba(74,222,128,0.30)'
                    : 'var(--border-default)'}`,
                color: copied
                    ? '#4ade80'
                    : 'var(--text-secondary)',
            }}
        >
            {copied
                ? <Check className={iconSize} />
                : <Copy className={iconSize} />
            }
            {label && (
                <span>{copied ? 'Copied!' : 'Copy'}</span>
            )}
        </button>
    );
}