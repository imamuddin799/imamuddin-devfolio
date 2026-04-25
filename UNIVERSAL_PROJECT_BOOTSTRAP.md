# 🧱 UNIVERSAL PROJECT BOOTSTRAP GUIDE
> Author: Imamuddin
> Version: 1.0
> Purpose: Follow this file to bootstrap ANY new Next.js project from scratch.
> This file is self-contained. You never need to ask an AI how to start a project again.
> Copy this file into every new project and update the project-specific sections.

---

## 📌 WHAT THIS FILE COVERS

1. Prerequisites checklist
2. Tech stack (locked, modern, 2025+)
3. Project creation steps (exact commands)
4. Folder & file structure to always follow
5. Files to always create before coding (AI Instructions, Project Memory)
6. Design system rules
7. Coding rules & dos/don'ts
8. How to generate a project structure snapshot
9. How to work with AI on any project
10. Quick command reference

---

## ✅ SECTION 1 — PREREQUISITES

Before starting any project, verify these are installed:

```bash
node -v        # Must be v20 or higher (v22 recommended)
npm -v         # Must be v10 or higher
git --version  # Any recent version
```

Fix if needed:
```bash
# Upgrade npm
npm install -g npm@latest

# Node.js — download from https://nodejs.org (LTS version)
```

VS Code Extensions to always have installed:
```
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Error Lens
- Path Intellisense
- GitLens
- Error Lens
```

---

## 🛠️ SECTION 2 — LOCKED TECH STACK (2025+)

> This stack is modern, battle-tested, and works together without conflicts.
> Do NOT swap packages without updating AI_INSTRUCTIONS.md.

| Layer | Package | Version | Notes |
|---|---|---|---|
| Framework | next | 15.x | App Router only |
| Language | typescript | 5.x | Strict mode always |
| UI Runtime | react + react-dom | 19.x | No forwardRef |
| Styling | tailwindcss | 4.x | CSS-first, no config file |
| Animations | tw-animate-css | latest | Replaces tailwindcss-animate |
| Components | shadcn/ui | latest | Radix or New York style |
| Animation lib | motion | latest | Import from motion/react |
| Code Editor | @monaco-editor/react | 4.7.0 | Always ssr:false |
| Toasts | sonner | latest | shadcn deprecated its own toast |
| Forms | react-hook-form + zod | latest | Always pair these two |
| Icons | lucide-react | latest | shadcn's recommended set |
| Fonts | next/font | built-in | Never use CDN font links |
| HTTP (GitHub) | @octokit/rest | latest | For GitHub API projects |
| Code execution | Judge0 API | v1 | For code runner projects |
| SQL in browser | sql.js | latest | Always dynamic import |
| Deployment | Vercel | — | Native Next.js support |

### ❌ Never Use These (Outdated/Replaced)
```
tailwindcss-animate     → replaced by tw-animate-css
shadcn toast component  → replaced by sonner
framer-motion import    → use motion/react instead
forwardRef              → removed in React 19
tailwind.config.js      → replaced by @theme in globals.css
getServerSideProps      → replaced by Server Components
/pages directory        → replaced by /app (App Router)
<img> tag               → replaced by next/image
<a href> internal links → replaced by next/link
any TypeScript type     → always type everything properly
```

---

## 🚀 SECTION 3 — PROJECT CREATION (EXACT STEPS)

### Step 1 — Create Next.js App
```bash
npx create-next-app@latest YOUR-PROJECT-NAME \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --turbopack
```

Prompts — always answer:
```
TypeScript          → Yes
ESLint              → Yes
Tailwind CSS        → Yes
src/ directory      → Yes
App Router          → Yes
Turbopack           → Yes
Customize alias     → No
```

### Step 2 — Enter Project & Open in VS Code
```bash
cd YOUR-PROJECT-NAME
code .
```

### Step 3 — Install Core Packages
```bash
npm install motion @monaco-editor/react sonner \
  react-hook-form @hookform/resolvers zod \
  lucide-react tw-animate-css \
  --legacy-peer-deps
```

> Always use --legacy-peer-deps because React 19 has peer dependency conflicts.

### Step 4 — Install Type Definitions (if needed per project)
```bash
npm install -D @types/sql.js --legacy-peer-deps   # only for SQL projects
```

### Step 5 — Initialize shadcn/ui
```bash
npx shadcn@latest init
```

Prompts:
```
Style           → New York (or Radix Nova if New York not available)
Base color      → Neutral
CSS variables   → Yes
Peer deps       → Use --legacy-peer-deps
```

### Step 6 — Add All shadcn Components at Once
```bash
npx shadcn@latest add \
  button input textarea label badge \
  tooltip dialog drawer tabs \
  breadcrumb skeleton alert \
  separator scroll-area sonner select \
  --legacy-peer-deps
```

### Step 7 — Update tsconfig.json (Strict Mode)
Replace tsconfig.json content with:
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Step 8 — Create .env.local
```bash
touch .env.local
```

Always include at minimum:
```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Add project-specific secrets below (never NEXT_PUBLIC_ for secrets)
```

### Step 9 — Run the Scaffold Script
```bash
node scaffold.js
```
> See Section 8 for how to generate scaffold.js for any project.

### Step 10 — Verify Setup
```bash
npm run dev          # Should open localhost:3000 with no errors
npx tsc --noEmit     # Should show zero TypeScript errors
npm run lint         # Should show zero ESLint errors
```

---

## 📁 SECTION 4 — FOLDER STRUCTURE (Always Follow This)

```
YOUR-PROJECT-NAME/
│
├── src/
│   ├── app/                          ← Next.js App Router (ONLY use this, never /pages)
│   │   ├── globals.css               ← ALL styles here. @theme tokens. tw-animate-css import.
│   │   ├── layout.tsx                ← Root layout. Fonts. Toaster. Metadata.
│   │   ├── page.tsx                  ← Home page or redirect
│   │   ├── error.tsx                 ← Global error boundary (always create)
│   │   ├── not-found.tsx             ← 404 page (always create)
│   │   ├── loading.tsx               ← Global loading state (always create)
│   │   │
│   │   ├── [your-pages]/             ← Add pages here as needed
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   │
│   │   └── api/                      ← All backend API routes here
│   │       └── [route-name]/
│   │           └── route.ts          ← Always named route.ts
│   │
│   ├── components/
│   │   ├── ui/                       ← shadcn/ui auto-generated (never edit manually)
│   │   ├── layout/                   ← Navbar, Footer, PageWrapper, SectionHeader
│   │   ├── shared/                   ← Reusable: EmptyState, ErrorState, Breadcrumb
│   │   └── [feature]/                ← Feature-specific components grouped by domain
│   │
│   ├── hooks/                        ← All custom React hooks (use*.ts)
│   ├── lib/                          ← Utilities, API clients, helpers
│   ├── types/                        ← All TypeScript interfaces/types (*.types.ts)
│   ├── constants/                    ← App-wide constants (UPPER_SNAKE_CASE.ts)
│   └── data/                         ← Static/fallback data files
│
├── public/                           ← Static assets (images, icons, fonts)
│
├── .env.example                      ← All env var keys with empty values (commit this)
├── .env.local                        ← Actual values (NEVER commit this)
├── .gitignore
├── next.config.ts
├── tsconfig.json
├── package.json
│
├── AI_INSTRUCTIONS.md                ← ALWAYS CREATE. AI rules for this project.
├── PROJECT_MEMORY.md                 ← ALWAYS CREATE. Living project state document.
└── scaffold.js                       ← ALWAYS CREATE. Structure generator script.
```

### Naming Conventions — Never Deviate
```
Components      → PascalCase.tsx           e.g. CourseCard.tsx
Pages           → lowercase/page.tsx       e.g. courses/page.tsx
API Routes      → route.ts                 always route.ts, never anything else
Hooks           → camelCase.ts             e.g. useGitHub.ts
Utilities       → camelCase.ts             e.g. formatDate.ts
Types           → PascalCase.types.ts      e.g. Course.types.ts
Constants       → UPPER_SNAKE_CASE.ts      e.g. ROUTES.ts
```

---

## 📋 SECTION 5 — FILES TO ALWAYS CREATE BEFORE CODING

These 3 files must exist in EVERY project before writing a single component:

### File 1: AI_INSTRUCTIONS.md
Contains rules that every AI must follow for this project.
Must include:
```
- Locked tech stack (allowed vs banned)
- Version-specific syntax rules (Next.js 15, React 19, Tailwind v4)
- File/folder naming rules
- TypeScript strictness requirements
- Linting checklist
- Component rules (Server vs Client)
- Data fetching rules
- Error handling patterns
- Performance rules (dynamic imports, memoization)
- Accessibility rules
- Security rules (env vars, API keys)
- What AI must NEVER do (list of 20+ banned actions)
```

### File 2: PROJECT_MEMORY.md
The living document that tracks everything about the project.
Must include:
```
- Project overview (name, type, purpose, repos, deployment)
- Locked tech stack with versions
- Design system (colors, typography, spacing, component patterns)
- UI component inventory with status (⬜ / 🟡 / ✅)
- Folder structure (full tree)
- All TypeScript types/interfaces
- All API routes with method and description
- Environment variables required
- Page map (what each page shows)
- Build phases with task checkboxes
- Decisions log (why each architectural choice was made)
- Known gotchas and warnings
- Current build status
```

### File 3: scaffold.js
Node.js script that creates all folders and files automatically.
Rules:
```
- Run with: node scaffold.js
- Creates all src/ folders and placeholder files
- Never overwrites existing files
- Never touches: node_modules, .next, dist, build, .git
- Prints colored output showing what was created
- Validates it's running in a Next.js project root
- Every created file has correct TypeScript boilerplate (not empty)
- Adds // TODO Phase X: comments to guide development
```

---

## 🎨 SECTION 6 — DESIGN SYSTEM RULES

### Always Define These Before Building UI
```
1. Color tokens       → in globals.css @theme block (OKLCH format)
2. Typography scale   → font families, sizes, weights
3. Spacing scale      → consistent padding/margin/gap values
4. Border radius      → consistent rounding per element type
5. Glass effect       → backdrop-blur + bg opacity + border opacity
6. Animation tokens   → duration, easing curves
7. Course/feature colors → one accent color per major section
```

### globals.css Always Starts With:
```css
@import "tailwindcss";
@import "tw-animate-css";

@theme {
  /* Define ALL custom tokens here */
  --font-sans: 'Your Font', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  --color-background: oklch(...);
  --color-surface: oklch(...);
  --color-border: oklch(1 0 0 / 0.08);
  --color-text-primary: oklch(0.95 0 0);
  --color-text-secondary: oklch(0.65 0 0);

  /* Feature/section accent colors */
  --color-feature-1: oklch(...);
}
```

### Glass Card Pattern (use consistently across project):
```tsx
// Glass card
className="backdrop-blur-md bg-white/5 border border-white/8 rounded-2xl shadow-2xl"

// Glass card with hover
className="backdrop-blur-md bg-white/5 border border-white/8 rounded-2xl shadow-2xl
           hover:bg-white/8 hover:border-white/15 transition-all duration-300"

// Glass input
className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg
           focus:border-white/25 focus:outline-none"
```

### Color Format Rule
```
✅ Always use OKLCH:   oklch(0.65 0.20 255)
❌ Never use HEX:      #3b82f6
❌ Never use HSL:      hsl(217, 91%, 60%)
❌ Never use RGB:      rgb(59, 130, 246)
```

---

## 📐 SECTION 7 — CODING RULES (ALWAYS FOLLOW)

### Next.js 15 — App Router Patterns
```typescript
// ✅ Server Component (default — no 'use client')
export default async function Page() {
  const data = await fetchData(); // direct async call
  return <div>{data}</div>;
}

// ✅ Client Component (only when needed)
'use client';
export default function Component() {
  const [state, setState] = useState<string>('');
  return <div>{state}</div>;
}

// ✅ API Route
export async function GET(request: Request): Promise<Response> {
  return Response.json({ data: 'value' });
}

// ✅ Dynamic params in Next.js 15 (params is a Promise)
interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: PageProps) {
  const { id } = await params; // must await params
}
```

### React 19 — Key Changes
```typescript
// ✅ Ref as prop (React 19)
function Input({ ref, ...props }: React.ComponentProps<'input'>) {
  return <input ref={ref} {...props} />;
}

// ❌ forwardRef — REMOVED in React 19, never use
const Input = React.forwardRef((props, ref) => ...); // BANNED
```

### TypeScript — Always Strict
```typescript
// ✅ Type everything
const [items, setItems] = useState<Item[]>([]);
async function fetch(id: string): Promise<Item> { ... }
const data = response.json() as ApiResponse<Item>;

// ❌ Never use any
const data: any = {};        // BANNED
function fn(x) { ... }      // BANNED — implicit any
```

### Imports — Always Use These
```typescript
// ✅ Correct imports
import Image from 'next/image';          // never <img>
import Link from 'next/link';            // never <a href> for internal
import { motion } from 'motion/react';   // not framer-motion
import { toast } from 'sonner';          // not shadcn toast
import dynamic from 'next/dynamic';      // for SSR-incompatible libs

// ✅ Monaco (always dynamic, always ssr:false)
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <Skeleton />,
});
```

### Error Handling — Always
```typescript
// ✅ Every async function wrapped
async function fetchData(): Promise<Data> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json() as Data;
  } catch (error) {
    throw new Error(`fetchData failed: ${error instanceof Error ? error.message : 'Unknown'}`);
  }
}

// ✅ API routes always return proper errors
export async function GET(): Promise<Response> {
  try {
    const data = await getData();
    return Response.json({ data });
  } catch (error) {
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

### Environment Variables — Security Rules
```
✅ Server secrets      → VARIABLE_NAME (no prefix)
✅ Client-safe values  → NEXT_PUBLIC_VARIABLE_NAME
✅ Always validate     → throw error if missing at startup
✅ Always document     → add to .env.example (empty value)
❌ Never expose secrets to client components
❌ Never commit .env.local
❌ Never hardcode API keys
```

### Performance — Always Do These
```typescript
// Dynamic import for heavy/browser-only libs
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false,
  loading: () => <Skeleton />,
});

// Memoize expensive calculations
const result = useMemo(() => expensiveCalc(data), [data]);

// Stable callbacks
const handleClick = useCallback(() => { doThing(); }, [dependency]);

// next/image for all images (never <img>)
<Image src={url} alt="description" width={400} height={300} />
```

### Linting Checklist (Run Through Before Every PR/Commit)
```
□ No 'any' types
□ No unused imports or variables
□ All useEffect dependencies complete
□ All list items have non-index keys
□ All images use next/image
□ All internal links use next/link
□ All async functions have try/catch
□ No console.log left in code
□ All event handlers typed correctly
□ No inline styles (except dynamic CSS vars)
□ All API routes return typed Response
□ All env vars validated at startup
□ No hardcoded colors or magic numbers
□ run: npx tsc --noEmit   → zero errors
□ run: npm run lint        → zero errors
```

---

## 🔄 SECTION 8 — HOW TO GENERATE A PROJECT STRUCTURE SNAPSHOT

After scaffolding, generate a text snapshot of your project tree anytime.
This snapshot is used to give AI full context of your current structure.

### Install tree tool (one time):
```bash
# Windows (via npm — works everywhere)
npm install -g tree-cli

# Mac
brew install tree

# Linux
sudo apt install tree
```

### Generate snapshot (run from project root):
```bash
# Windows (tree-cli)
tree --ignore "node_modules,.next,dist,build,.git,*.log" -l 5 > PROJECT_TREE.txt

# Mac/Linux
tree -I "node_modules|.next|dist|build|.git|*.log" -L 5 > PROJECT_TREE.txt
```

### What to do with PROJECT_TREE.txt:
```
1. Paste it into PROJECT_MEMORY.md under "Current File Structure" section
2. Paste it to any AI at the start of a session: "Here is my current project structure: [paste]"
3. Regenerate after every major phase completion
4. Commit it alongside AI_INSTRUCTIONS.md and PROJECT_MEMORY.md
```

### Quick snapshot without installing anything (Windows PowerShell):
```powershell
Get-ChildItem -Recurse -Exclude "node_modules","*.next","dist","build" |
  Where-Object { $_.FullName -notmatch "node_modules|\.next|dist|build|\.git" } |
  Select-Object FullName |
  Out-File PROJECT_TREE.txt
```

---

## 🤖 SECTION 9 — HOW TO WORK WITH AI ON ANY PROJECT

### Every AI Session Must Start With:
```
"Before writing any code, read these files:
1. AI_INSTRUCTIONS.md — coding rules for this project
2. PROJECT_MEMORY.md — current project state
3. [paste PROJECT_TREE.txt if structure changed recently]

Project: [name]
Task: [what you want to build today]
Current phase: [Phase 1 / 2 / 3 / 4]"
```

### What to Ask AI to Do (examples):
```
✅ "Build the CourseCard component as described in PROJECT_MEMORY.md"
✅ "Implement Phase 1 API routes following AI_INSTRUCTIONS.md patterns"
✅ "Review this component for TypeScript errors and linting issues"
✅ "Update PROJECT_MEMORY.md to reflect what we just built"
✅ "Write the scaffold.js for my new project [describe structure]"
```

### What to Never Ask AI to Do:
```
❌ "Just use any type here to fix the error" → reject this
❌ "Install [random package]" → check AI_INSTRUCTIONS.md first
❌ "Use getServerSideProps" → it's banned, use Server Components
❌ "Use the pages directory" → banned, App Router only
❌ "Skip error handling for now" → always handle errors
```

### After AI Writes Code — Always:
```
1. Run: npx tsc --noEmit          → must be zero errors
2. Run: npm run lint               → must be zero errors
3. Check AI_INSTRUCTIONS.md rules → manually verify
4. Update PROJECT_MEMORY.md       → mark tasks complete
5. Commit working code            → small, frequent commits
```

### If AI Makes a Mistake:
```
"You used [wrong pattern]. According to AI_INSTRUCTIONS.md, 
we must use [correct pattern]. Please fix this."
```

### Red Flags — Reject AI Code That:
```
❌ Uses 'any' TypeScript type
❌ Uses forwardRef
❌ Uses framer-motion (not motion/react)
❌ Uses tailwindcss-animate (not tw-animate-css)
❌ Uses shadcn toast (not sonner)
❌ Uses <img> instead of next/image
❌ Uses <a href> for internal links
❌ Uses /pages directory
❌ Uses getServerSideProps
❌ Has no error handling in async functions
❌ Hardcodes colors or API keys
❌ Creates tailwind.config.js
❌ Imports from framer-motion directly
```

---

## 📋 SECTION 10 — QUICK COMMAND REFERENCE

```bash
# Development
npm run dev                    # Start dev server (localhost:3000)
npm run build                  # Production build
npm run start                  # Start production server
npm run lint                   # Run ESLint
npx tsc --noEmit               # TypeScript check (no output, errors only)

# shadcn
npx shadcn@latest add [name]   # Add a component
npx shadcn@latest init         # Initialize (first time only)

# Project structure snapshot
tree --ignore "node_modules,.next,dist,build,.git" -l 5 > PROJECT_TREE.txt

# Run scaffold
node scaffold.js

# Git workflow
git add .
git commit -m "feat: [what you built]"
git push origin main

# Check for outdated packages
npx npm-check-updates          # Shows what can be updated
```

---

## 🗂️ SECTION 11 — NEW PROJECT CHECKLIST

Use this every time you start a new project:

```
SETUP
□ Node.js v20+ confirmed
□ Project created with create-next-app@latest (all flags)
□ Core packages installed (--legacy-peer-deps)
□ shadcn/ui initialized (New York or Radix Nova style)
□ shadcn components added
□ tsconfig.json updated to strict mode
□ .env.local created
□ .env.example created and committed

FOUNDATION FILES (before any coding)
□ AI_INSTRUCTIONS.md created and filled out
□ PROJECT_MEMORY.md created and filled out
□ scaffold.js created and run successfully

DESIGN SYSTEM (before any UI)
□ globals.css @theme tokens defined
□ Color palette defined (OKLCH)
□ Typography defined
□ Spacing/layout rules defined
□ Glass effect classes documented in PROJECT_MEMORY.md
□ All UI component variants listed in PROJECT_MEMORY.md

VERIFICATION
□ npm run dev → no errors
□ npx tsc --noEmit → zero errors
□ npm run lint → zero errors
□ PROJECT_TREE.txt generated and added to PROJECT_MEMORY.md

GITHUB
□ Repository created
□ .gitignore includes: .env.local, .next, node_modules, dist, build
□ Initial commit pushed
□ README.md created
```

---

## 📝 SECTION 12 — PROJECT-SPECIFIC CUSTOMIZATION

When starting a new project, fill in these fields in AI_INSTRUCTIONS.md and PROJECT_MEMORY.md:

```
Project Name:         [YOUR PROJECT NAME]
Project Type:         [Portfolio / SaaS / Tool / Dashboard / etc.]
GitHub Repo:          [username/repo-name]
Deployment Target:    [Vercel / Netlify / Railway / etc.]
Primary Color:        [oklch value]
Font Choice:          [Geist / Inter / your choice]
External APIs:        [list any 3rd party APIs used]
Database:             [None / Supabase / PlanetScale / etc.]
Auth:                 [None / NextAuth / Clerk / etc.]
Special Packages:     [any project-specific npm packages]
Build Phases:         [list your phase 1, 2, 3...]
```

---

## ⚠️ SECTION 13 — CRITICAL WARNINGS (READ EVERY TIME)

```
1. ALWAYS --legacy-peer-deps when installing with React 19
   Some packages haven't updated peer deps yet.

2. ALWAYS ssr: false for Monaco Editor and sql.js
   These access window/document — SSR will crash.

3. NEVER put secrets in NEXT_PUBLIC_ variables
   Anything NEXT_PUBLIC_ is exposed to the browser.

4. ALWAYS await params in Next.js 15
   params is now a Promise — forgetting await = runtime error.

5. NEVER use tailwind.config.js in Tailwind v4
   All config goes in globals.css @theme block.

6. ALWAYS use OKLCH for colors in @theme
   Tailwind v4 uses OKLCH by default — HEX/HSL in @theme causes issues.

7. NEVER create /pages directory
   Mixing App Router and Pages Router breaks everything.

8. ALWAYS handle errors in async functions
   Unhandled promise rejections crash production builds.

9. ALWAYS run npx tsc --noEmit before committing
   TypeScript errors that pass lint can still crash production.

10. ALWAYS update PROJECT_MEMORY.md after each session
    This is how AI stays in sync with your project across sessions.
```

---

*This file is your personal project bible. Copy it to every new project.*
*Update the tech stack section when packages release major versions.*
*Last reviewed: 2025*