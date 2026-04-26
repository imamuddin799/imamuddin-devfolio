# 🤖 AI INSTRUCTIONS — Code Showcase Portfolio
> **CRITICAL**: Every AI working on this project MUST read this file completely before writing, editing, or suggesting any code. No exceptions.

---

## 📌 PROJECT IDENTITY

- **Project**: Java Full Stack Learning — Code Showcase Portfolio
- **Type**: Next.js 16 Web Application
- **Purpose**: Display code snippets and projects from a GitHub repository with live preview
- **Memory File**: `PROJECT_MEMORY.md` (read this too before coding)

---

## 🔒 ABSOLUTE RULES — NEVER VIOLATE

### 1. TECH STACK IS LOCKED — DO NOT SUBSTITUTE

```
✅ ALWAYS USE                          ❌ NEVER USE
--------------------------------------------------------------
Next.js 16 (App Router, Turbopack)        Next.js 13/14/15 patterns
React 19                               React 17/18 patterns
TypeScript 5.x                         JavaScript (.js files)
Tailwind CSS v4                        Tailwind CSS v3
shadcn/ui (new-york style)             Chakra UI / MUI / Ant Design
Motion (framer-motion latest)          react-spring / GSAP
@monaco-editor/react 4.7.0             react-ace / CodeMirror
Sonner (toasts)                        shadcn toast component
React Hook Form + Zod                  Formik / Yup
Octokit REST                           Axios for GitHub calls
Judge0 API                             Docker / vm2 / child_process
sql.js                                 better-sqlite3 / pg
Lucide React                           react-icons / Font Awesome
tw-animate-css                         tailwindcss-animate (DEPRECATED)
next/font (Geist + JetBrains Mono)     Google Fonts CDN link tags
```

---

### 2. SYNTAX RULES — VERSION-SPECIFIC (CRITICAL)

#### Next.js 15 — App Router Only
```typescript
// ✅ CORRECT — Server Component (default)
export default async function Page() { ... }

// ✅ CORRECT — Client Component
'use client';
export default function Component() { ... }

// ✅ CORRECT — Layout
export default function Layout({ children }: { children: React.ReactNode }) { ... }

// ✅ CORRECT — API Route (Next.js 15)
export async function GET(request: Request) {
  return Response.json({ data: '...' });
}

// ❌ WRONG — Pages Router (never use)
export default function Page({ props }) { ... }  // no getServerSideProps
export async function getServerSideProps() { ... } // BANNED
export async function getStaticProps() { ... }     // BANNED

// ❌ WRONG — Old API route format
export default function handler(req, res) { ... } // BANNED
```

#### Next.js 16 — Turbopack is Default (CRITICAL)
```typescript
// ✅ CORRECT next.config.ts — Turbopack, no webpack
import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  turbopack: {},   // empty object silences warning, uses defaults
};
export default nextConfig;

// ❌ WRONG — webpack config crashes Next.js 16 Turbopack
const nextConfig = {
  webpack(config) { ... }  // BANNED in Next.js 16 with Turbopack
};
```

#### React 19 — No forwardRef
```typescript
// ✅ CORRECT — React 19 ref handling
function Input({ ref, ...props }: { ref?: React.Ref<HTMLInputElement> } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <input ref={ref} {...props} />;
}

// ❌ WRONG — React 18 pattern, removed in React 19
const Input = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <input ref={ref} {...props} />;
}); // BANNED — forwardRef removed in React 19
```

#### Tailwind CSS v4 — CSS-First Config
```css
/* ✅ CORRECT — globals.css (v4 style) */
@import "tailwindcss";
@import "tw-animate-css";

@theme {
  --color-primary: oklch(0.7 0.2 250);
  --font-sans: 'Geist', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

```javascript
// ❌ WRONG — tailwind.config.js (v3 style, DO NOT CREATE)
module.exports = {
  theme: { extend: { colors: { primary: '#...' } } } // BANNED in v4
}
```

#### shadcn/ui — Correct Import Paths
```typescript
// ✅ CORRECT
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner'; // NOT from shadcn

// ❌ WRONG
import { Button } from 'shadcn/ui'; // BANNED
import { useToast } from '@/components/ui/use-toast'; // DEPRECATED
```

#### Motion (Framer Motion) — Latest API
```typescript
// ✅ CORRECT
import { motion, AnimatePresence } from 'motion/react';

// ❌ WRONG
import { motion } from 'framer-motion'; // old package name, use motion/react
```

#### TypeScript — Strict Typing Always
```typescript
// ✅ CORRECT — always type everything
interface CourseCard {
  id: string;
  title: string;
  color: string;
  icon: string;
  snippetCount: number;
  projectCount: number;
}

// ❌ WRONG — no any, no implicit any
const data: any = {}; // BANNED
function process(input) { ... } // BANNED — no implicit any
```

---

### 3. FILE & FOLDER RULES

```
✅ All components → /src/components/
✅ All pages      → /src/app/ (App Router)
✅ All API routes → /src/app/api/
✅ All types      → /src/types/
✅ All utils      → /src/lib/
✅ All hooks      → /src/hooks/
✅ All constants  → /src/constants/
✅ All styles     → /src/app/globals.css (single file)
✅ Static data    → /src/data/

❌ NEVER create:
  - /pages/ directory (Pages Router — BANNED)
  - tailwind.config.js (use CSS @theme — BANNED in v4)
  - .env files in code output (use .env.example only)
  - /styles/ directory (all styles in globals.css or Tailwind)
  - Multiple CSS files (one globals.css only)
```

#### File Naming Conventions
```
✅ Components     → PascalCase.tsx         (e.g. CourseCard.tsx)
✅ Pages          → lowercase/page.tsx     (e.g. courses/page.tsx)
✅ Hooks          → camelCase.ts           (e.g. useGitHub.ts)
✅ Utils          → camelCase.ts           (e.g. formatCode.ts)
✅ Types          → PascalCase.types.ts    (e.g. Course.types.ts)
✅ Constants      → UPPER_SNAKE_CASE.ts    (e.g. LANGUAGES.ts)
✅ API routes     → route.ts              (always route.ts)

❌ NEVER:
  - Mix .js and .tsx in same folder
  - Use index.ts barrel files unless explicitly told to
  - Use default + named exports in same file (pick one)
```

---

### 4. TYPESCRIPT STRICTNESS — NON-NEGOTIABLE

Every file must comply with this `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

Rules:
```typescript
// ✅ Handle null/undefined explicitly
const title = course?.title ?? 'Untitled';

// ✅ Type all function parameters and return types
async function fetchCourse(id: string): Promise<Course> { ... }

// ✅ Type all useState
const [courses, setCourses] = useState<Course[]>([]);

// ✅ Type all API responses
const data = await response.json() as ApiResponse<Course[]>;

// ❌ BANNED
let x;                    // no implicit any
const y = data as any;    // no type casting to any
function fn(a, b) {}      // no untyped params
if (obj.prop) {}          // use obj.prop !== undefined instead
arr[0].name               // must handle possible undefined (noUncheckedIndexedAccess)
```

---

### 5. LINTING — ALWAYS LINT BEFORE SUBMITTING CODE

Before providing any component or file, mentally verify:

```
□ No unused imports
□ No unused variables or parameters
□ No implicit 'any'
□ All async functions have await or return Promise
□ All useEffect dependencies are listed in dependency array
□ No missing 'key' prop in lists
□ No direct DOM manipulation (use refs)
□ No console.log left in code (use logger or remove)
□ All event handlers typed correctly (e.g. React.MouseEvent)
□ All image elements use next/image, never <img>
□ All links use next/link, never <a href>
□ No hardcoded strings that belong in constants
□ No magic numbers (use named constants)
```

#### ESLint Rules to Always Follow
```typescript
// ✅ next/image — always
import Image from 'next/image';
<Image src="..." alt="..." width={100} height={100} />

// ✅ next/link — always
import Link from 'next/link';
<Link href="/courses">Courses</Link>

// ❌ BANNED
<img src="..." />          // use next/image
<a href="/courses">...</a> // use next/link
```

---

### 6. COMPONENT RULES

```typescript
// ✅ CORRECT component structure
'use client'; // only if needed — prefer Server Components

import { type FC } from 'react';
import { type CourseCard } from '@/types/Course.types';

interface CourseCardProps {
  course: CourseCard;
  onSelect?: (id: string) => void;
}

const CourseCard: FC<CourseCardProps> = ({ course, onSelect }) => {
  return (
    <div>...</div>
  );
};

export default CourseCard; // one default export per file
```

Rules:
```
✅ Prefer Server Components (no 'use client' unless needed)
✅ 'use client' only when using: useState, useEffect, useRef,
   event handlers, browser APIs, Motion animations
✅ Split large components into smaller ones (max ~150 lines)
✅ Extract repeated logic into custom hooks in /src/hooks/
✅ Props interface always defined above component
✅ Default export only (no named component exports)
✅ FC<Props> type always used for functional components

❌ NEVER put business logic inside JSX
❌ NEVER use class components
❌ NEVER mutate props
❌ NEVER use index as key in dynamic lists
❌ NEVER fetch data inside useEffect (use Server Components or SWR)
```

---

### 7. DATA FETCHING RULES

```typescript
// ✅ CORRECT — Server Component fetching (preferred)
export default async function CoursePage() {
  const courses = await fetchCourses(); // direct async call
  return <CourseGrid courses={courses} />;
}

// ✅ CORRECT — API Route (Next.js 15)
// /src/app/api/courses/route.ts
export async function GET(): Promise<Response> {
  const data = await getCourses();
  return Response.json(data);
}

// ✅ CORRECT — Octokit for GitHub
import { Octokit } from '@octokit/rest';
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

// ❌ WRONG
useEffect(() => {           // never fetch in useEffect
  fetch('/api/courses')     // unless absolutely no other way
    .then(...)
}, []);
```

---

### 8. ENVIRONMENT VARIABLES

```
✅ Server-side secrets  → GITHUB_TOKEN, JUDGE0_API_KEY (no NEXT_PUBLIC_)
✅ Client-side config   → NEXT_PUBLIC_APP_URL only
✅ Always use           → process.env.VARIABLE_NAME
✅ Always validate      → throw error if required env var missing at startup
✅ Always provide       → .env.example with all keys (empty values)

❌ NEVER hardcode API keys or tokens
❌ NEVER expose GITHUB_TOKEN to client (no NEXT_PUBLIC_GITHUB_TOKEN)
❌ NEVER commit .env file — .env.example only
```

```typescript
// ✅ Env validation pattern (in /src/lib/env.ts)
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) throw new Error('GITHUB_TOKEN is required');
```

---

### 9. STYLING RULES — GLASS DESIGN SYSTEM

```
✅ Use Tailwind utility classes ONLY
✅ Custom glass effects via CSS variables in @theme
✅ Dark theme is the default and only theme
✅ All colors via CSS variables (never hardcoded hex/rgb)
✅ Responsive: mobile-first (sm → md → lg → xl)
✅ Animations via Motion (motion/react) or tw-animate-css

❌ NEVER use inline styles (style={{ }}) except for dynamic values
❌ NEVER use arbitrary Tailwind values excessively (e.g. w-[347px])
❌ NEVER create separate .css/.scss files for components
❌ NEVER use !important
❌ NEVER hardcode colors — use CSS variables
```

```typescript
// ✅ Glass card pattern (use consistently)
className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-xl"

// ✅ Dynamic values (only case for inline style)
style={{ '--accent-color': course.color } as React.CSSProperties}
```

---

### 10. ERROR HANDLING RULES

```typescript
// ✅ Always wrap async operations in try/catch
async function fetchFile(path: string): Promise<string> {
  try {
    const response = await octokit.repos.getContent({ ... });
    return Buffer.from(response.data.content, 'base64').toString();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch file: ${error.message}`);
    }
    throw new Error('Unknown error fetching file');
  }
}

// ✅ API routes must return proper error responses
export async function GET(): Promise<Response> {
  try {
    const data = await fetchData();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// ✅ Use Next.js error.tsx for page-level errors
// /src/app/error.tsx — always create this

// ✅ Use Next.js not-found.tsx for 404s
// /src/app/not-found.tsx — always create this
```

---

### 11. PERFORMANCE RULES

```typescript
// ✅ Dynamic imports for heavy components
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,  // Monaco doesn't support SSR
  loading: () => <EditorSkeleton />,
});

// ✅ Always use next/image
import Image from 'next/image';

// ✅ Memoize expensive computations
const filteredCourses = useMemo(() =>
  courses.filter(c => c.language === selected), [courses, selected]);

// ✅ Stable callbacks
const handleSelect = useCallback((id: string) => {
  setSelected(id);
}, []);

// ❌ NEVER import Monaco or sql.js without dynamic import — they break SSR
// ❌ NEVER use useMemo/useCallback for simple values — only for expensive ops
```

---

### 12. ACCESSIBILITY RULES

```typescript
// ✅ Always add aria labels
<button aria-label="Close preview panel">×</button>

// ✅ Semantic HTML
<nav>, <main>, <section>, <article>, <aside>, <header>, <footer>

// ✅ Keyboard navigation
onKeyDown={(e) => e.key === 'Enter' && handleSelect()}

// ✅ Focus management for modals/drawers
// ✅ Alt text on all images
// ✅ Color contrast ratio minimum 4.5:1

// ❌ NEVER use div/span for interactive elements without role
// ❌ NEVER remove focus outline without replacement
```

---

### 13. GITHUB API RULES

```typescript
// ✅ Always use Octokit (never raw fetch to GitHub)
// ✅ Always cache GitHub responses (revalidate: 3600)
// ✅ Always handle rate limiting (403 errors)
// ✅ Always decode base64 content correctly

// ✅ Correct content fetch pattern
const response = await octokit.repos.getContent({
  owner: process.env.GITHUB_OWNER!,
  repo: process.env.GITHUB_REPO!,
  path: filePath,
});

// Handle both file and directory responses
if (Array.isArray(response.data)) {
  // directory listing
} else if (response.data.type === 'file') {
  const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
}

// ✅ Next.js 15 fetch caching
const data = await fetch(url, {
  next: { revalidate: 3600 } // 1 hour cache
});
```

---

### 14. JUDGE0 API RULES (Code Execution)

```typescript
// ✅ Always use server-side API route — never call Judge0 from client
// ✅ Always set execution timeout (max 10 seconds)
// ✅ Always sanitize output before displaying
// ✅ Always handle: Accepted, Wrong Answer, Time Limit, Runtime Error, Compile Error
// ✅ Never expose Judge0 API key to client

// Status codes to always handle:
// 1: In Queue, 2: Processing, 3: Accepted
// 4: Wrong Answer, 5: Time Limit Exceeded
// 6: Compilation Error, 7-12: Runtime Errors
```

---

### 15. CODE QUALITY CHECKLIST

Before submitting ANY code, verify ALL of these:

```
TYPESCRIPT
□ No 'any' types anywhere
□ All functions have explicit return types
□ All interfaces/types defined in /src/types/
□ Strict null checks handled everywhere
□ No unused imports or variables

NEXT.JS
□ Server vs Client Components correctly chosen
□ API routes use new Response() format (not res.json())
□ Dynamic imports for SSR-incompatible libraries
□ next/image for all images
□ next/link for all internal links
□ Proper metadata exports in page.tsx files

REACT
□ No forwardRef (React 19)
□ Keys on all list items (not index)
□ useEffect dependencies complete
□ No state mutations
□ No class components

TAILWIND v4
□ No tailwind.config.js modifications
□ All custom tokens in @theme block in globals.css
□ tw-animate-css imported (not tailwindcss-animate)
□ No hardcoded colors — all via CSS variables

STYLING
□ Responsive breakpoints on all layouts
□ Glass morphism consistent across components
□ Dark theme maintained throughout
□ No inline styles except dynamic CSS variables

PERFORMANCE
□ Monaco Editor dynamically imported (ssr: false)
□ sql.js dynamically imported (ssr: false)
□ Heavy components have Suspense + loading skeleton
□ Images have width/height defined

SECURITY
□ No secrets in client code
□ No NEXT_PUBLIC_ for sensitive values
□ API routes validate inputs with Zod
□ iframe sandbox attribute set for HTML previews

ACCESSIBILITY
□ All interactive elements keyboard accessible
□ All images have alt text
□ Semantic HTML used
□ ARIA labels on icon-only buttons
```

---

### 16. WHAT TO DO WHEN UNSURE

```
1. Check PROJECT_MEMORY.md first
2. Check AI_INSTRUCTIONS.md (this file)
3. Use the locked tech stack — never introduce new libraries
4. When in doubt about syntax version:
   - Next.js 15 App Router docs
   - React 19 changelog
   - Tailwind v4 migration guide
   - shadcn/ui Tailwind v4 docs
5. Ask for clarification before making assumptions
6. Never assume — always check the types file for existing interfaces
```

---

### 17. THINGS AI MUST NEVER DO

```
❌ Never introduce a new npm package without asking first
❌ Never use Pages Router (/pages directory)
❌ Never use getServerSideProps / getStaticProps
❌ Never use class components
❌ Never use React.forwardRef
❌ Never use tailwindcss-animate (use tw-animate-css)
❌ Never use shadcn toast (use Sonner)
❌ Never import framer-motion directly (use motion/react)
❌ Never use <img> (use next/image)
❌ Never use <a href> for internal links (use next/link)
❌ Never hardcode colors, tokens, or sizes
❌ Never use 'any' TypeScript type
❌ Never write JavaScript files (.js) — TypeScript only (.ts/.tsx)
❌ Never create tailwind.config.js
❌ Never put business logic inside JSX/TSX return
❌ Never call GitHub API or Judge0 API from client components
❌ Never leave console.log in production code
❌ Never use index as list key
❌ Never skip error handling in async functions
❌ Never import Monaco or sql.js without dynamic import
❌ Never expose environment secrets to the client
❌ Never write CSS in separate files — Tailwind classes only
❌ Never make a breaking change to existing types without updating all usages
```

---

## 📋 QUICK REFERENCE — IMPORTS

```typescript
// Framework
import { type FC, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// shadcn/ui
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Toasts
import { toast } from 'sonner';

// Icons
import { Code2, Folder, ChevronRight } from 'lucide-react';

// Monaco
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

// GitHub
import { Octokit } from '@octokit/rest';

// Validation
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
```

---

## 🔖 VERSION REFERENCE (Locked)

| Package | Version | Notes |
|---|---|---|
| next | 16.x | App Router, Turbopack default — NO webpack config |
| react | 19.x | No forwardRef |
| react-dom | 19.x | |
| typescript | 5.x | strict mode |
| tailwindcss | 4.x | CSS-first config |
| @shadcn/ui | latest | new-york style |
| motion | latest | import from motion/react |
| @monaco-editor/react | 4.7.0 | ssr: false always |
| sonner | latest | replaces shadcn toast |
| react-hook-form | latest | |
| zod | latest | |
| @octokit/rest | latest | |
| lucide-react | latest | |
| tw-animate-css | latest | replaces tailwindcss-animate |

---

*Last Updated: Project Init — Stack Locked*
*This file is the single source of truth for AI code generation rules.*
*Any change to the stack must be reflected here before coding begins.*