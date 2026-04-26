'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, FileCode2, BookOpen, List, X } from 'lucide-react';
import { MOCK_FILES, type MockFile } from '@/data/mockFiles';
import { detectLanguage } from '@/lib/language';
import { LANGUAGE_MAP } from '@/constants/LANGUAGES';
import { useCodeExecution } from '@/hooks/useCodeExecution';
import CodeViewer from '@/components/viewer/CodeViewer';
import LivePreview from '@/components/viewer/LivePreview';
import SplitLayout from '@/components/viewer/SplitLayout';
import CopyButton from '@/components/shared/CopyButton';
import RunButton from '@/components/viewer/RunButton';

/* ── Language badge ──────────────────────────────────────── */
function LangBadge({ filename }: { filename: string }) {
  const lang = detectLanguage(filename);
  const config = LANGUAGE_MAP[lang];
  const color = config?.color != null ? `var(${config.color})` : 'var(--text-muted)';
  const label = config?.display ?? lang.toUpperCase();

  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono font-semibold"
      style={{
        background: `color-mix(in srgb, ${color} 12%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 25%, transparent)`,
        color,
      }}
    >
      {label}
    </span>
  );
}

/* ── File Sidebar ────────────────────────────────────────── */
function FileSidebar({
  files, active, onSelect, onClose,
}: {
  files: MockFile[];
  active: MockFile;
  onSelect: (f: MockFile) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="flex flex-col h-full"
      style={{
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-subtle)',
        width: '260px', minWidth: '220px', maxWidth: '280px',
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div className="flex items-center gap-2">
          <List className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Files
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close sidebar"
          className="w-6 h-6 rounded-md flex items-center justify-center transition-colors duration-150 hover:bg-white/5"
        >
          <X className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {files.map((file) => {
          const lang = detectLanguage(file.name);
          const config = LANGUAGE_MAP[lang];
          const color = config?.color != null ? `var(${config.color})` : 'var(--text-muted)';
          const isActive = file.path === active.path;

          return (
            <button
              key={file.path}
              onClick={() => onSelect(file)}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-all duration-150"
              style={{
                background: isActive ? 'var(--glass-bg-hover)' : 'transparent',
                borderLeft: isActive ? `2px solid ${color}` : '2px solid transparent',
              }}
            >
              <FileCode2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} />
              <div className="min-w-0">
                <p
                  className="text-xs font-medium truncate"
                  style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                >
                  {file.name}
                </p>
                <p className="text-[10px] truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {file.path.split('/').slice(0, -1).join('/')}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Top Bar ─────────────────────────────────────────────── */
function TopBar({
  file, onToggleSidebar, sidebarOpen, onRun, execState,
}: {
  file: MockFile;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  onRun: () => void;
  execState: ReturnType<typeof useCodeExecution>['state'];
}) {
  const lang = detectLanguage(file.name);
  const config = LANGUAGE_MAP[lang];
  const canRun = config?.canRun ?? false;

  return (
    <div
      className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 flex-shrink-0 flex-wrap sm:flex-nowrap"
      style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-subtle)' }}
    >
      {/* Back */}
      <Link
        href="/courses"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 flex-shrink-0"
        style={{ background: 'var(--glass-bg)', border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Courses</span>
      </Link>

      {/* Sidebar toggle */}
      <button
        onClick={onToggleSidebar}
        aria-label={sidebarOpen ? 'Close file list' : 'Open file list'}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 flex-shrink-0"
        style={{
          background: sidebarOpen ? 'var(--glass-bg-hover)' : 'var(--glass-bg)',
          border: '1px solid var(--border-default)', color: 'var(--text-secondary)',
        }}
      >
        <BookOpen className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Files</span>
      </button>

      {/* File path */}
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        <FileCode2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--text-muted)' }} />
        <span
          className="text-xs font-mono truncate"
          style={{ color: 'var(--text-secondary)' }}
          title={file.path}
        >
          {file.path}
        </span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
        <LangBadge filename={file.name} />
        <CopyButton text={file.content} size="sm" label />
        {canRun && <RunButton state={execState} onRun={onRun} />}
      </div>
    </div>
  );
}

/* ── Main viewer ─────────────────────────────────────────── */
function ViewerInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeFile, setActiveFile] = useState<MockFile>(() => {
    const p = searchParams.get('path');
    return (p !== null ? MOCK_FILES.find((f) => f.path === p) : undefined)
      ?? MOCK_FILES[0]!;
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { result, state: execState, execute, reset } = useCodeExecution();

  /* Sync URL to active file */
  useEffect(() => {
    const current = searchParams.get('path');
    if (current !== activeFile.path) {
      router.replace(`/viewer?path=${encodeURIComponent(activeFile.path)}`, { scroll: false });
    }
  }, [activeFile, router, searchParams]);

  /* Reset execution output when switching files */
  const handleFileSelect = (file: MockFile): void => {
    setActiveFile(file);
    reset();
  };

  /* ── Run code via Piston ─────────────────────────────────
     config.piston holds { language, version } for executable
     languages. SQL uses the sql runner (SqlPreview), not Piston.
  ─────────────────────────────────────────────────────────── */
  const handleRun = (): void => {
    const lang = detectLanguage(activeFile.name);
    const config = LANGUAGE_MAP[lang];

    // Guard: only call Piston for languages that have a runtime config
    if (config?.piston === null || config?.piston === undefined) return;

    void execute(
      activeFile.content,
      config.piston.language,
      config.piston.version,
    );
  };

  const editorPanel = (
    <div className="flex flex-col h-full overflow-hidden">
      <CodeViewer
        code={activeFile.content}
        language={activeFile.language}
        readOnly
        height="100%"
      />
    </div>
  );

  const previewPanel = (
    <LivePreview
      code={activeFile.content}
      filename={activeFile.name}
      execState={execState}
      execResult={result}
    />
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <TopBar
        file={activeFile}
        onToggleSidebar={() => setSidebarOpen((p) => !p)}
        sidebarOpen={sidebarOpen}
        onRun={handleRun}
        execState={execState}
      />

      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <div className="hidden sm:flex flex-shrink-0">
            <FileSidebar
              files={MOCK_FILES}
              active={activeFile}
              onSelect={handleFileSelect}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        )}
        <div className="flex-1 overflow-hidden">
          <SplitLayout left={editorPanel} right={previewPanel} defaultSplit={55} />
        </div>
      </div>
    </div>
  );
}

/* ── Page export ─────────────────────────────────────────── */
export default function ViewerPage() {
  return (
    <Suspense
      fallback={
        <div
          className="h-screen flex items-center justify-center"
          style={{ background: 'var(--bg-base)' }}
        >
          <div
            className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2"
            style={{ borderColor: 'var(--accent-1)' }}
          />
        </div>
      }
    >
      <ViewerInner />
    </Suspense>
  );
}