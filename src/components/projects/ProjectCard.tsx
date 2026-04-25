'use client';

import Link from 'next/link';
import { FileCode2, ChevronRight, BookOpen, ExternalLink } from 'lucide-react';
import { type Project } from '@/types/Course.types';
import { ROUTES } from '@/constants/ROUTES';
import { detectLanguage } from '@/lib/language';
import { LANGUAGE_MAP } from '@/constants/LANGUAGES';
import DifficultyBadge from './DifficultyBadge';

interface ProjectCardProps {
    project: Project;
    courseColor: string;
    index?: number;
}

export default function ProjectCard({ project, courseColor, index = 0 }: ProjectCardProps) {
    const delay = `${index * 60}ms`;

    /* ── first source file to open in viewer ─────────────────── */
    const firstFile = project.files.find((f) => f.type === 'file');
    const viewerHref = firstFile
        ? ROUTES.VIEWER_WITH_PATH(firstFile.path)
        : ROUTES.VIEWER;

    return (
        <div
            className="group relative rounded-2xl p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
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
                el.style.borderColor = `color-mix(in srgb, ${courseColor} 35%, var(--glass-border))`;
                el.style.boxShadow = `var(--glass-shadow), 0 0 24px color-mix(in srgb, ${courseColor} 15%, transparent)`;
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = 'var(--glass-bg)';
                el.style.borderColor = 'var(--glass-border)';
                el.style.boxShadow = 'var(--glass-shadow)';
            }}
        >
            {/* ── Top: title + difficulty ─────────────────────────── */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                    {/* Icon */}
                    <div
                        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
                        style={{
                            background: `color-mix(in srgb, ${courseColor} 12%, transparent)`,
                            border: `1px solid color-mix(in srgb, ${courseColor} 25%, transparent)`,
                        }}
                    >
                        <FileCode2 className="w-4 h-4" style={{ color: courseColor }} />
                    </div>

                    {/* Title */}
                    <div className="min-w-0">
                        <h4
                            className="font-bold text-sm sm:text-base leading-tight truncate"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            {project.title}
                        </h4>
                        <div className="mt-1">
                            <DifficultyBadge difficulty={project.difficulty} />
                        </div>
                    </div>
                </div>

                {/* View arrow */}
                <ChevronRight
                    className="flex-shrink-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0 mt-1"
                    style={{ color: courseColor }}
                />
            </div>

            {/* ── Description ─────────────────────────────────────── */}
            {project.description !== '' && (
                <p
                    className="text-xs sm:text-sm leading-relaxed line-clamp-2"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    {project.description}
                </p>
            )}

            {/* ── What I learned ──────────────────────────────────── */}
            {project.learned !== undefined && project.learned.length > 0 && (
                <div className="flex items-start gap-2">
                    <BookOpen className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: 'var(--text-muted)' }} />
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                        {project.learned.join(' · ')}
                    </p>
                </div>
            )}

            {/* ── Divider ─────────────────────────────────────────── */}
            <div
                className="h-px"
                style={{
                    background: `linear-gradient(90deg, color-mix(in srgb, ${courseColor} 30%, transparent), transparent)`,
                }}
            />

            {/* ── Files list + CTA ────────────────────────────────── */}
            <div className="flex items-center justify-between gap-2">
                {/* File language pills */}
                <div className="flex flex-wrap gap-1.5">
                    {project.files.slice(0, 4).map((file) => {
                        const lang = detectLanguage(file.name);
                        const config = LANGUAGE_MAP[lang];
                        const color = config?.color != null
                            ? `var(${config.color})`
                            : 'var(--text-muted)';
                        return (
                            <span
                                key={file.name}
                                className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                                style={{
                                    background: `color-mix(in srgb, ${color} 10%, transparent)`,
                                    border: `1px solid color-mix(in srgb, ${color} 20%, transparent)`,
                                    color,
                                }}
                            >
                                {file.name.split('.').pop()?.toUpperCase() ?? file.name}
                            </span>
                        );
                    })}
                    {project.files.length > 4 && (
                        <span
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md"
                            style={{
                                background: 'var(--glass-bg)',
                                border: '1px solid var(--border-subtle)',
                                color: 'var(--text-muted)',
                            }}
                        >
                            +{project.files.length - 4}
                        </span>
                    )}
                </div>

                {/* Open in viewer */}
                <Link
                    href={viewerHref}
                    className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
                    style={{
                        background: `color-mix(in srgb, ${courseColor} 15%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${courseColor} 30%, transparent)`,
                        color: courseColor,
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <ExternalLink className="w-3 h-3" />
                    <span className="hidden sm:inline">Open</span>
                </Link>
            </div>
        </div>
    );
}