# 🧠 PROJECT MEMORY — imamuddin-devfolio
> Every AI MUST read `AI_INSTRUCTIONS.md` first, then this file completely before writing any code.
> Update this file after every work session.
> Last Updated: Phase 1 — Foundation UI (globals, layout, navbar, courses page) ✅

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
| **Status** | 🟡 Phase 1 In Progress |
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
| shadcn/ui | latest (Radix Nova) | chosen during init (New York unavailable) |
| motion | latest | import from motion/react |
| @monaco-editor/react | 4.7.0 | always ssr:false |
| sonner | latest | replaces shadcn toast |
| react-hook-form + zod | latest | forms + validation |
| @octokit/rest | latest | GitHub API |
| lucide-react | latest | icons |
| next/font | built-in | Syne + JetBrains Mono |
| Syne | Google Font | display/UI font (bold, modern) |
| JetBrains Mono | Google Font | code font |

---

## 🎨 DESIGN SYSTEM

### Theme Identity
```
Style:      Glassmorphism + colorful per-course accents
Background: Deep dark (varies per theme)
Glass:      backdrop-blur + bg opacity + colored border
Themes:     10 themes switchable via data-theme on <html>
Font UI:    Syne (bold, geometric, modern)
Font Code:  JetBrains Mono
```

### 10 Available Themes (switchable at runtime, persisted in localStorage)

| # | Theme ID | Key Color | Vibe |
|---|---|---|---|
| 1 | `midnight-aurora` | `#06b6d4` cyan | Default — deep navy + aurora |
| 2 | `obsidian-flame` | `#f97316` orange | Pure black + fire |
| 3 | `emerald-depths` | `#34d399` green | Dark teal + mint |
| 4 | `violet-cosmos` | `#a78bfa` purple | Deep purple + galaxy |
| 5 | `rose-gold-noir` | `#fb7185` pink | Dark charcoal + rose gold |
| 6 | `arctic-steel` | `#7dd3fc` ice blue | Steel grey + sharp ice |
| 7 | `golden-hour` | `#fbbf24` gold | Deep amber + warm gold |
| 8 | `matrix-green` | `#00ff41` toxic green | Terminal black + hacker |
| 9 | `neon-tokyo` | `#ec4899` hot pink | Dark + cyberpunk neon |
| 10 | `deep-ocean` | `#0ea5e9` ocean blue | Navy + bioluminescent |

### CSS Variable System (all themes expose these vars)
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

### Glass Card Pattern
```tsx
style={{
  background: 'var(--glass-bg)',
  backdropFilter: 'blur(var(--glass-blur))',
  border: '1px solid var(--glass-border)',
  boxShadow: 'var(--glass-shadow)',
}}
// Hover: use onMouseEnter/Leave to apply --glass-bg-hover + course color-mix border
```

### Utility Classes (globals.css)
```
.glass / .glass-strong / .glass:hover
.text-gradient (accent-1 → accent-2)
.glow-accent
.animate-float / .animate-pulse-glow / .animate-fade-in-up / .animate-scale-in
.stagger-1 through .stagger-8
```

---

## 📁 GITHUB CONTENT REPO STRUCTURE

```
java-fullstack-journey/
├── WebTech/ (HTML/ CSS/ JS/)
│   └── each: Notes/ Snippets/ Projects/Beginner|Intermediate|Pro/
├── SQL/ Java/ AdvancedJava/ Hibernate/ SpringBoot/ ReactJS/ Python/
│   └── each: Notes/ Snippets/ Projects/Beginner|Intermediate|Pro/
└── meta.json
```

Each project folder has: `README.md` + source files

---

## 🗺️ APPLICATION FILE STATUS

```
src/app/globals.css              ✅ 10 themes, glass, animations
src/app/layout.tsx               ✅ Syne + JetBrains Mono, Toaster
src/app/page.tsx                 ✅ redirect to /courses
src/app/error.tsx                ✅
src/app/not-found.tsx            ✅
src/app/loading.tsx              ✅
src/app/courses/page.tsx         ✅ hero + stats + CourseGrid
src/app/courses/loading.tsx      ✅
src/app/courses/[course]/page.tsx        ⬜ Phase 1 next
src/app/courses/[course]/loading.tsx     ✅
src/app/courses/[course]/[section]/page.tsx  ⬜ Phase 1
src/app/viewer/page.tsx          ⬜ Phase 2
src/app/api/courses/route.ts     ⬜ Phase 1 (needs GitHub token)
src/app/api/courses/[course]/route.ts  ⬜ Phase 1
src/app/api/file/route.ts        ⬜ Phase 1
src/app/api/execute/route.ts     ⬜ Phase 3

src/components/layout/Navbar.tsx         ✅ sticky glass, 10-theme switcher, mobile
src/components/layout/PageWrapper.tsx    ✅
src/components/layout/SectionHeader.tsx  ⬜ Phase 1
src/components/layout/GridLayout.tsx     ⬜ Phase 1
src/components/courses/CourseCard.tsx    ✅ glass, per-course color, icon, stats
src/components/courses/CourseGrid.tsx    ✅ responsive 1→2→3→4 col
src/components/courses/CourseTabs.tsx    ⬜ Phase 1
src/components/projects/ProjectCard.tsx  ⬜ Phase 1
src/components/projects/ProjectGrid.tsx  ⬜ Phase 1
src/components/projects/DifficultyBadge.tsx ⬜ Phase 1
src/components/shared/Breadcrumb.tsx     ⬜ Phase 1
src/components/shared/Skeleton.tsx       ⬜ Phase 1
src/components/shared/CopyButton.tsx     ⬜ Phase 2
src/components/shared/EmptyState.tsx     ✅
src/components/shared/ErrorState.tsx     ✅
src/components/shared/LanguageBadge.tsx  ✅
src/components/viewer/*                  ⬜ Phase 2

src/hooks/useGitHub.ts           ⬜ Phase 1
src/hooks/useCodeExecution.ts    ✅
src/hooks/useCopyToClipboard.ts  ✅

src/lib/env.ts / github.ts / judge0.ts / language.ts  ✅
src/types/*.types.ts             ✅ all done
src/constants/COURSES.ts / LANGUAGES.ts / ROUTES.ts   ✅
```

---

## 📍 WHERE TO PLACE OUTPUT FILES (this session)

| Output File | Copy to |
|---|---|
| `globals.css` | `src/app/globals.css` — replace entire file |
| `layout.tsx` | `src/app/layout.tsx` — replace |
| `page.tsx` | `src/app/page.tsx` — replace |
| `Navbar.tsx` | `src/components/layout/Navbar.tsx` — replace |
| `CourseCard.tsx` | `src/components/courses/CourseCard.tsx` — new file |
| `CourseGrid.tsx` | `src/components/courses/CourseGrid.tsx` — new file |
| `courses-page.tsx` | `src/app/courses/page.tsx` — replace |
| `PROJECT_MEMORY.md` | project root — replace |

---

## 🚀 BUILD PHASES

### Phase 1 — Foundation UI ✅🟡
```
[✅] globals.css — 10 themes, glass system, animations
[✅] layout.tsx — fonts, Toaster, metadata
[✅] page.tsx — redirect to /courses
[✅] Navbar.tsx — glass nav, 10-theme switcher, mobile menu
[✅] CourseCard.tsx — glass card, per-course color, hover glow
[✅] CourseGrid.tsx — responsive grid
[✅] courses/page.tsx — hero + stats + grid (static data)
[ ] CourseTabs.tsx — Notes/Snippets/Projects tabs
[ ] courses/[course]/page.tsx — course detail
[ ] ProjectCard.tsx / ProjectGrid.tsx / DifficultyBadge.tsx
[ ] Breadcrumb.tsx / Skeleton.tsx
[ ] Connect GitHub API (after token setup)
```

### Phase 2 — Code Viewer ⬜
### Phase 3 — Live Previews ⬜
### Phase 4 — Polish & Deploy ⬜

---

## 📝 DECISIONS LOG

| # | Decision | Reason |
|---|---|---|
| 001 | Next.js 15 App Router | Modern, serverless |
| 002 | GitHub as content source | Zero-database, push-to-update |
| 003 | Judge0 for execution | Serverless, 60+ languages |
| 004 | Sonner over shadcn toast | shadcn deprecated own toast |
| 005 | tw-animate-css | tailwindcss-animate deprecated 2025 |
| 006 | motion/react import | framer-motion legacy name |
| 007 | Radix Nova (shadcn) | New York unavailable in this version |
| 008 | Syne font | Bold/geometric, avoids generic Inter/Roboto |
| 009 | 10 CSS-var themes on data-theme | No JS theming lib, pure CSS vars |
| 010 | color-mix() for hover effects | Native CSS, zero dependencies |
| 011 | Static COURSES data first | GitHub token not needed for UI dev |
| 012 | Beginner / Intermediate / Pro tiers | Clear, professional naming |

---

## ⚠️ KNOWN GOTCHAS

```
1. Monaco & sql.js → always dynamic import with ssr:false
2. GitHub API      → needs GITHUB_TOKEN in .env.local (not yet created)
3. Next.js 15      → params is a Promise, always await it
4. Tailwind v4     → no tailwind.config.js, all in @theme block
5. Radix Nova      → was used instead of New York style
6. color-mix()     → modern browsers only (fine for dev portfolio)
7. Theme persist   → localStorage key: 'devfolio-theme'
8. React 19        → no forwardRef, ref is a regular prop
9. Syne font       → loaded via next/font/google as --font-sans
10. Navbar         → adds <div className="h-16" /> spacer at bottom
```

---

## 📊 STATUS

```
Phase 1  🟡 In Progress  — 7 / 15 tasks done
Phase 2  ⬜ Not Started
Phase 3  ⬜ Not Started
Phase 4  ⬜ Not Started
Overall: ~25% complete
```