'use client';

import { useState } from 'react';
import { FileText, Code2, FolderGit2, File, BookOpen } from 'lucide-react';
import { type Course } from '@/types/Course.types';
import { ROUTES } from '@/constants/ROUTES';
import Link from 'next/link';

/* ── Tab definition ─────────────────────────────────────────── */
type TabId = 'notes' | 'snippets' | 'projects';

interface Tab {
    id: TabId;
    label: string;
    icon: typeof FileText;
}

const TABS: Tab[] = [
    { id: 'notes', label: 'Notes', icon: BookOpen },
    { id: 'snippets', label: 'Snippets', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
];

/* ── Difficulty badge ───────────────────────────────────────── */
type Difficulty = 'Beginner' | 'Intermediate' | 'Pro';

const DIFFICULTY_STYLES: Record<Difficulty, { color: string; bg: string }> = {
    Beginner: { color: 'var(--color-success)', bg: 'rgba(34,197,94,0.10)' },
    Intermediate: { color: 'var(--color-warning)', bg: 'rgba(245,158,11,0.10)' },
    Pro: { color: 'var(--color-error)', bg: 'rgba(239,68,68,0.10)' },
};

function DifficultyBadge({ level }: { level: Difficulty }) {
    const s = DIFFICULTY_STYLES[level];
    return (
        <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide"
            style={{ color: s.color, background: s.bg }}
        >
            {level}
        </span>
    );
}

/* ── Mock data (replaced by GitHub API in Phase 2) ─────────── */
interface MockFile { name: string; language: string; size: string; }
interface MockProject { title: string; description: string; difficulty: Difficulty; files: number; }

function getMockNotes(courseId: string): MockFile[] {
    return [
        { name: `${courseId}-introduction.md`, language: 'Markdown', size: '4.2 KB' },
        { name: `${courseId}-core-concepts.md`, language: 'Markdown', size: '8.1 KB' },
        { name: `${courseId}-advanced-topics.md`, language: 'Markdown', size: '6.7 KB' },
        { name: `${courseId}-cheatsheet.md`, language: 'Markdown', size: '2.3 KB' },
    ];
}

function getMockSnippets(courseId: string): MockFile[] {
    const ext: Record<string, string> = {
        webtech: 'html', sql: 'sql', java: 'java', 'advanced-java': 'java',
        hibernate: 'java', springboot: 'java', reactjs: 'jsx', python: 'py',
    };
    const e = ext[courseId] ?? 'txt';
    return [
        { name: `hello-world.${e}`, language: e.toUpperCase(), size: '0.5 KB' },
        { name: `data-structures.${e}`, language: e.toUpperCase(), size: '1.8 KB' },
        { name: `common-patterns.${e}`, language: e.toUpperCase(), size: '3.2 KB' },
        { name: `utility-functions.${e}`, language: e.toUpperCase(), size: '2.1 KB' },
        { name: `examples.${e}`, language: e.toUpperCase(), size: '4.4 KB' },
    ];
}

function getMockProjects(_courseId: string): MockProject[] {
    return [
        { title: 'Hello World App', description: 'First project to get started with the basics.', difficulty: 'Beginner', files: 3 },
        { title: 'CRUD Application', description: 'Create, read, update and delete operations end-to-end.', difficulty: 'Beginner', files: 7 },
        { title: 'REST API Server', description: 'Build a fully functional REST API with error handling.', difficulty: 'Intermediate', files: 12 },
        { title: 'Authentication System', description: 'JWT-based login, register and session management.', difficulty: 'Intermediate', files: 15 },
        { title: 'Full Stack App', description: 'Complete production-ready application from scratch.', difficulty: 'Pro', files: 28 },
    ];
}

/* ── Language color dots ────────────────────────────────────── */
const LANG_COLORS: Record<string, string> = {
    HTML: '#e34c26', CSS: '#264de4', JS: '#f7df1e', JSX: '#61dafb',
    JAVA: '#b07219', PY: '#3572A5', SQL: '#336791', MD: '#083fa1',
    MARKDOWN: '#083fa1',
};

function LangDot({ lang }: { lang: string }) {
    const color = LANG_COLORS[lang.toUpperCase()] ?? 'var(--accent-1)';
    return <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />;
}

/* ── File row ───────────────────────────────────────────────── */
function FileRow({ file, courseId, section }: {
    file: MockFile;
    courseId: string;
    section: 'notes' | 'snippets';
}) {
    return (
        <Link
            href={ROUTES.SECTION(courseId, section)}
            className="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150"
            style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-subtle)',
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--glass-bg-hover)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--glass-bg)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
            }}
        >
            <File className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
            <span className="flex-1 text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                {file.name}
            </span>
            <div className="flex items-center gap-2 flex-shrink-0">
                <LangDot lang={file.language} />
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{file.language}</span>
                <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--glass-bg-hover)', color: 'var(--text-muted)' }}
                >
                    {file.size}
                </span>
            </div>
        </Link>
    );
}

/* ── Project row ────────────────────────────────────────────── */
function ProjectRow({ project, courseId }: { project: MockProject; courseId: string }) {
    return (
        <Link
            href={ROUTES.SECTION(courseId, 'projects')}
            className="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 py-4 rounded-xl transition-all duration-150"
            style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-subtle)',
            }}
            onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--glass-bg-hover)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)';
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--glass-bg)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-subtle)';
            }}
        >
            <FolderGit2 className="w-4 h-4 flex-shrink-0 hidden sm:block" style={{ color: 'var(--text-muted)' }} />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {project.title}
                    </span>
                    <DifficultyBadge level={project.difficulty} />
                </div>
                <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                </p>
            </div>
            <span
                className="text-xs flex-shrink-0 px-2 py-0.5 rounded-full self-start sm:self-auto"
                style={{ background: 'var(--glass-bg-hover)', color: 'var(--text-muted)' }}
            >
                {project.files} files
            </span>
        </Link>
    );
}

/* ── Empty state ────────────────────────────────────────────── */
function EmptyTab({ tab }: { tab: TabId }) {
    const messages: Record<TabId, string> = {
        notes: 'No notes yet — push some .md files to the GitHub repo.',
        snippets: 'No snippets yet — add code files to the Snippets folder.',
        projects: 'No projects yet — add project folders with a README.',
    };
    return (
        <div
            className="flex flex-col items-center justify-center py-16 rounded-2xl text-center"
            style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-subtle)' }}
        >
            <FileText className="w-10 h-10 mb-3" style={{ color: 'var(--text-muted)' }} />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{messages[tab]}</p>
        </div>
    );
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
interface CourseTabsProps {
    course: Course;
}

export default function CourseTabs({ course }: CourseTabsProps) {
    const [activeTab, setActiveTab] = useState<TabId>('notes');

    const notes = getMockNotes(course.id);
    const snippets = getMockSnippets(course.id);
    const projects = getMockProjects(course.id);

    const counts: Record<TabId, number> = {
        notes: notes.length,
        snippets: snippets.length,
        projects: projects.length,
    };

    return (
        <div className="flex flex-col gap-4">

            {/* ── Tab bar ─────────────────────────────────────────── */}
            <div
                className="flex gap-1 p-1 rounded-2xl"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-subtle)' }}
                role="tablist"
                aria-label="Course content sections"
            >
                {TABS.map(({ id, label, icon: Icon }) => {
                    const isActive = activeTab === id;
                    return (
                        <button
                            key={id}
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`tabpanel-${id}`}
                            onClick={() => setActiveTab(id)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                            style={{
                                background: isActive ? 'var(--bg-elevated)' : 'transparent',
                                color: isActive ? 'var(--accent-1)' : 'var(--text-muted)',
                                border: isActive ? '1px solid var(--border-default)' : '1px solid transparent',
                                boxShadow: isActive ? 'var(--glass-shadow)' : 'none',
                            }}
                        >
                            <Icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{label}</span>
                            <span
                                className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold"
                                style={{
                                    background: isActive ? 'var(--accent-glow)' : 'var(--glass-bg-hover)',
                                    color: isActive ? 'var(--accent-1)' : 'var(--text-muted)',
                                }}
                            >
                                {counts[id]}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* ── Tab panels ──────────────────────────────────────── */}
            <div
                id={`tabpanel-${activeTab}`}
                role="tabpanel"
                aria-label={activeTab}
                className="flex flex-col gap-2 animate-fade-in-up"
            >
                {activeTab === 'notes' && (
                    notes.length > 0
                        ? notes.map((f) => <FileRow key={f.name} file={f} courseId={course.id} section="notes" />)
                        : <EmptyTab tab="notes" />
                )}

                {activeTab === 'snippets' && (
                    snippets.length > 0
                        ? snippets.map((f) => <FileRow key={f.name} file={f} courseId={course.id} section="snippets" />)
                        : <EmptyTab tab="snippets" />
                )}

                {activeTab === 'projects' && (
                    projects.length > 0
                        ? projects.map((p) => <ProjectRow key={p.title} project={p} courseId={course.id} />)
                        : <EmptyTab tab="projects" />
                )}
            </div>
        </div>
    );
}