'use client';

type Difficulty = 'Beginner' | 'Intermediate' | 'Pro';

interface DifficultyBadgeProps {
    difficulty: Difficulty;
    size?: 'sm' | 'md';
}

const CONFIG: Record<Difficulty, { color: string; bg: string; border: string; dot: string; emoji: string }> = {
    Beginner: {
        color: '#4ade80',
        bg: 'rgba(74, 222, 128, 0.10)',
        border: 'rgba(74, 222, 128, 0.25)',
        dot: '#4ade80',
        emoji: '🌱',
    },
    Intermediate: {
        color: '#fbbf24',
        bg: 'rgba(251, 191, 36, 0.10)',
        border: 'rgba(251, 191, 36, 0.25)',
        dot: '#fbbf24',
        emoji: '⚡',
    },
    Pro: {
        color: '#f87171',
        bg: 'rgba(248, 113, 113, 0.10)',
        border: 'rgba(248, 113, 113, 0.25)',
        dot: '#f87171',
        emoji: '🔥',
    },
};

export default function DifficultyBadge({ difficulty, size = 'sm' }: DifficultyBadgeProps) {
    const cfg = CONFIG[difficulty];
    const isMd = size === 'md';

    return (
        <span
            className="inline-flex items-center gap-1.5 font-semibold rounded-full"
            style={{
                color: cfg.color,
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                fontSize: isMd ? '12px' : '11px',
                padding: isMd ? '4px 10px' : '3px 8px',
            }}
        >
            <span style={{ fontSize: isMd ? '12px' : '11px' }}>{cfg.emoji}</span>
            {difficulty}
        </span>
    );
}