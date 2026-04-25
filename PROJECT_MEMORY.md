# 🧠 PROJECT MEMORY — Java Full Stack Code Showcase Portfolio
> **CRITICAL**: Every AI working on this project MUST read `AI_INSTRUCTIONS.md` first, then this file completely before writing any code.
> This file is the single source of truth for project state, decisions, and structure.
> **Update this file every time a decision is made or a phase is completed.**

---

## 📌 PROJECT OVERVIEW

| Field | Value |
|---|---|
| **Project Name** | Java Full Stack — Code Showcase Portfolio |
| **Type** | Next.js 15 Web Application |
| **Purpose** | Display code snippets & projects from GitHub with live preview |
| **Owner** | [YOUR NAME HERE] |
| **GitHub Repo (Code Source)** | [YOUR_GITHUB_USERNAME]/java-fullstack-journey |
| **GitHub Repo (This App)** | [YOUR_GITHUB_USERNAME]/code-showcase-portfolio |
| **Deployment** | Vercel |
| **Status** | 🟡 Planning Phase |
| **Last Updated** | Project Init |

---

## 🛠️ LOCKED TECH STACK

> ⚠️ Stack is final. No changes without updating AI_INSTRUCTIONS.md AND this file.

| Layer | Package | Version | Purpose |
|---|---|---|---|
| Framework | next | 15.x | Full-stack React framework |
| Runtime | react | 19.x | UI library |
| Runtime | react-dom | 19.x | DOM renderer |
| Language | typescript | 5.x | Type safety (strict mode) |
| Styling | tailwindcss | 4.x | Utility-first CSS |
| Styling | tw-animate-css | latest | CSS animations (replaces tailwindcss-animate) |
| Components | shadcn/ui | latest (new-york) | Headless UI primitives |
| Animation | motion | latest | Animations (import from motion/react) |
| Code Editor | @monaco-editor/react | 4.7.0 | VS Code editor in browser |
| Toasts | sonner | latest | Toast notifications |
| Forms | react-hook-form | latest | Form state management |
| Validation | zod | latest | Schema validation |
| GitHub API | @octokit/rest | latest | GitHub content fetching |
| Code Exec | Judge0 API | v1 | Multi-language code execution |
| SQL Preview | sql.js | latest | SQLite in browser (WASM) |
| Icons | lucide-react | latest | Icon set |
| Fonts | next/font | built-in | Geist + JetBrains Mono |
| Deployment | Vercel | — | Hosting |

---

## 🎨 DESIGN SYSTEM

### Theme Identity
```
Style:       Glassmorphism + Colorful accents on deep dark background
Feel:        Premium developer portfolio — clean, modern, alive
Background:  Deep navy/near-black (#020817 → oklch equivalent)
Glass:       backdrop-blur-md + bg-white/5 + border-white/10
Accent:      Per-course color system (see Course Colors below)
Typography:  Geist Sans (UI) + JetBrains Mono (code)
```

### Color Tokens (defined in globals.css @theme)
```css
/* Base */
--color-background:     oklch(0.07 0.02 265);   /* deep dark navy */
--color-surface:        oklch(0.10 0.02 265);   /* card background */
--color-surface-hover:  oklch(0.13 0.02 265);   /* hover state */
--color-border:         oklch(1 0 0 / 0.08);    /* white/8 border */
--color-border-hover:   oklch(1 0 0 / 0.15);    /* white/15 hover */

/* Text */
--color-text-primary:   oklch(0.95 0 0);        /* near white */
--color-text-secondary: oklch(0.65 0 0);        /* muted text */
--color-text-muted:     oklch(0.45 0 0);        /* very muted */

/* Glass */
--glass-bg:             oklch(1 0 0 / 0.05);    /* bg-white/5 */
--glass-border:         oklch(1 0 0 / 0.08);    /* border-white/8 */
--glass-blur:           16px;                   /* backdrop-blur-md */
--glass-shadow:         0 8px 32px oklch(0 0 0 / 0.4);

/* Course Accent Colors */
--color-webtech:        oklch(0.75 0.18 45);    /* Orange */
--color-html:           oklch(0.72 0.20 35);    /* Deep Orange */
--color-css:            oklch(0.65 0.20 255);   /* Blue */
--color-js:             oklch(0.85 0.18 95);    /* Yellow */
--color-sql:            oklch(0.65 0.18 220);   /* Steel Blue */
--color-java:           oklch(0.65 0.20 20);    /* Red */
--color-advanced-java:  oklch(0.60 0.20 310);   /* Purple */
--color-hibernate:      oklch(0.60 0.15 55);    /* Brown */
--color-springboot:     oklch(0.70 0.20 145);   /* Green */
--color-react:          oklch(0.72 0.18 200);   /* Cyan */
--color-python:         oklch(0.80 0.18 95);    /* Yellow-Gold */

/* Status Colors */
--color-success:        oklch(0.72 0.18 145);
--color-warning:        oklch(0.82 0.18 85);
--color-error:          oklch(0.65 0.22 20);
--color-info:           oklch(0.68 0.18 225);
```

### Typography Scale
```
Font Family:
  UI Text:   Geist Sans (via next/font/google)
  Code:      JetBrains Mono (via next/font/google)

Size Scale (Tailwind v4):
  xs:    0.75rem  / 12px
  sm:    0.875rem / 14px
  base:  1rem     / 16px
  lg:    1.125rem / 18px
  xl:    1.25rem  / 20px
  2xl:   1.5rem   / 24px
  3xl:   1.875rem / 30px
  4xl:   2.25rem  / 36px
  5xl:   3rem     / 48px

Weight Scale:
  normal:    400
  medium:    500
  semibold:  600
  bold:      700
  extrabold: 800
```

### Spacing & Layout
```
Container max-width:  1280px (max-w-screen-xl)
Section padding:      px-4 sm:px-6 lg:px-8
Section gap:          gap-6 (cards) / gap-8 (sections)
Card border-radius:   rounded-2xl (16px)
Button border-radius: rounded-xl (12px)
Input border-radius:  rounded-lg (8px)

Breakpoints (Tailwind v4 defaults):
  sm:  640px
  md:  768px
  lg:  1024px
  xl:  1280px
  2xl: 1536px
```

### Glass Effect Classes (reusable patterns)
```typescript
// Glass Card
"backdrop-blur-md bg-white/5 border border-white/8 rounded-2xl shadow-2xl"

// Glass Card Hover
"hover:bg-white/8 hover:border-white/15 transition-all duration-300"

// Glass Input
"backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg focus:border-white/25"

// Glass Button
"backdrop-blur-sm bg-white/10 border border-white/15 hover:bg-white/15 rounded-xl"

// Glow Effect (per course color)
"shadow-[0_0_30px_var(--course-color)/20]"

// Gradient Text
"bg-gradient-to-r from-[var(--course-color)] to-white bg-clip-text text-transparent"
```

---

## 🧩 UI COMPONENT INVENTORY

> All components built on shadcn/ui primitives with glass theme applied.
> Status: ⬜ Not Started | 🟡 In Progress | ✅ Done

### Buttons
| Component | Variants | Status |
|---|---|---|
| PrimaryButton | default, sm, lg, icon | ⬜ |
| GhostButton | default, sm, lg | ⬜ |
| GlassButton | default, sm, lg, icon | ⬜ |
| OutlineButton | default, sm, lg | ⬜ |
| DangerButton | default, sm | ⬜ |
| IconButton | sm, md, lg | ⬜ |
| CopyButton | idle, copied, error | ⬜ |
| RunButton | idle, running, success, error | ⬜ |

### Inputs & Forms
| Component | Variants | Status |
|---|---|---|
| TextInput | default, error, disabled, with-icon | ⬜ |
| SearchInput | default, with-clear | ⬜ |
| SelectInput | default, multi | ⬜ |
| Textarea | default, resizable, fixed | ⬜ |
| FormField | label + input + error message | ⬜ |
| FormLabel | default, required, optional | ⬜ |
| FormError | inline error message | ⬜ |

### Feedback & Overlays
| Component | Variants | Status |
|---|---|---|
| Toast (Sonner) | success, error, warning, info, loading | ⬜ |
| Alert | success, error, warning, info | ⬜ |
| Badge | default, course-color, outline, dot | ⬜ |
| Tooltip | default, dark, light | ⬜ |
| Modal | default, fullscreen | ⬜ |
| Drawer | left, right, bottom | ⬜ |
| ConfirmDialog | default | ⬜ |
| LoadingSpinner | sm, md, lg | ⬜ |
| Skeleton | text, card, code, avatar | ⬜ |
| EmptyState | default, with-action | ⬜ |
| ErrorState | default, with-retry | ⬜ |

### Navigation
| Component | Variants | Status |
|---|---|---|
| Navbar | desktop, mobile (hamburger) | ⬜ |
| Breadcrumb | default, with-icons | ⬜ |
| Tabs | default, pills, underline | ⬜ |
| Sidebar | collapsible | ⬜ |

### Data Display
| Component | Variants | Status |
|---|---|---|
| CourseCard | default, featured, compact | ⬜ |
| ProjectCard | beginner, intermediate, pro | ⬜ |
| SnippetCard | default, with-preview | ⬜ |
| FileTree | default | ⬜ |
| CodeViewer | read-only Monaco instance | ⬜ |
| LivePreview | iframe, terminal, sql | ⬜ |
| TerminalOutput | success, error, running | ⬜ |
| LanguageBadge | per-language color + icon | ⬜ |
| DifficultyBadge | beginner, intermediate, pro | ⬜ |
| ReadmeRenderer | markdown to HTML | ⬜ |

### Layout
| Component | Variants | Status |
|---|---|---|
| PageWrapper | default (padded, max-width) | ⬜ |
| SectionHeader | with title + subtitle | ⬜ |
| GridLayout | 1-col, 2-col, 3-col, 4-col responsive | ⬜ |
| SplitLayout | code + preview side-by-side | ⬜ |
| FullscreenLayout | for code viewer page | ⬜ |

---

## 📁 GITHUB REPOSITORY STRUCTURE (Content Repo)

> Repo name: `java-fullstack-journey`
> This is the SOURCE of all code shown in the app. Push files here → app auto-updates.

```
java-fullstack-journey/
│
├── WebTech/
│   ├── HTML/
│   │   ├── Notes/
│   │   ├── Snippets/
│   │   └── Projects/
│   │       ├── Beginner/
│   │       │   └── [ProjectFolder]/
│   │       │       ├── README.md      ← title, description, what you learned
│   │       │       └── index.html     ← source files
│   │       ├── Intermediate/
│   │       └── Pro/
│   ├── CSS/
│   │   ├── Notes/
│   │   ├── Snippets/
│   │   └── Projects/
│   │       ├── Beginner/
│   │       ├── Intermediate/
│   │       └── Pro/
│   └── JS/
│       ├── Notes/
│       ├── Snippets/
│       └── Projects/
│           ├── Beginner/
│           ├── Intermediate/
│           └── Pro/
│
├── SQL/
│   ├── Notes/
│   ├── Scripts/
│   └── Projects/
│       ├── Beginner/
│       ├── Intermediate/
│       └── Pro/
│
├── Java/
│   ├── Notes/
│   ├── Snippets/
│   └── Projects/
│       ├── Beginner/
│       ├── Intermediate/
│       └── Pro/
│
├── AdvancedJava/
│   ├── Notes/
│   ├── Snippets/
│   └── Projects/
│       ├── Beginner/
│       ├── Intermediate/
│       └── Pro/
│
├── Hibernate/
│   ├── Notes/
│   ├── Snippets/
│   └── Projects/
│       ├── Beginner/
│       ├── Intermediate/
│       └── Pro/
│
├── SpringBoot/
│   ├── Notes/
│   ├── Snippets/
│   └── Projects/
│       ├── Beginner/
│       ├── Intermediate/
│       └── Pro/
│
├── ReactJS/
│   ├── Notes/
│   ├── Snippets/
│   └── Projects/
│       ├── Beginner/
│       ├── Intermediate/
│       └── Pro/
│
├── Python/
│   ├── Notes/
│   ├── Snippets/
│   └── Projects/
│       ├── Beginner/
│       ├── Intermediate/
│       └── Pro/
│
└── meta.json   ← course metadata (title, color, icon, description)
```

### meta.json Schema
```json
{
  "courses": [
    {
      "id": "webtech",
      "title": "Web Technology",
      "path": "WebTech",
      "color": "#f97316",
      "cssVar": "--color-webtech",
      "icon": "globe",
      "description": "HTML, CSS & JavaScript fundamentals",
      "subcourses": ["HTML", "CSS", "JS"]
    }
  ]
}
```

### Project README.md Convention
```markdown
# Project Title

## Description
What this project does.

## What I Learned
- Concept 1
- Concept 2

## Tech Used
HTML, CSS

## Difficulty
Beginner
```

---

## 🗺️ APPLICATION STRUCTURE (This App)

```
code-showcase-portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css              ← Glass theme, @theme tokens, tw-animate-css
│   │   ├── layout.tsx               ← Root layout, fonts, Toaster
│   │   ├── page.tsx                 ← Home → redirects to /courses
│   │   ├── error.tsx                ← Global error boundary
│   │   ├── not-found.tsx            ← 404 page
│   │   ├── loading.tsx              ← Global loading UI
│   │   │
│   │   ├── courses/
│   │   │   ├── page.tsx             ← All courses grid
│   │   │   └── loading.tsx
│   │   │
│   │   ├── courses/[course]/
│   │   │   ├── page.tsx             ← Course detail (Notes/Snippets/Projects tabs)
│   │   │   └── loading.tsx
│   │   │
│   │   ├── courses/[course]/[section]/
│   │   │   ├── page.tsx             ← Section files list (e.g. Beginner projects)
│   │   │   └── loading.tsx
│   │   │
│   │   ├── viewer/
│   │   │   └── page.tsx             ← Code viewer + live preview (fullscreen)
│   │   │
│   │   └── api/
│   │       ├── courses/
│   │       │   └── route.ts         ← GET: list all courses from GitHub
│   │       ├── courses/[course]/
│   │       │   └── route.ts         ← GET: list course contents
│   │       ├── file/
│   │       │   └── route.ts         ← GET: fetch single file content
│   │       └── execute/
│   │           └── route.ts         ← POST: execute code via Judge0
│   │
│   ├── components/
│   │   ├── ui/                      ← shadcn/ui primitives (auto-generated)
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── PageWrapper.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   └── GridLayout.tsx
│   │   │
│   │   ├── courses/
│   │   │   ├── CourseCard.tsx
│   │   │   ├── CourseGrid.tsx
│   │   │   └── CourseTabs.tsx
│   │   │
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectGrid.tsx
│   │   │   └── DifficultyBadge.tsx
│   │   │
│   │   ├── viewer/
│   │   │   ├── CodeViewer.tsx       ← Monaco Editor wrapper
│   │   │   ├── LivePreview.tsx      ← iframe / terminal / sql switcher
│   │   │   ├── HtmlPreview.tsx      ← sandboxed iframe
│   │   │   ├── TerminalOutput.tsx   ← Judge0 output display
│   │   │   ├── SqlPreview.tsx       ← sql.js runner
│   │   │   └── SplitLayout.tsx      ← code + preview side by side
│   │   │
│   │   └── shared/
│   │       ├── LanguageBadge.tsx
│   │       ├── CopyButton.tsx
│   │       ├── Breadcrumb.tsx
│   │       ├── Skeleton.tsx
│   │       ├── EmptyState.tsx
│   │       └── ErrorState.tsx
│   │
│   ├── hooks/
│   │   ├── useGitHub.ts             ← GitHub API calls
│   │   ├── useCodeExecution.ts      ← Judge0 API
│   │   ├── useSqlRunner.ts          ← sql.js runner
│   │   └── useCopyToClipboard.ts
│   │
│   ├── lib/
│   │   ├── github.ts                ← Octokit client + helpers
│   │   ├── judge0.ts                ← Judge0 API helpers
│   │   ├── sql.ts                   ← sql.js helpers
│   │   ├── language.ts              ← language detection utils
│   │   └── env.ts                   ← env var validation
│   │
│   ├── types/
│   │   ├── Course.types.ts
│   │   ├── Project.types.ts
│   │   ├── GitHub.types.ts
│   │   ├── Judge0.types.ts
│   │   └── Api.types.ts
│   │
│   ├── constants/
│   │   ├── COURSES.ts               ← course config (matches meta.json)
│   │   ├── LANGUAGES.ts             ← language → Monaco + Judge0 ID map
│   │   └── ROUTES.ts                ← app route constants
│   │
│   └── data/
│       └── courses.ts               ← fallback static course data
│
├── public/
│   └── icons/                       ← course SVG icons
│
├── .env.example                     ← all required env vars (empty values)
├── .env.local                       ← actual values (gitignored)
├── .gitignore
├── .eslintrc.json
├── next.config.ts
├── tsconfig.json
├── package.json
├── AI_INSTRUCTIONS.md               ← AI rules (always read first)
└── PROJECT_MEMORY.md                ← this file
```

---

## 🗂️ TYPE DEFINITIONS

### Course.types.ts
```typescript
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
```

### GitHub.types.ts
```typescript
export interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size: number;
  url: string;
  language?: string;
}

export interface GitHubFileContent {
  name: string;
  path: string;
  content: string;
  encoding: 'base64';
  size: number;
}
```

### Judge0.types.ts
```typescript
export interface ExecutionRequest {
  sourceCode: string;
  languageId: number;
  stdin?: string;
}

export interface ExecutionResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: {
    id: number;
    description: string;
  };
  time: string;
  memory: number;
}
```

### Api.types.ts
```typescript
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface ApiError {
  error: string;
  status: number;
}
```

---

## 🛣️ API ROUTES

| Route | Method | Description | Auth |
|---|---|---|---|
| `/api/courses` | GET | List all top-level courses | Server only |
| `/api/courses/[course]` | GET | Get course content (notes/snippets/projects) | Server only |
| `/api/file` | GET | Fetch raw file content by path | Server only |
| `/api/execute` | POST | Execute code via Judge0 | Server only |

### Environment Variables Required
```bash
# .env.example
GITHUB_TOKEN=                    # GitHub personal access token (repo read)
GITHUB_OWNER=                    # GitHub username
GITHUB_REPO=java-fullstack-journey   # Content repository name
JUDGE0_API_KEY=                  # Judge0 RapidAPI key
JUDGE0_API_URL=                  # Judge0 endpoint URL
NEXT_PUBLIC_APP_URL=             # Your deployed app URL
```

---

## 🌐 PAGE MAP

### `/courses` — Courses Grid
```
- Hero text: "My Learning Journey"
- Grid of CourseCards (responsive: 1→2→3→4 cols)
- Each card: icon, title, description, snippet count, project count
- Hover: glow effect in course color, scale up
- Click: navigate to /courses/[course]
```

### `/courses/[course]` — Course Detail
```
- Breadcrumb: Home > Courses > [Course Name]
- Course header: icon, title, description, accent color
- Tabs: Notes | Snippets | Projects
  - Notes tab: list of .md/.txt files → click to view
  - Snippets tab: file cards with language badge → click to view in editor
  - Projects tab:
    - Three sections: Beginner / Intermediate / Pro
    - ProjectCards with README preview
    - Click → /viewer?path=...
```

### `/viewer` — Code Viewer + Live Preview
```
- Fullscreen layout
- Left panel: Monaco Editor (read-only, syntax highlighted)
- Right panel: Live Preview
  - HTML/CSS/JS → sandboxed iframe (auto-refreshes)
  - Java/Python/etc → Run button → Judge0 → TerminalOutput
  - SQL → sql.js runner → table output
- Top bar: filename, language badge, copy button, run button
- Breadcrumb navigation back
```

### `/` — Home
```
- Redirects to /courses
```

---

## 🗺️ LANGUAGE MAP

```typescript
// Monaco language ID → Judge0 language ID → Display name
export const LANGUAGE_MAP = {
  // Web
  html:       { monaco: 'html',       judge0: null,  display: 'HTML',       color: '--color-html' },
  css:        { monaco: 'css',        judge0: null,  display: 'CSS',        color: '--color-css' },
  javascript: { monaco: 'javascript', judge0: 63,    display: 'JavaScript', color: '--color-js' },
  typescript: { monaco: 'typescript', judge0: 74,    display: 'TypeScript', color: '--color-js' },

  // Backend
  java:       { monaco: 'java',       judge0: 62,    display: 'Java',       color: '--color-java' },
  python:     { monaco: 'python',     judge0: 71,    display: 'Python',     color: '--color-python' },

  // Data
  sql:        { monaco: 'sql',        judge0: null,  display: 'SQL',        color: '--color-sql' },

  // Docs
  markdown:   { monaco: 'markdown',   judge0: null,  display: 'Markdown',   color: null },
  json:       { monaco: 'json',       judge0: null,  display: 'JSON',       color: null },
  xml:        { monaco: 'xml',        judge0: null,  display: 'XML',        color: null },
};

// File extension → language
export const EXTENSION_MAP: Record<string, string> = {
  '.html': 'html', '.css': 'css', '.js': 'javascript',
  '.ts': 'typescript', '.tsx': 'typescript', '.jsx': 'javascript',
  '.java': 'java', '.py': 'python', '.sql': 'sql',
  '.md': 'markdown', '.json': 'json', '.xml': 'xml',
};
```

---

## 🚀 BUILD PHASES

### Phase 1 — Foundation & GitHub Integration
```
[ ] Next.js 15 project scaffold (npx create-next-app@latest)
[ ] Install and configure all packages
[ ] globals.css — glass theme, @theme tokens
[ ] Root layout — fonts, Toaster (Sonner)
[ ] Octokit client setup (/src/lib/github.ts)
[ ] Environment validation (/src/lib/env.ts)
[ ] API route: /api/courses
[ ] API route: /api/courses/[course]
[ ] API route: /api/file
[ ] Types defined (/src/types/)
[ ] Constants defined (/src/constants/)
[ ] Courses page — CourseGrid with glass cards
[ ] Course detail page — tabs (Notes/Snippets/Projects)
[ ] Navbar component
[ ] Breadcrumb component
[ ] Loading skeletons
[ ] Error states
[ ] Not-found page
```

### Phase 2 — Code Viewer
```
[ ] Monaco Editor integration (dynamic import, ssr:false)
[ ] CodeViewer component
[ ] Viewer page layout (split view)
[ ] Language detection utility
[ ] Copy to clipboard button
[ ] File tree sidebar
[ ] LanguageBadge component
[ ] Syntax theme matching app dark theme
```

### Phase 3 — Live Previews
```
[ ] HtmlPreview — sandboxed iframe (HTML/CSS/JS)
[ ] Judge0 API integration (/src/lib/judge0.ts)
[ ] API route: /api/execute
[ ] TerminalOutput component
[ ] RunButton with states (idle/running/success/error)
[ ] sql.js integration (dynamic import)
[ ] SqlPreview — query runner + table output
[ ] Preview type auto-detection by language
```

### Phase 4 — Polish & Deploy
```
[ ] Search across all courses/files
[ ] Animations (Motion) — page transitions, card hovers, stagger
[ ] Responsive design audit (mobile, tablet, desktop)
[ ] Performance audit (Lighthouse)
[ ] Accessibility audit
[ ] README.md renderer (markdown → HTML)
[ ] Meta tags / SEO (next/metadata)
[ ] Vercel deployment
[ ] Custom domain (optional)
[ ] Final PROJECT_MEMORY.md update
```

---

## 📝 DECISIONS LOG (ADR — Architecture Decision Records)

| # | Decision | Reason | Date |
|---|---|---|---|
| 001 | Next.js 15 over NestJS | Handles both FE+BE, serverless-friendly, no extra server needed | Init |
| 002 | GitHub as content source | Zero-database, push-to-update, version controlled content | Init |
| 003 | One content repo, one app repo | Clean separation of content and application code | Init |
| 004 | Judge0 over Docker | Serverless compatible, supports 60+ languages, no infra | Init |
| 005 | Sonner over shadcn toast | shadcn deprecated its toast in Tailwind v4 build | Init |
| 006 | tw-animate-css over tailwindcss-animate | tailwindcss-animate deprecated March 2025 | Init |
| 007 | motion/react import (not framer-motion) | Package renamed, framer-motion is legacy import | Init |
| 008 | sql.js over server-side SQL | Browser WASM, no server execution needed for SQL preview | Init |
| 009 | No forwardRef anywhere | Removed in React 19, use ref as prop directly | Init |
| 010 | CSS-first Tailwind config (@theme) | tailwind.config.js deprecated in v4 | Init |
| 011 | Three difficulty tiers: Beginner/Intermediate/Pro | Clear progression, "Pro" sounds better than "Advanced" | Init |
| 012 | meta.json in content repo | Allows customizing course metadata without changing app code | Init |

---

## ⚠️ KNOWN GOTCHAS & WARNINGS

```
1. Monaco Editor and sql.js MUST use dynamic import with ssr:false
   — They directly access window/document and will crash on SSR

2. GitHub API has rate limits:
   — Unauthenticated: 60 req/hour
   — Authenticated (token): 5000 req/hour
   — ALWAYS use GITHUB_TOKEN in server routes

3. Judge0 free tier limits:
   — 50 submissions/day on free RapidAPI plan
   — Use paid plan or self-hosted for production

4. Tailwind v4 CSS variables use OKLCH not HEX/HSL:
   — Wrong:  --color-primary: #3b82f6;
   — Right:  --color-primary: oklch(0.65 0.20 255);

5. shadcn/ui new-york style only (not default):
   — Set during: npx shadcn@latest init → select "new-york"

6. React 19 breaks many older packages:
   — Always check package compatibility before installing anything new

7. Next.js 15 fetch caching changed:
   — fetch() is no longer cached by default
   — Always add: next: { revalidate: 3600 } for GitHub API calls

8. iframe sandbox for HTML preview:
   — Always use: sandbox="allow-scripts"
   — Never add: allow-same-origin (security risk)
```

---

## 📊 CURRENT STATUS

```
Phase 1 — Foundation        ⬜ NOT STARTED
Phase 2 — Code Viewer       ⬜ NOT STARTED
Phase 3 — Live Previews     ⬜ NOT STARTED
Phase 4 — Polish & Deploy   ⬜ NOT STARTED

Overall: 0% complete
```

---

## 🔄 HOW TO UPDATE THIS FILE

After every work session, update:
1. **Current Status** — check off completed tasks
2. **Decisions Log** — add any new architectural decisions
3. **Known Gotchas** — add any new issues discovered
4. **Last Updated** date at the top

---

*This file + AI_INSTRUCTIONS.md = complete project context for any AI at any time.*
*Any AI that reads both files can immediately produce correct, consistent code.*