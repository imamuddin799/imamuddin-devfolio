# 🔌 GITHUB CONNECT GUIDE
> Follow these steps to replace static mock data with live GitHub API data.
> Do this AFTER the app is working correctly with mock data.

---

## Step 1 — Create GitHub Token

1. github.com → Settings → Developer settings
2. Personal access tokens → Tokens (classic) → Generate new token
3. Name: `imamuddin-devfolio`
4. Expiration: No expiration (or 1 year)
5. Scope: ✅ `repo` (read access is enough)
6. Copy the token

---

## Step 2 — Add to .env.local

```bash
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
GITHUB_OWNER=your_github_username
GITHUB_REPO=java-fullstack-journey
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Restart dev server after editing:
```bash
# Ctrl+C to stop, then:
npm run dev
```

---

## Step 3 — Create Your Content Repo

On GitHub create a new repo: `java-fullstack-journey`

Push your code files following this structure:
```
java-fullstack-journey/
├── WebTech/
│   ├── HTML/
│   │   ├── Notes/          ← .md, .txt files
│   │   ├── Snippets/       ← .html files
│   │   └── Projects/
│   │       ├── Beginner/
│   │       │   └── MyProject/
│   │       │       ├── README.md
│   │       │       └── index.html
│   │       ├── Intermediate/
│   │       └── Pro/
│   ├── CSS/ (same structure)
│   └── JS/  (same structure)
├── SQL/
│   ├── Notes/
│   ├── Scripts/    ← .sql files
│   └── Projects/Beginner|Intermediate|Pro/
├── Java/
│   ├── Notes/
│   ├── Snippets/   ← .java files
│   └── Projects/Beginner|Intermediate|Pro/
├── AdvancedJava/ ├── Hibernate/ ├── SpringBoot/
├── ReactJS/      └── Python/
└── meta.json
```

---

## Step 4 — Test API Routes

With the server running, test in your browser:

```
http://localhost:3000/api/courses
→ Should return array of your top-level folders

http://localhost:3000/api/courses/java
→ Should return contents of Java/ folder

http://localhost:3000/api/file?path=Java/Snippets/HelloWorld.java
→ Should return raw file content
```

---

## Step 5 — Update courses/[course]/page.tsx

Replace the static mock import with the API hook.

Find this in your course detail page:
```typescript
// BEFORE (static)
import { COURSES } from '@/constants/COURSES';
```

Use the hook to fetch real contents:
```typescript
// AFTER (live)
import { useGitHubFiles } from '@/hooks/useGitHub';

// Inside component:
const { files, state } = useGitHubFiles(`/api/courses/${courseId}`);
```

---

## Step 6 — Update viewer/page.tsx

Replace MOCK_FILES with real file fetching:

```typescript
// BEFORE
import { MOCK_FILES } from '@/data/mockFiles';

// AFTER — fetch file content on demand
import { useGitHubFile } from '@/hooks/useGitHub';

// When a file is selected:
const { content, state } = useGitHubFile(selectedFilePath);
```

---

## Step 7 — Verify Everything Works

```bash
npx tsc --noEmit     # zero TypeScript errors
npm run lint         # zero ESLint errors
npm run build        # production build succeeds
```

Check these manually:
```
✅ /courses        → shows real course cards from your GitHub repo
✅ /courses/java   → shows tabs with real Notes/Snippets/Projects
✅ /viewer?path=Java/Snippets/HelloWorld.java → loads real file in Monaco
✅ Run button      → executes Java via Judge0 CE
✅ SQL files       → run in sql.js runner
✅ HTML files      → render in iframe preview
✅ Cmd+K search    → finds files from mock data (update to search API later)
```

---

## Step 8 — Deploy to Vercel

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Add environment variables in Vercel dashboard:
```
GITHUB_TOKEN      → your token
GITHUB_OWNER      → your username
GITHUB_REPO       → java-fullstack-journey
NEXT_PUBLIC_APP_URL → https://your-app.vercel.app
```

---

## ⚠️ Common Issues

### API returns 500 error
```
Check: GITHUB_TOKEN is set and not expired
Check: GITHUB_OWNER and GITHUB_REPO are correct
Check: The repo is public OR token has repo read scope
```

### Files not showing up
```
Check: Folder names match COURSES constant (path field)
  e.g. COURSES has path: 'WebTech' → your repo must have WebTech/ folder
```

### Rate limit hit (403)
```
GitHub allows 5000 requests/hour with token (plenty)
API routes use revalidate: 3600 (ISR caching) to minimize requests
```

### Build fails on Vercel
```
Add all env vars in Vercel dashboard before deploying
GITHUB_TOKEN must be set — env.ts throws if missing
```