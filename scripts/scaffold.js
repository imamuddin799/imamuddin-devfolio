#!/usr/bin/env node

/**
 * 🏗️ SCAFFOLD SCRIPT — imamuddin-devfolio
 *
 * Run this from the project ROOT after creating the Next.js app:
 *   node scaffold.js
 *
 * What it creates:
 *   - All src/ folders and files (empty, with correct boilerplate)
 *   - .env.example
 *   - AI_INSTRUCTIONS.md + PROJECT_MEMORY.md placeholders
 *
 * What it NEVER touches:
 *   - node_modules/
 *   - .next/
 *   - dist/
 *   - build/
 *   - .git/
 *   - package.json
 *   - package-lock.json
 *   - tsconfig.json
 *   - next.config.ts
 *   - Any existing file (will not overwrite)
 */

const fs = require('fs');
const path = require('path');

// ─── COLORS FOR TERMINAL OUTPUT ───────────────────────────────────────────────
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const cyan = (s) => `\x1b[36m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function createDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(green(`  📁 created dir:  ${dirPath}`));
    }
}

function createFile(filePath, content = '') {
    if (fs.existsSync(filePath)) {
        console.log(yellow(`  ⏭️  exists (skip): ${filePath}`));
        return;
    }
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(green(`  📄 created file: ${filePath}`));
}

// ─── FILE CONTENTS ────────────────────────────────────────────────────────────

const contents = {

    // ── TYPES ──────────────────────────────────────────────────────────────────

    'src/types/Course.types.ts': `
export interface Course {
  id: string;
  title: string;
  path: string;
  color: string;
  cssVar: string;
  icon: string;
  description: string;
  subcourses?: string[];
}

export interface CourseContent {
  notes: GitHubFile[];
  snippets: GitHubFile[];
  projects: ProjectTier;
}

export interface ProjectTier {
  beginner: Project[];
  intermediate: Project[];
  pro: Project[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Pro';
  path: string;
  files: GitHubFile[];
  readme?: string;
  learned?: string[];
  techUsed?: string[];
}

export interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size: number;
  url: string;
  language?: string;
}
`.trimStart(),

    'src/types/GitHub.types.ts': `
export interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size: number;
  url: string;
  download_url: string | null;
  sha: string;
}

export interface GitHubFileContent {
  name: string;
  path: string;
  content: string;
  encoding: 'base64';
  size: number;
  sha: string;
}

export interface GitHubTree {
  sha: string;
  url: string;
  tree: GitHubTreeItem[];
}

export interface GitHubTreeItem {
  path: string;
  mode: string;
  type: 'blob' | 'tree';
  sha: string;
  size?: number;
  url: string;
}
`.trimStart(),

    'src/types/Judge0.types.ts': `
export interface ExecutionRequest {
  sourceCode: string;
  languageId: number;
  stdin?: string;
}

export interface ExecutionResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  status: ExecutionStatus;
  time: string;
  memory: number;
  token: string;
}

export interface ExecutionStatus {
  id: number;
  description: string;
}

export const JUDGE0_STATUS = {
  IN_QUEUE: 1,
  PROCESSING: 2,
  ACCEPTED: 3,
  WRONG_ANSWER: 4,
  TIME_LIMIT_EXCEEDED: 5,
  COMPILATION_ERROR: 6,
  RUNTIME_ERROR_SIGSEGV: 7,
  RUNTIME_ERROR_SIGXFSZ: 8,
  RUNTIME_ERROR_SIGFPE: 9,
  RUNTIME_ERROR_SIGABRT: 10,
  RUNTIME_ERROR_NZEC: 11,
  RUNTIME_ERROR_OTHER: 12,
  INTERNAL_ERROR: 13,
  EXEC_FORMAT_ERROR: 14,
} as const;
`.trimStart(),

    'src/types/Api.types.ts': `
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface ApiError {
  error: string;
  status: number;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
`.trimStart(),

    // ── CONSTANTS ───────────────────────────────────────────────────────────────

    'src/constants/COURSES.ts': `
import { type Course } from '@/types/Course.types';

export const COURSES: Course[] = [
  {
    id: 'webtech',
    title: 'Web Technology',
    path: 'WebTech',
    color: 'oklch(0.75 0.18 45)',
    cssVar: '--color-webtech',
    icon: 'globe',
    description: 'HTML, CSS & JavaScript fundamentals',
    subcourses: ['HTML', 'CSS', 'JS'],
  },
  {
    id: 'sql',
    title: 'SQL',
    path: 'SQL',
    color: 'oklch(0.65 0.18 220)',
    cssVar: '--color-sql',
    icon: 'database',
    description: 'Database queries, scripts and schema design',
  },
  {
    id: 'java',
    title: 'Java',
    path: 'Java',
    color: 'oklch(0.65 0.20 20)',
    cssVar: '--color-java',
    icon: 'coffee',
    description: 'Core Java programming concepts',
  },
  {
    id: 'advanced-java',
    title: 'Advanced Java',
    path: 'AdvancedJava',
    color: 'oklch(0.60 0.20 310)',
    cssVar: '--color-advanced-java',
    icon: 'zap',
    description: 'Servlets, JSP, JDBC and more',
  },
  {
    id: 'hibernate',
    title: 'Hibernate',
    path: 'Hibernate',
    color: 'oklch(0.60 0.15 55)',
    cssVar: '--color-hibernate',
    icon: 'layers',
    description: 'ORM framework with Hibernate',
  },
  {
    id: 'springboot',
    title: 'Spring Boot',
    path: 'SpringBoot',
    color: 'oklch(0.70 0.20 145)',
    cssVar: '--color-springboot',
    icon: 'leaf',
    description: 'REST APIs and backend with Spring Boot',
  },
  {
    id: 'reactjs',
    title: 'React JS',
    path: 'ReactJS',
    color: 'oklch(0.72 0.18 200)',
    cssVar: '--color-react',
    icon: 'atom',
    description: 'Modern frontend with React',
  },
  {
    id: 'python',
    title: 'Python',
    path: 'Python',
    color: 'oklch(0.80 0.18 95)',
    cssVar: '--color-python',
    icon: 'terminal',
    description: 'Python scripting and programming',
  },
];

export const COURSE_MAP = Object.fromEntries(COURSES.map((c) => [c.id, c]));
`.trimStart(),

    'src/constants/LANGUAGES.ts': `
export interface LanguageConfig {
  monaco: string;
  judge0: number | null;
  display: string;
  color: string | null;
  canRun: boolean;
  canPreview: boolean;
  previewType: 'iframe' | 'terminal' | 'sql' | 'none';
}

export const LANGUAGE_MAP: Record<string, LanguageConfig> = {
  html: {
    monaco: 'html', judge0: null, display: 'HTML',
    color: '--color-html', canRun: false, canPreview: true, previewType: 'iframe',
  },
  css: {
    monaco: 'css', judge0: null, display: 'CSS',
    color: '--color-css', canRun: false, canPreview: false, previewType: 'none',
  },
  javascript: {
    monaco: 'javascript', judge0: 63, display: 'JavaScript',
    color: '--color-js', canRun: true, canPreview: true, previewType: 'terminal',
  },
  typescript: {
    monaco: 'typescript', judge0: 74, display: 'TypeScript',
    color: '--color-js', canRun: true, canPreview: false, previewType: 'terminal',
  },
  java: {
    monaco: 'java', judge0: 62, display: 'Java',
    color: '--color-java', canRun: true, canPreview: false, previewType: 'terminal',
  },
  python: {
    monaco: 'python', judge0: 71, display: 'Python',
    color: '--color-python', canRun: true, canPreview: false, previewType: 'terminal',
  },
  sql: {
    monaco: 'sql', judge0: null, display: 'SQL',
    color: '--color-sql', canRun: true, canPreview: false, previewType: 'sql',
  },
  markdown: {
    monaco: 'markdown', judge0: null, display: 'Markdown',
    color: null, canRun: false, canPreview: false, previewType: 'none',
  },
  json: {
    monaco: 'json', judge0: null, display: 'JSON',
    color: null, canRun: false, canPreview: false, previewType: 'none',
  },
  xml: {
    monaco: 'xml', judge0: null, display: 'XML',
    color: null, canRun: false, canPreview: false, previewType: 'none',
  },
};

export const EXTENSION_MAP: Record<string, string> = {
  '.html': 'html',
  '.css': 'css',
  '.js': 'javascript',
  '.jsx': 'javascript',
  '.ts': 'typescript',
  '.tsx': 'typescript',
  '.java': 'java',
  '.py': 'python',
  '.sql': 'sql',
  '.md': 'markdown',
  '.json': 'json',
  '.xml': 'xml',
  '.txt': 'markdown',
};
`.trimStart(),

    'src/constants/ROUTES.ts': `
export const ROUTES = {
  HOME: '/',
  COURSES: '/courses',
  COURSE: (courseId: string) => \`/courses/\${courseId}\`,
  SECTION: (courseId: string, section: string) =>
    \`/courses/\${courseId}/\${section}\`,
  VIEWER: '/viewer',
  VIEWER_WITH_PATH: (filePath: string) =>
    \`/viewer?path=\${encodeURIComponent(filePath)}\`,
} as const;
`.trimStart(),

    // ── LIB ─────────────────────────────────────────────────────────────────────

    'src/lib/env.ts': `
// Validates required environment variables at startup
// Server-side only — never import in client components

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      \`Missing required environment variable: \${name}\\n\` +
      \`Add it to your .env.local file.\`
    );
  }
  return value;
}

export const env = {
  GITHUB_TOKEN: requireEnv('GITHUB_TOKEN'),
  GITHUB_OWNER: requireEnv('GITHUB_OWNER'),
  GITHUB_REPO: requireEnv('GITHUB_REPO'),
  JUDGE0_API_KEY: requireEnv('JUDGE0_API_KEY'),
  JUDGE0_API_URL: requireEnv('JUDGE0_API_URL'),
} as const;
`.trimStart(),

    'src/lib/github.ts': `
import { Octokit } from '@octokit/rest';
import { env } from './env';
import { type GitHubFile, type GitHubFileContent } from '@/types/GitHub.types';

// Singleton Octokit client (server-side only)
const octokit = new Octokit({ auth: env.GITHUB_TOKEN });

const OWNER = env.GITHUB_OWNER;
const REPO  = env.GITHUB_REPO;

/**
 * List files/folders at a given repo path
 */
export async function listContents(repoPath: string): Promise<GitHubFile[]> {
  const response = await octokit.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path: repoPath,
  });

  if (!Array.isArray(response.data)) {
    return [];
  }

  return response.data.map((item) => ({
    name: item.name,
    path: item.path,
    type: item.type as 'file' | 'dir',
    size: item.size ?? 0,
    url: item.url,
    download_url: item.download_url ?? null,
    sha: item.sha,
  }));
}

/**
 * Get raw content of a single file (decoded from base64)
 */
export async function getFileContent(repoPath: string): Promise<string> {
  const response = await octokit.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path: repoPath,
  });

  const data = response.data as GitHubFileContent;

  if (data.encoding !== 'base64') {
    throw new Error(\`Unexpected encoding: \${data.encoding}\`);
  }

  return Buffer.from(data.content, 'base64').toString('utf-8');
}

/**
 * Check if a file exists in the repo
 */
export async function fileExists(repoPath: string): Promise<boolean> {
  try {
    await octokit.repos.getContent({ owner: OWNER, repo: REPO, path: repoPath });
    return true;
  } catch {
    return false;
  }
}
`.trimStart(),

    'src/lib/judge0.ts': `
import { type ExecutionRequest, type ExecutionResult, JUDGE0_STATUS } from '@/types/Judge0.types';

const API_URL = process.env.JUDGE0_API_URL ?? '';
const API_KEY  = process.env.JUDGE0_API_KEY ?? '';

const HEADERS = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
};

/**
 * Submit code for execution and poll until result is ready
 */
export async function executeCode(request: ExecutionRequest): Promise<ExecutionResult> {
  // Submit
  const submitRes = await fetch(\`\${API_URL}/submissions?base64_encoded=false&wait=false\`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      source_code: request.sourceCode,
      language_id: request.languageId,
      stdin: request.stdin ?? '',
    }),
  });

  if (!submitRes.ok) {
    throw new Error(\`Judge0 submission failed: \${submitRes.statusText}\`);
  }

  const { token } = await submitRes.json() as { token: string };

  // Poll for result (max 10 seconds)
  const MAX_ATTEMPTS = 10;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    await new Promise((r) => setTimeout(r, 1000));

    const resultRes = await fetch(
      \`\${API_URL}/submissions/\${token}?base64_encoded=false\`,
      { headers: HEADERS }
    );

    const result = await resultRes.json() as ExecutionResult;

    if (
      result.status.id !== JUDGE0_STATUS.IN_QUEUE &&
      result.status.id !== JUDGE0_STATUS.PROCESSING
    ) {
      return result;
    }
  }

  throw new Error('Execution timed out after 10 seconds');
}
`.trimStart(),

    'src/lib/language.ts': `
import { EXTENSION_MAP, LANGUAGE_MAP, type LanguageConfig } from '@/constants/LANGUAGES';

/**
 * Detect language from file extension
 */
export function detectLanguage(filename: string): string {
  const ext = \`.\${filename.split('.').pop()?.toLowerCase() ?? ''}\`;
  return EXTENSION_MAP[ext] ?? 'plaintext';
}

/**
 * Get full language config from filename
 */
export function getLanguageConfig(filename: string): LanguageConfig | undefined {
  const lang = detectLanguage(filename);
  return LANGUAGE_MAP[lang];
}

/**
 * Check if a file can be executed via Judge0
 */
export function canExecute(filename: string): boolean {
  return getLanguageConfig(filename)?.canRun ?? false;
}

/**
 * Check if a file supports live preview
 */
export function canPreview(filename: string): boolean {
  return getLanguageConfig(filename)?.canPreview ?? false;
}

/**
 * Get preview type for a file
 */
export function getPreviewType(filename: string): 'iframe' | 'terminal' | 'sql' | 'none' {
  return getLanguageConfig(filename)?.previewType ?? 'none';
}
`.trimStart(),

    // ── HOOKS ───────────────────────────────────────────────────────────────────

    'src/hooks/useCopyToClipboard.ts': `
'use client';

import { useState, useCallback } from 'react';

interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<void>;
}

export function useCopyToClipboard(resetDelay = 2000): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), resetDelay);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }, [resetDelay]);

  return { copied, copy };
}
`.trimStart(),

    'src/hooks/useCodeExecution.ts': `
'use client';

import { useState, useCallback } from 'react';
import { type ExecutionResult } from '@/types/Judge0.types';

type ExecutionState = 'idle' | 'running' | 'success' | 'error';

interface UseCodeExecutionReturn {
  result: ExecutionResult | null;
  state: ExecutionState;
  execute: (sourceCode: string, languageId: number, stdin?: string) => Promise<void>;
  reset: () => void;
}

export function useCodeExecution(): UseCodeExecutionReturn {
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [state, setState] = useState<ExecutionState>('idle');

  const execute = useCallback(async (
    sourceCode: string,
    languageId: number,
    stdin?: string
  ) => {
    setState('running');
    setResult(null);

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceCode, languageId, stdin }),
      });

      if (!response.ok) {
        throw new Error('Execution request failed');
      }

      const data = await response.json() as ExecutionResult;
      setResult(data);
      setState(data.status.id === 3 ? 'success' : 'error');
    } catch (error) {
      setState('error');
      console.error('Code execution error:', error);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setState('idle');
  }, []);

  return { result, state, execute, reset };
}
`.trimStart(),

    // ── APP PAGES ───────────────────────────────────────────────────────────────

    'src/app/error.tsx': `
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-red-400">Something went wrong</h2>
      <p className="text-muted-foreground">{error.message}</p>
      <Button onClick={reset} variant="outline">Try again</Button>
    </div>
  );
}
`.trimStart(),

    'src/app/not-found.tsx': `
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="text-muted-foreground">Page not found</p>
      <Button asChild variant="outline">
        <Link href="/courses">Go to Courses</Link>
      </Button>
    </div>
  );
}
`.trimStart(),

    'src/app/loading.tsx': `
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white/20" />
    </div>
  );
}
`.trimStart(),

    'src/app/courses/page.tsx': `
// TODO Phase 1: Fetch courses from GitHub and render CourseGrid
export default function CoursesPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">My Courses</h1>
      <p className="text-muted-foreground mt-2">Phase 1: CourseGrid goes here</p>
    </main>
  );
}
`.trimStart(),

    'src/app/courses/loading.tsx': `
export default function CoursesLoading() {
  return (
    <div className="min-h-screen p-8">
      <div className="h-8 w-48 bg-white/5 rounded animate-pulse mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-48 bg-white/5 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}
`.trimStart(),

    'src/app/courses/[course]/page.tsx': `
interface CoursePageProps {
  params: Promise<{ course: string }>;
}

// TODO Phase 1: Fetch course detail from GitHub
export default async function CoursePage({ params }: CoursePageProps) {
  const { course } = await params;

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold capitalize">{course}</h1>
      <p className="text-muted-foreground mt-2">Phase 1: Tabs (Notes / Snippets / Projects) go here</p>
    </main>
  );
}
`.trimStart(),

    'src/app/courses/[course]/loading.tsx': `
export default function CourseLoading() {
  return (
    <div className="min-h-screen p-8">
      <div className="h-8 w-64 bg-white/5 rounded animate-pulse mb-4" />
      <div className="h-4 w-32 bg-white/5 rounded animate-pulse mb-8" />
      <div className="h-10 w-80 bg-white/5 rounded animate-pulse" />
    </div>
  );
}
`.trimStart(),

    'src/app/courses/[course]/[section]/page.tsx': `
interface SectionPageProps {
  params: Promise<{ course: string; section: string }>;
}

// TODO Phase 1: List files in section
export default async function SectionPage({ params }: SectionPageProps) {
  const { course, section } = await params;

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold capitalize">{course} / {section}</h1>
      <p className="text-muted-foreground mt-2">Phase 1: File list goes here</p>
    </main>
  );
}
`.trimStart(),

    'src/app/viewer/page.tsx': `
// TODO Phase 2: Code viewer with Monaco + live preview
// Reads ?path= query param to load file from GitHub

export default function ViewerPage() {
  return (
    <main className="h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Phase 2: Code Viewer goes here</p>
    </main>
  );
}
`.trimStart(),

    // ── API ROUTES ───────────────────────────────────────────────────────────────

    'src/app/api/courses/route.ts': `
import { type NextRequest } from 'next/server';
import { listContents } from '@/lib/github';
import { type ApiResponse } from '@/types/Api.types';
import { type GitHubFile } from '@/types/GitHub.types';

export async function GET(_request: NextRequest): Promise<Response> {
  try {
    const contents = await listContents('');
    const courses = contents.filter((item) => item.type === 'dir');

    const response: ApiResponse<GitHubFile[]> = { data: courses };
    return Response.json(response, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
`.trimStart(),

    'src/app/api/courses/[course]/route.ts': `
import { type NextRequest } from 'next/server';
import { listContents } from '@/lib/github';
import { type ApiResponse } from '@/types/Api.types';
import { type GitHubFile } from '@/types/GitHub.types';

interface RouteParams {
  params: Promise<{ course: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams): Promise<Response> {
  try {
    const { course } = await params;
    const contents = await listContents(course);

    const response: ApiResponse<GitHubFile[]> = { data: contents };
    return Response.json(response, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
`.trimStart(),

    'src/app/api/file/route.ts': `
import { type NextRequest } from 'next/server';
import { getFileContent } from '@/lib/github';
import { type ApiResponse } from '@/types/Api.types';

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return Response.json({ error: 'Missing path parameter' }, { status: 400 });
    }

    const content = await getFileContent(filePath);
    const response: ApiResponse<string> = { data: content };

    return Response.json(response, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
`.trimStart(),

    'src/app/api/execute/route.ts': `
import { type NextRequest } from 'next/server';
import { executeCode } from '@/lib/judge0';
import { type ExecutionRequest, type ExecutionResult } from '@/types/Judge0.types';
import { type ApiResponse } from '@/types/Api.types';
import { z } from 'zod';

const ExecutionSchema = z.object({
  sourceCode: z.string().min(1),
  languageId: z.number().int().positive(),
  stdin: z.string().optional(),
});

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json() as ExecutionRequest;
    const parsed = ExecutionSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const result = await executeCode(parsed.data);
    const response: ApiResponse<ExecutionResult> = { data: result };

    return Response.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
`.trimStart(),

    // ── COMPONENTS (PLACEHOLDER) ─────────────────────────────────────────────────

    'src/components/layout/Navbar.tsx': `
// TODO Phase 1: Implement sticky glass navbar with mobile menu
'use client';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
        <span className="font-bold text-lg">imamuddin.dev</span>
      </div>
    </nav>
  );
}
`.trimStart(),

    'src/components/layout/PageWrapper.tsx': `
import { type ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className={\`max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 \${className}\`}>
      {children}
    </div>
  );
}
`.trimStart(),

    'src/components/shared/LanguageBadge.tsx': `
import { detectLanguage } from '@/lib/language';
import { LANGUAGE_MAP } from '@/constants/LANGUAGES';
import { Badge } from '@/components/ui/badge';

interface LanguageBadgeProps {
  filename: string;
}

export default function LanguageBadge({ filename }: LanguageBadgeProps) {
  const lang = detectLanguage(filename);
  const config = LANGUAGE_MAP[lang];
  const display = config?.display ?? lang;

  return (
    <Badge variant="outline" className="font-mono text-xs">
      {display}
    </Badge>
  );
}
`.trimStart(),

    'src/components/shared/EmptyState.tsx': `
import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = 'Nothing here yet',
  description = 'Content will appear here once added to GitHub.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <FolderOpen className="size-12 text-muted-foreground/50" />
      <h3 className="font-semibold text-muted-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground/70 max-w-sm">{description}</p>
    </div>
  );
}
`.trimStart(),

    'src/components/shared/ErrorState.tsx': `
'use client';

import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = 'Something went wrong',
  description = 'Failed to load content. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <AlertCircle className="size-12 text-red-400/70" />
      <h3 className="font-semibold text-red-400">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
      {onRetry !== undefined && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
`.trimStart(),

    // ── DATA ────────────────────────────────────────────────────────────────────

    'src/data/courses.ts': `
// Fallback static course data (used if GitHub API is unavailable)
// Keep in sync with COURSES constant and GitHub repo structure

export { COURSES as fallbackCourses } from '@/constants/COURSES';
`.trimStart(),

    // ── ENV EXAMPLE ─────────────────────────────────────────────────────────────

    '.env.example': `
# GitHub API (server-side only — never expose to client)
GITHUB_TOKEN=
GITHUB_OWNER=
GITHUB_REPO=java-fullstack-journey

# Judge0 API (get from rapidapi.com)
JUDGE0_API_KEY=
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
`.trimStart(),

};

// ─── DIRECTORY STRUCTURE ──────────────────────────────────────────────────────

const directories = [
    // App Router pages
    'src/app/courses',
    'src/app/courses/[course]',
    'src/app/courses/[course]/[section]',
    'src/app/viewer',

    // API routes
    'src/app/api/courses',
    'src/app/api/courses/[course]',
    'src/app/api/file',
    'src/app/api/execute',

    // Components
    'src/components/ui',
    'src/components/layout',
    'src/components/courses',
    'src/components/projects',
    'src/components/viewer',
    'src/components/shared',

    // Core
    'src/hooks',
    'src/lib',
    'src/types',
    'src/constants',
    'src/data',

    // Public
    'public/icons',
];

// ─── RUN SCAFFOLD ─────────────────────────────────────────────────────────────

function scaffold() {
    console.log(bold(cyan('\n🏗️  Scaffolding imamuddin-devfolio...\n')));

    // Safety check — make sure we're in a Next.js project root
    if (!fs.existsSync('package.json')) {
        console.error(red('❌ Error: package.json not found.'));
        console.error(red('   Run this script from the project ROOT directory.\n'));
        process.exit(1);
    }

    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (!pkg.dependencies?.next) {
        console.error(red('❌ Error: This does not appear to be a Next.js project.'));
        console.error(red('   Run: npx create-next-app@latest imamuddin-devfolio first.\n'));
        process.exit(1);
    }

    console.log(cyan('📁 Creating directories...\n'));
    directories.forEach((dir) => createDir(dir));

    console.log(cyan('\n📄 Creating files...\n'));
    Object.entries(contents).forEach(([filePath, content]) => {
        createFile(filePath, content);
    });

    // Summary
    console.log(bold(green('\n✅ Scaffold complete!\n')));
    console.log('Next steps:');
    console.log(cyan('  1. Fill in your .env.local with real values'));
    console.log(cyan('  2. Copy AI_INSTRUCTIONS.md and PROJECT_MEMORY.md to project root'));
    console.log(cyan('  3. Run: npm run dev'));
    console.log(cyan('  4. Run: npx tsc --noEmit   (check for TypeScript errors)\n'));
}

scaffold();