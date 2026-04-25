'use client';

import Link from 'next/link';
import {
    Globe, Database, Coffee, Zap, Layers,
    Leaf, Atom, Terminal, FolderCode, ChevronRight,
} from 'lucide-react';
import { type Course } from '@/types/Course.types';
import { ROUTES } from '@/constants/ROUTES';

/* ── Icon map ──────────────────────────────────────────────── */
const ICON_MAP: Record<string, React.ElementType> = {
    globe: Globe,
    database: Database,
    coffee: Coffee,
    zap: Zap,
    layers: Layers,
    leaf: Leaf,
    atom: Atom,
    terminal: Terminal,
    default: FolderCode,
};

interface CourseCardProps {
    course: Course;
    index?: number;
    snippetCount?: number;
    projectCount?: number;
}

export default function CourseCard({
    course,
    index = 0,
    snippetCount = 0,
    projectCount = 0,
}: CourseCardProps) {
    const Icon = ICON_MAP[course.icon] ?? ICON_MAP['default']!;
    const delay = `${index * 80}ms`;

    return (
        <Link
            href={ROUTES.COURSE(course.id)}
            className="group block rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
            style={{
                animationDelay: delay,
                animationFillMode: 'both',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(var(--glass-blur))',
                WebkitBackdropFilter: 'blur(var(--glass-blur))',
                border: '1px solid var(--glass-border)',
                boxShadow: 'var(--glass-shadow)',
            }}
            onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = 'var(--glass-bg-hover)';
                el.style.borderColor = `color-mix(in srgb, ${course.color} 40%, var(--glass-border))`;
                el.style.boxShadow = `var(--glass-shadow), 0 0 30px color-mix(in srgb, ${course.color} 20%, transparent)`;
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = 'var(--glass-bg)';
                el.style.borderColor = 'var(--glass-border)';
                el.style.boxShadow = 'var(--glass-shadow)';
            }}
        >
            {/* Top row: icon + arrow */}
            <div className="flex items-start justify-between mb-4">
                {/* Icon container */}
                <div
                    className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                        background: `color-mix(in srgb, ${course.color} 15%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${course.color} 30%, transparent)`,
                    }}
                >
                    <Icon
                        className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300"
                        style={{ color: course.color }}
                    />
                </div>

                {/* Arrow */}
                <ChevronRight
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                    style={{ color: course.color }}
                />
            </div>

            {/* Title */}
            <h3
                className="font-bold text-base sm:text-lg mb-1 leading-tight transition-colors duration-300"
                style={{ color: 'var(--text-primary)' }}
            >
                {course.title}
            </h3>

            {/* Description */}
            <p
                className="text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2"
                style={{ color: 'var(--text-secondary)' }}
            >
                {course.description}
            </p>

            {/* Divider */}
            <div
                className="h-px mb-4 transition-colors duration-300"
                style={{
                    background: `linear-gradient(90deg, color-mix(in srgb, ${course.color} 40%, transparent), transparent)`,
                }}
            />

            {/* Stats */}
            <div className="flex items-center gap-4">
                <div className="flex flex-col">
                    <span className="text-lg font-bold leading-none" style={{ color: course.color }}>
                        {projectCount}
                    </span>
                    <span className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Projects</span>
                </div>
                <div
                    className="w-px h-8 self-center"
                    style={{ background: 'var(--border-subtle)' }}
                />
                <div className="flex flex-col">
                    <span className="text-lg font-bold leading-none" style={{ color: 'var(--text-secondary)' }}>
                        {snippetCount}
                    </span>
                    <span className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Snippets</span>
                </div>

                {/* Subcourse pills */}
                {course.subcourses !== undefined && course.subcourses.length > 0 && (
                    <div className="ml-auto flex gap-1">
                        {course.subcourses.slice(0, 3).map((sub) => (
                            <span
                                key={sub}
                                className="text-[10px] font-mono px-1.5 py-0.5 rounded-md"
                                style={{
                                    background: `color-mix(in srgb, ${course.color} 12%, transparent)`,
                                    color: course.color,
                                    border: `1px solid color-mix(in srgb, ${course.color} 25%, transparent)`,
                                }}
                            >
                                {sub}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </Link>
    );
}