# 🚀 LOCAL SETUP INSTRUCTIONS — imamuddin-devfolio
> Follow every step in order. Do NOT skip any step.
> Run all commands one at a time. Read the output before moving to the next.

---

## ✅ PREREQUISITES — Install These First

### 1. Check Node.js version
```bash
node -v
```
> ✅ Must be **v20.x or higher** (v22 recommended)
> ❌ If lower than v20 → go to https://nodejs.org → download LTS → install → restart terminal

### 2. Check npm version
```bash
npm -v
```
> ✅ Must be **v10.x or higher**
> Upgrade if needed:
```bash
npm install -g npm@latest
```

### 3. Check Git
```bash
git --version
```
> ✅ Must show a version like `git version 2.x.x`
> ❌ If not found → go to https://git-scm.com → install → restart terminal

### 4. Check VS Code (recommended editor)
> Download from https://code.visualstudio.com if not installed

---

## 📦 STEP 1 — Create the Next.js Project

Open your terminal and navigate to where you want the project folder:
```bash
cd Desktop
# or wherever you want the project
```

Run the create command (copy the entire block exactly):
```bash
npx create-next-app@latest imamuddin-devfolio \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --turbopack
```

### When prompted, answer exactly like this:
```
✔ Would you like to use TypeScript?          → Yes
✔ Would you like to use ESLint?              → Yes
✔ Would you like to use Tailwind CSS?        → Yes
✔ Would you like your code inside a src/ directory? → Yes
✔ Would you like to use App Router?          → Yes
✔ Would you like to use Turbopack?           → Yes
✔ Would you like to customize the import alias (@/* by default)? → No
```

> ⏳ This will take 1-2 minutes. Wait until you see "Success!"

---

## 📂 STEP 2 — Open the Project

```bash
cd imamuddin-devfolio
code .
```
> This opens the project in VS Code.

---

## 🔧 STEP 3 — Install All Required Packages

Run each block one at a time in the terminal inside VS Code (`Ctrl + `` ` ``):

### Core packages:
```bash
npm install motion @monaco-editor/react sonner \
  react-hook-form @hookform/resolvers zod \
  @octokit/rest lucide-react \
  sql.js tw-animate-css \
  --legacy-peer-deps
```

### Type definitions:
```bash
npm install -D @types/sql.js --legacy-peer-deps
```

> ⚠️ Always use `--legacy-peer-deps` because React 19 has peer dependency conflicts with some packages.

---

## 🎨 STEP 4 — Initialize shadcn/ui

```bash
npx shadcn@latest init
```

### When prompted, answer exactly like this:
```
✔ Which style would you like to use?        → New York
✔ Which color would you like to use?        → Neutral
✔ Would you like to use CSS variables?      → Yes
✔ How would you like to proceed?            → Use --legacy-peer-deps
```

---

## 🧩 STEP 5 — Add All shadcn/ui Components

Run this single command to add ALL components at once:
```bash
npx shadcn@latest add \
  button input textarea label badge \
  tooltip dialog drawer \
  tabs breadcrumb skeleton \
  alert separator scroll-area \
  sonner select \
  --legacy-peer-deps
```

> ⏳ Wait for all components to be added. You'll see them appear in `src/components/ui/`

---

## ⚙️ STEP 6 — Update tsconfig.json for Strict Mode

Open `tsconfig.json` and replace its contents with:
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

---

## 📝 STEP 7 — Create .env.local File

Create a file named `.env.local` in the project root (NOT inside src/):
```bash
# In terminal:
touch .env.local
```

Paste this inside `.env.local`:
```bash
# GitHub API
GITHUB_TOKEN=your_github_personal_access_token_here
GITHUB_OWNER=your_github_username_here
GITHUB_REPO=java-fullstack-journey

# Judge0 API (get from rapidapi.com → search Judge0)
JUDGE0_API_KEY=your_judge0_api_key_here
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> 🔑 How to get GITHUB_TOKEN:
> 1. Go to github.com → Settings → Developer settings
> 2. Personal access tokens → Tokens (classic) → Generate new token
> 3. Select scope: `repo` (read access is enough)
> 4. Copy the token → paste in .env.local

---

## 🏗️ STEP 8 — Run the Scaffold Script

After downloading `scaffold.js` (provided separately):
```bash
node scaffold.js
```
> This creates the entire project folder structure automatically.
> ✅ You'll see "✅ Scaffold complete!" when done.

---

## ✅ STEP 9 — Verify the Setup

Run the dev server:
```bash
npm run dev
```

Open your browser: http://localhost:3000

> ✅ You should see the Next.js default page
> ✅ No red errors in terminal
> ✅ No TypeScript errors

---

## 🔍 STEP 10 — VS Code Extensions (Install These)

Open VS Code → Extensions (`Ctrl+Shift+X`) → install:

| Extension | Why |
|---|---|
| **ESLint** | Live linting |
| **Prettier** | Code formatting |
| **Tailwind CSS IntelliSense** | Tailwind autocomplete |
| **TypeScript Error Lens** | Inline TS errors |
| **Path Intellisense** | Auto-complete imports |
| **GitLens** | Git history |

---

## ⚠️ COMMON ERRORS & FIXES

### Error: `npm ERR! peer dep conflict`
```bash
# Solution: always add --legacy-peer-deps
npm install <package> --legacy-peer-deps
```

### Error: `Module not found: Can't resolve '@/...'`
```bash
# Check tsconfig.json paths — must have:
"paths": { "@/*": ["./src/*"] }
```

### Error: `hydration mismatch`
```bash
# Add suppressHydrationWarning to <html> tag in layout.tsx
<html lang="en" suppressHydrationWarning>
```

### Error: `window is not defined`
```bash
# You're importing Monaco or sql.js without dynamic import
# Always use:
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });
```

### Error: `GITHUB_TOKEN is not defined`
```bash
# Check .env.local exists at ROOT level (not inside src/)
# Restart dev server after editing .env.local: Ctrl+C → npm run dev
```

---

## 📋 QUICK COMMAND REFERENCE

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
npm run lint         # Run ESLint
npx tsc --noEmit     # TypeScript type check (no output, just errors)
```

> 💡 Run `npx tsc --noEmit` frequently during development to catch type errors early.

---

## ✅ SETUP COMPLETE CHECKLIST

```
□ Node.js v20+ installed
□ Project created with create-next-app@latest
□ All npm packages installed
□ shadcn/ui initialized (new-york style)
□ shadcn components added
□ tsconfig.json updated to strict mode
□ .env.local created with all keys
□ Scaffold script run successfully
□ npm run dev works without errors
□ VS Code extensions installed
```

---

*Read AI_INSTRUCTIONS.md and PROJECT_MEMORY.md before writing any code.*