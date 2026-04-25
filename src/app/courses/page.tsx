import { Code2, BookOpen, FolderGit2 } from 'lucide-react';
import { COURSES } from '@/constants/COURSES';
import CourseGrid from '@/components/courses/CourseGrid';

export const metadata = {
  title: 'Courses | Imamuddin Devfolio',
  description: 'Browse all courses — Java Full Stack learning journey',
};

const STATS = [
  { icon: BookOpen, value: '8+', label: 'Courses' },
  { icon: Code2, value: '50+', label: 'Snippets' },
  { icon: FolderGit2, value: '20+', label: 'Projects' },
] as const;

export default function CoursesPage() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12 sm:pb-16 max-w-screen-xl mx-auto">

        {/* Decorative orb */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, var(--accent-glow) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Badge */}
        <div className="flex justify-center mb-5">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-default)',
              color: 'var(--accent-1)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-glow" style={{ background: 'var(--accent-1)' }} />
            Java Full Stack Journey
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-center font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 animate-fade-in-up"
          style={{ color: 'var(--text-primary)' }}
        >
          My{' '}
          <span className="text-gradient">Learning</span>
          <br className="sm:hidden" />
          {' '}Journey
        </h1>

        {/* Sub */}
        <p
          className="text-center text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed animate-fade-in-up stagger-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          Every snippet, project and note from my full-stack journey —
          browse, preview and learn.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 animate-fade-in-up stagger-3">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--border-default)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: 'var(--accent-1)' }} />
              <div>
                <div className="text-lg sm:text-2xl font-bold leading-none" style={{ color: 'var(--text-primary)' }}>
                  {value}
                </div>
                <div className="text-xs sm:text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section label */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} />
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            All Courses
          </span>
          <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} />
        </div>

        {/* Grid */}
        <CourseGrid courses={COURSES} />
      </section>
    </div>
  );
}