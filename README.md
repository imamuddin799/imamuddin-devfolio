# 🧑‍💻 imamuddin-devfolio

> A glassmorphism code showcase portfolio — browse every snippet, project and note from my Java Full Stack learning journey with live preview and code execution.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss)

---

## ✨ Features

- **10 Themes** — switch between Midnight Aurora, Obsidian Flame, Matrix Green and 7 more
- **Course Browser** — HTML, CSS, JS, SQL, Java, Advanced Java, Hibernate, Spring Boot, React, Python
- **3-Tier Projects** — Beginner 🌱 · Intermediate ⚡ · Pro 🔥
- **Monaco Editor** — VS Code–quality syntax highlighting for every file
- **Live Preview** — HTML/CSS/JS renders instantly in a sandboxed iframe
- **Code Execution** — Java and Python run via Judge0 CE, output in terminal panel
- **SQL Runner** — in-browser SQLite powered by sql.js, results in a table
- **Global Search** — `Cmd/Ctrl+K` searches filenames, paths and code content
- **Draggable Split** — resize code and preview panels freely on desktop
- **Mobile First** — full tab-based layout on small screens

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 + glassmorphism |
| Components | shadcn/ui (Radix Nova) |
| Animation | Motion (motion/react) |
| Code Editor | Monaco Editor |
| Execution | Judge0 CE |
| SQL | sql.js (WebAssembly) |
| Data Source | GitHub API via Octokit |
| Deployment | Vercel |

---

## 🚀 Getting Started

### 1. Clone & install
```bash
git clone https://github.com/YOUR_USERNAME/imamuddin-devfolio.git
cd imamuddin-devfolio
npm install --legacy-peer-deps
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```bash
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_OWNER=your_github_username
GITHUB_REPO=java-fullstack-journey
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Content Repository Structure

Your code files live in a **separate GitHub repo** (`java-fullstack-journey`):

```
java-fullstack-journey/
├── WebTech/
│   ├── HTML/ ├── CSS/ └── JS/
│   └── each: Notes/ Snippets/ Projects/Beginner|Intermediate|Pro/
├── SQL/ Java/ AdvancedJava/ Hibernate/ SpringBoot/ ReactJS/ Python/
│   └── each: Notes/ Snippets/ Projects/Beginner|Intermediate|Pro/
└── meta.json
```

Each project folder needs a `README.md`:
```markdown
# Project Title
## Description
## What I Learned
## Tech Used
## Difficulty
Beginner | Intermediate | Pro
```

---

## 🔑 Getting a GitHub Token

1. Go to [github.com](https://github.com) → **Settings**
2. **Developer settings** → **Personal access tokens** → **Tokens (classic)**
3. **Generate new token** → select scope: `repo` (read)
4. Copy the token → paste in `.env.local`

---

## 🎨 Themes

| Theme | Accent |
|---|---|
| Midnight Aurora (default) | Cyan `#06b6d4` |
| Obsidian Flame | Orange `#f97316` |
| Emerald Depths | Green `#34d399` |
| Violet Cosmos | Purple `#a78bfa` |
| Rose Gold Noir | Pink `#fb7185` |
| Arctic Steel | Ice Blue `#7dd3fc` |
| Golden Hour | Gold `#fbbf24` |
| Matrix Green | Toxic `#00ff41` |
| Neon Tokyo | Hot Pink `#ec4899` |
| Deep Ocean | Ocean `#0ea5e9` |

Switch themes using the 🎨 palette icon in the navbar. Your choice persists across sessions.

---

## 📦 Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Add environment variables in Vercel dashboard:
- `GITHUB_TOKEN`
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `NEXT_PUBLIC_APP_URL`

---

## 🤖 AI Development

This project was built with AI assistance. See:
- `AI_INSTRUCTIONS.md` — coding rules for AI agents
- `PROJECT_MEMORY.md` — living project state document
- `UNIVERSAL_PROJECT_BOOTSTRAP.md` — reusable bootstrap guide

---

## 📄 License

MIT © Imamuddin