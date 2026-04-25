import { notFound } from 'next/navigation';
import { type Metadata } from 'next';
import {
  Globe, Database, Coffee, Zap, Layers,
  Leaf, Atom, Terminal, Code2, BookOpen, FolderGit2,
} from 'lucide-react';
import { COURSE_MAP } from '@/constants/COURSES';
import { ROUTES } from '@/constants/ROUTES';
import Breadcrumb from '@/components/shared/Breadcrumb';
import CourseTabs from '@/components/courses/CourseTabs';
import { type Course } from '@/types/Course.types';

/* ── Icon map (mirrors COURSES.ts icon strings) ─────────────── */
const ICON_MAP = {
  globe: Globe,
  database: Database,
  coffee: Coffee,
  zap: Zap,
  layers: Layers,
  leaf: Leaf,
  atom: Atom,
  terminal: Terminal,
  code2: Code2,
} as const;

type IconKey = keyof typeof ICON_MAP;

function CourseIcon({ iconKey, color }: { iconKey: string; color: string }) {
  const Icon = ICON_MAP[iconKey as IconKey] ?? Code2;
  return <Icon className="w-7 h-7" style={{ color }} />;
}

/* ── Metadata ────────────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ course: string }>;
}): Promise<Metadata> {
  const { course: courseId } = await params;
  const course = COURSE_MAP[courseId];
  if (course === undefined) {
    return { title: 'Course Not Found' };
  }
  return {
    title: `${course.title} | Imamuddin Devfolio`,
    description: course.description,
  };
}

/* ── Static params (pre-render all known courses) ───────────── */
export function generateStaticParams(): { course: string }[] {
  return Object.keys(COURSE_MAP).map((id) => ({ course: id }));
}

/* ── Stat pill ───────────────────────────────────────────────── */
function StatPill({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: typeof BookOpen;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--border-default)',
      }}
    >
      <Icon className="w-4 h-4 flex-shrink-0" style={{ color }} />
      <div>
        <div className="text-base font-bold leading-none" style={{ color: 'var(--text-primary)' }}>
          {value}
        </div>
        <div className="text-[10px] mt-0.5 uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
          {label}
        </div>
      </div>
    </div>
  );
}

/* ── Subcourse tag ───────────────────────────────────────────── */
function SubcourseTag({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
      style={{
        background: `color-mix(in oklch, ${color} 15%, transparent)`,
        border: `1px solid color-mix(in oklch, ${color} 30%, transparent)`,
        color,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ course: string }>;
}) {
  const { course: courseId } = await params;

  // Next.js 15 — params is a Promise, always await
  const course: Course | undefined = COURSE_MAP[courseId];
  if (course === undefined) notFound();

  // Resolve the course color CSS variable value for inline use
  // We use the oklch value directly from COURSES.ts
  const accentColor = course.color;

  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* ── Breadcrumb ─────────────────────────────────────── */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Courses', href: ROUTES.COURSES },
              { label: course.title },
            ]}
          />
        </div>

        {/* ── Hero card ──────────────────────────────────────── */}
        <div
          className="relative overflow-hidden rounded-3xl p-6 sm:p-8 mb-8"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
          }}
        >
          {/* Background glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(ellipse, color-mix(in oklch, ${accentColor} 20%, transparent) 0%, transparent 70%)`,
              transform: 'translate(30%, -30%)',
              filter: 'blur(40px)',
            }}
          />

          <div className="relative flex flex-col sm:flex-row sm:items-start gap-5">
            {/* Icon */}
            <div
              className="flex items-center justify-center w-16 h-16 rounded-2xl flex-shrink-0"
              style={{
                background: `color-mix(in oklch, ${accentColor} 15%, transparent)`,
                border: `1px solid color-mix(in oklch, ${accentColor} 35%, transparent)`,
              }}
            >
              <CourseIcon iconKey={course.icon} color={accentColor} />
            </div>

            <div className="flex-1 min-w-0">
              {/* Title */}
              <h1
                className="text-2xl sm:text-3xl font-extrabold leading-tight mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                {course.title}
              </h1>

              {/* Description */}
              <p
                className="text-sm sm:text-base mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {course.description}
              </p>

              {/* Subcourses */}
              {course.subcourses !== undefined && course.subcourses.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.subcourses.map((sub) => (
                    <SubcourseTag key={sub} label={sub} color={accentColor} />
                  ))}
                </div>
              )}

              {/* Stats */}
              <div className="flex flex-wrap gap-2">
                <StatPill icon={BookOpen} value="4+" label="Notes" color={accentColor} />
                <StatPill icon={Code2} value="5+" label="Snippets" color={accentColor} />
                <StatPill icon={FolderGit2} value="5" label="Projects" color={accentColor} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs ───────────────────────────────────────────── */}
        <CourseTabs course={course} />
      </div>
    </div>
  );
}