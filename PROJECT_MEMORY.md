# 🧠 PROJECT MEMORY — imamuddin-devfolio
> Every AI MUST read `AI_INSTRUCTIONS.md` first, then this file before writing any code.
> Last Updated: Phase 2 COMPLETE ✅ — Phase 3 (Live Execution) is next.

---

## 📌 PROJECT OVERVIEW

| Field | Value |
|---|---|
| **Project Name** | imamuddin-devfolio |
| **Type** | Next.js 15 Web Application |
| **Purpose** | Display code snippets & projects from GitHub with live preview |
| **Owner** | Imamuddin |
| **GitHub Repo (Content)** | [YOUR_USERNAME]/java-fullstack-journey |
| **GitHub Repo (App)** | [YOUR_USERNAME]/imamuddin-devfolio |
| **Deployment** | Vercel |
| **Status** | 🟡 Phase 3 Starting — Live Code Execution |
| **Dev URL** | http://localhost:3000 |

---

## 🛠️ LOCKED TECH STACK

| Package | Version | Notes |
|---|---|---|
| next | 15.x | App Router only |
| react + react-dom | 19.x | No forwardRef |
| typescript | 5.x | strict mode |
| tailwindcss | 4.x | CSS-first, @theme in globals.css |
| tw-animate-css | latest | replaces tailwindcss-animate |
| shadcn/ui | latest (Radix Nova) | New York was unavailable |
| motion | latest | import from motion/react |
| @monaco-editor/react | 4.7.0 | ALWAYS ssr:false — NEVER SSR |
| sonner | latest | replaces shadcn toast |
| react-hook-form + zod | latest | forms + validation |
| @octokit/rest | latest | GitHub API (connected in Phase 4) |
| lucide-react | latest | icons |
| next/font | built-in | Syne + JetBrains Mono |

---

## 🎨 DESIGN SYSTEM

### Theme System
```
10 themes via data-theme on <html>
Persisted in localStorage key: 'devfolio-theme'
Default: midnight-aurora
Switcher: Palette icon in Navbar
```

| # | Theme ID | Accent | Vibe |
|---|---|---|---|
| 1 | `midnight-aurora` | `#06b6d4` | Default — deep navy + cyan |
| 2 | `obsidian-flame` | `#f97316` | Black + fire |
| 3 | `emerald-depths` | `#34d399` | Teal + mint |
| 4 | `violet-cosmos` | `#a78bfa` | Purple + galaxy |
| 5 | `rose-gold-noir` | `#fb7185` | Charcoal + rose gold |
| 6 | `arctic-steel` | `#7dd3fc` | Steel + ice |
| 7 | `golden-hour` | `#fbbf24` | Amber + gold |
| 8 | `matrix-green` | `#00ff41` | Black + hacker green |
| 9 | `neon-tokyo` | `#ec4899` | Dark + cyberpunk pink |
| 10 | `deep-ocean` | `#0ea5e9` | Navy + bioluminescent |

### CSS Variables (all themes expose)
```css
--bg-base / --bg-surface / --bg-elevated / --bg-overlay
--border-subtle / --border-default / --border-strong
--text-primary / --text-secondary / --text-muted / --text-inverse
--accent-1 / --accent-2 / --accent-3 / --accent-glow
--glass-bg / --glass-bg-hover / --glass-border / --glass-border-hover
--glass-blur / --glass-shadow
--color-webtech/html/css/js/sql/java/adv-java/hibernate/spring/react/python
--color-success / --color-warning / --color-error / --color-info
```

### Monaco Editor Theme
```
Theme name: 'devfolio-dark'
Background: #0a1628 (matches midnight-aurora --bg-surface)
Keywords:   #818cf8 (indigo)
Strings:    #34d399 (emerald)
Numbers:    #f97316 (orange)
Types:      #38bdf8 (sky)
Functions:  #a78bfa (violet)
Comments:   #475569 (slate, italic)
Font:       JetBrains Mono, 14px, line-height 22
```

### Difficulty Badge Colors
```
Beginner:     🌱 green  #4ade80
Intermediate: ⚡ yellow #fbbf24
Pro:          🔥 red    #f87171
```

---

## 📁 STATIC MOCK DATA (used until GitHub API connected)

```
src/data/mockFiles.ts → MOCK_FILES array with 9 demo files:
  - WebTech/HTML/Snippets/hello-world.html     → HTML preview
  - WebTech/CSS/Snippets/glassmorphism.html    → HTML preview
  - WebTech/JS/Snippets/counter.html           → HTML preview (JS)
  - Java/Snippets/HelloWorld.java              → terminal (Phase 3)
  - Java/Snippets/OOPDemo.java                 → terminal (Phase 3)
  - Python/Snippets/hello.py                   → terminal (Phase 3)
  - SQL/Scripts/basics.sql                     → sql runner (Phase 3)
  - SpringBoot/Snippets/RestController.java    → terminal (Phase 3)
  - ReactJS/Snippets/UseStateDemo.tsx          → read-only (no exec)

Helper functions:
  getMockFile(path)              → find by exact path
  getMockFilesForCourse(folder)  → all files under a course folder
```

---

## 🗺️ COMPLETE FILE STATUS

### App Pages
```
src/app/globals.css                              ✅
src/app/layout.tsx                               ✅
src/app/page.tsx                                 ✅ redirect → /courses
src/app/error.tsx                                ✅
src/app/not-found.tsx                            ✅
src/app/loading.tsx                              ✅
src/app/courses/page.tsx                         ✅ hero + stats + CourseGrid
src/app/courses/loading.tsx                      ✅
src/app/courses/[course]/page.tsx                ✅ tabs: Notes/Snippets/Projects
src/app/courses/[course]/loading.tsx             ✅
src/app/courses/[course]/[section]/page.tsx      ✅ file list
src/app/viewer/page.tsx                          ✅ Monaco + LivePreview + sidebar
src/app/api/courses/route.ts                     ⬜ Phase 4 (GitHub)
src/app/api/courses/[course]/route.ts            ⬜ Phase 4 (GitHub)
src/app/api/file/route.ts                        ⬜ Phase 4 (GitHub)
src/app/api/execute/route.ts                     ⬜ Phase 3 — NEXT
```

### Components
```
src/components/ui/*                              ✅ shadcn auto-generated
src/components/layout/Navbar.tsx                 ✅ sticky glass, theme switcher
src/components/layout/PageWrapper.tsx            ✅
src/components/layout/SectionHeader.tsx          ✅
src/components/layout/GridLayout.tsx             ✅
src/components/courses/CourseCard.tsx            ✅
src/components/courses/CourseGrid.tsx            ✅
src/components/courses/CourseTabs.tsx            ✅
src/components/projects/ProjectCard.tsx          ✅
src/components/projects/ProjectGrid.tsx          ✅
src/components/projects/DifficultyBadge.tsx      ✅
src/components/shared/Breadcrumb.tsx             ✅
src/components/shared/Skeleton.tsx               ✅
src/components/shared/CopyButton.tsx             ✅ idle/copied states
src/components/shared/EmptyState.tsx             ✅
src/components/shared/ErrorState.tsx             ✅
src/components/shared/LanguageBadge.tsx          ✅
src/components/viewer/CodeViewer.tsx             ✅ Monaco, custom dark theme
src/components/viewer/LivePreview.tsx            ✅ routes to iframe/terminal/sql/none
src/components/viewer/HtmlPreview.tsx            ✅ sandboxed iframe, refresh button
src/components/viewer/SplitLayout.tsx            ✅ draggable split, mobile tabs
src/components/viewer/TerminalOutput.tsx         ⬜ Phase 3 — NEXT
src/components/viewer/SqlPreview.tsx             ⬜ Phase 3 — NEXT
```

### Hooks / Lib / Data
```
src/hooks/useGitHub.ts                           ⬜ Phase 4
src/hooks/useCodeExecution.ts                    ✅
src/hooks/useSqlRunner.ts                        ⬜ Phase 3
src/hooks/useCopyToClipboard.ts                  ✅
src/lib/env.ts / github.ts / judge0.ts           ✅ (token setup Phase 4)
src/lib/language.ts / utils.ts                   ✅
src/types/*.types.ts                             ✅ all done
src/constants/COURSES.ts / LANGUAGES.ts / ROUTES.ts  ✅
src/data/mockFiles.ts                            ✅ 9 demo files, all languages
```

---

## 📍 WHERE TO PLACE THIS SESSION'S FILES

| Output File | → Copy to |
|---|---|
| `mockFiles.ts` | `src/data/mockFiles.ts` |
| `CopyButton.tsx` | `src/components/shared/CopyButton.tsx` |
| `CodeViewer.tsx` | `src/components/viewer/CodeViewer.tsx` |
| `HtmlPreview.tsx` | `src/components/viewer/HtmlPreview.tsx` |
| `LivePreview.tsx` | `src/components/viewer/LivePreview.tsx` |
| `SplitLayout.tsx` | `src/components/viewer/SplitLayout.tsx` |
| `viewer-page.tsx` | `src/app/viewer/page.tsx` |

---

## 🛣️ VIEWER PAGE ARCHITECTURE

```
/viewer?path=WebTech/HTML/Snippets/hello-world.html

ViewerPage (Suspense wrapper)
  └── ViewerInner ('use client')
        ├── TopBar
        │     ├── ← Back to Courses (Link)
        │     ├── 📚 Files toggle button
        │     ├── file path breadcrumb (full path)
        │     ├── LangBadge (colored by language)
        │     └── CopyButton (copies raw code)
        │
        ├── FileSidebar (collapsible, hidden on mobile)
        │     └── list of all MOCK_FILES
        │           → click to switch active file
        │           → active file has colored left border
        │
        └── SplitLayout (draggable on desktop, tabs on mobile)
              ├── LEFT: CodeViewer (Monaco, read-only, devfolio-dark theme)
              └── RIGHT: LivePreview
                    ├── HTML/CSS/JS → HtmlPreview (sandboxed iframe)
                    ├── Java/Python/JS exec → placeholder "Phase 3"
                    ├── SQL → placeholder "Phase 3"
                    └── Other → "No preview available"
```

---

## 🚀 BUILD PHASES

### Phase 1 — Foundation UI ✅ COMPLETE
### Phase 2 — Code Viewer ✅ COMPLETE
```
[✅] mockFiles.ts — 9 static demo files (all languages)
[✅] CopyButton.tsx — idle/copied/error states
[✅] CodeViewer.tsx — Monaco Editor, custom dark theme, no SSR
[✅] HtmlPreview.tsx — sandboxed iframe, refresh button
[✅] LivePreview.tsx — routes by language to correct preview
[✅] SplitLayout.tsx — draggable desktop split, mobile tabs
[✅] viewer/page.tsx — full viewer with sidebar, topbar, split view
```

### Phase 3 — Live Code Execution ⬜ NEXT
```
[ ] TerminalOutput.tsx
      - Display Judge0 results
      - States: idle | running | success | error
      - Show: stdout, stderr, compile_output, status, time, memory
      - Color-coded output (green=success, red=error, yellow=compile err)
      - Monospace font (JetBrains Mono)

[ ] RunButton.tsx
      - States: idle | running | success | error
      - Spinner animation while running
      - Only renders for executable languages (canRun: true)

[ ] SqlPreview.tsx
      - Load sql.js via dynamic import (ssr:false)
      - Execute SQL query against in-memory SQLite DB
      - Display results in a table (or error message)
      - Pre-load CREATE/INSERT statements then run SELECT

[ ] useSqlRunner.ts
      - Hook wrapping sql.js
      - Returns: { run, results, error, loading }

[ ] /api/execute route.ts
      - POST: { sourceCode, languageId, stdin? }
      - Calls Judge0 API
      - Polls until result ready (max 10s)
      - Returns ExecutionResult

[ ] Connect RunButton to useCodeExecution in viewer/page.tsx
[ ] Show TerminalOutput in right panel when run completes
[ ] Get JUDGE0_API_KEY from rapidapi.com and add to .env.local
```

### Phase 4 — Polish & GitHub Connect ⬜
```
[ ] Connect GitHub API (GITHUB_TOKEN in .env.local)
[ ] Replace MOCK_FILES with real GitHub API calls
[ ] useGitHub.ts hook
[ ] /api/courses, /api/courses/[course], /api/file routes
[ ] Motion animations (page transitions, stagger)
[ ] Search across files
[ ] Responsive audit
[ ] Lighthouse audit
[ ] Vercel deployment
```

---

## 📝 DECISIONS LOG

| # | Decision | Reason |
|---|---|---|
| 001 | Next.js 15 App Router | Modern, serverless |
| 002 | GitHub as content source | Zero-database, push-to-update |
| 003 | Judge0 for execution | Serverless, 60+ languages |
| 004 | Sonner over shadcn toast | shadcn deprecated toast |
| 005 | tw-animate-css | tailwindcss-animate deprecated 2025 |
| 006 | motion/react import | framer-motion is legacy |
| 007 | Radix Nova (shadcn) | New York unavailable |
| 008 | Syne font | Bold/geometric, avoids Inter/Roboto |
| 009 | 10 CSS-var themes | Pure CSS, no JS theming lib |
| 010 | color-mix() for hover | Native CSS |
| 011 | Static mock data first | GitHub token deferred to Phase 4 |
| 012 | Beginner/Intermediate/Pro | Professional tier naming |
| 013 | Monaco theme 'devfolio-dark' | Custom theme matches app dark bg |
| 014 | SplitLayout drag handle | Better UX than fixed 50/50 split |
| 015 | Suspense on viewer page | useSearchParams() needs Suspense boundary |
| 016 | iframe sandbox="allow-scripts" | Security — no allow-same-origin ever |

---

## ⚠️ KNOWN GOTCHAS

```
1.  Monaco Editor  → dynamic import ONLY, ssr:false — never import normally
2.  sql.js         → dynamic import ONLY, ssr:false
3.  GitHub API     → needs GITHUB_TOKEN (Phase 4)
4.  Judge0 API     → needs JUDGE0_API_KEY (Phase 3)
5.  Next.js 15     → params is a Promise — ALWAYS await params
6.  Tailwind v4    → NO tailwind.config.js — all in @theme globals.css
7.  Radix Nova     → shadcn style used (not New York)
8.  useSearchParams → ALWAYS wrap in <Suspense> in page components
9.  iframe sandbox → NEVER add allow-same-origin (security risk)
10. React 19       → NO forwardRef — ref is a regular prop
11. Navbar         → adds <div className="h-16" /> spacer below fixed bar
12. viewer page    → reads ?path= query param to load file from MOCK_FILES
13. SplitLayout    → desktop = draggable split | mobile = code/preview tabs
14. HtmlPreview    → 300ms debounce on srcdoc update to avoid flicker
```

---

## 📊 CURRENT STATUS

```
Phase 1 — Foundation UI   ✅ COMPLETE  (14/14)
Phase 2 — Code Viewer     ✅ COMPLETE  (7/7)
Phase 3 — Live Execution  ⬜ NEXT      (0/7)
Phase 4 — Polish/Deploy   ⬜ Pending   (0/9)

Overall: ~55% complete
```