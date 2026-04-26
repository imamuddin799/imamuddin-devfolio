/*
  Execution runtime config.
  The route /api/execute maps language name → Judge0 CE language ID internally.
  The `piston` field name is kept for backwards compatibility with useCodeExecution
  and viewer/page.tsx — only the language string is used by the route.
*/

export interface PistonRuntime {
  language: string;
  version: string; // kept for API compat — route uses language name only
}

export interface LanguageConfig {
  monaco: string;
  piston: PistonRuntime | null; // null = not server-executable
  display: string;
  color: string | null;
  canRun: boolean;
  canPreview: boolean;
  previewType: 'iframe' | 'terminal' | 'sql' | 'none';
}

export const LANGUAGE_MAP: Record<string, LanguageConfig> = {
  html: {
    monaco: 'html', piston: null, display: 'HTML',
    color: '--color-html', canRun: false, canPreview: true, previewType: 'iframe',
  },
  css: {
    monaco: 'css', piston: null, display: 'CSS',
    color: '--color-css', canRun: false, canPreview: false, previewType: 'none',
  },
  javascript: {
    monaco: 'javascript',
    piston: { language: 'javascript', version: '18.15.0' },
    display: 'JavaScript',
    color: '--color-js', canRun: true, canPreview: true, previewType: 'terminal',
  },
  typescript: {
    monaco: 'typescript',
    piston: { language: 'typescript', version: '5.0.3' },
    display: 'TypeScript',
    color: '--color-js', canRun: true, canPreview: false, previewType: 'terminal',
  },
  java: {
    monaco: 'java',
    piston: { language: 'java', version: '15.0.2' },
    display: 'Java',
    color: '--color-java', canRun: true, canPreview: false, previewType: 'terminal',
  },
  python: {
    monaco: 'python',
    piston: { language: 'python', version: '3.10.0' },
    display: 'Python',
    color: '--color-python', canRun: true, canPreview: false, previewType: 'terminal',
  },
  sql: {
    monaco: 'sql', piston: null, display: 'SQL',
    color: '--color-sql', canRun: true, canPreview: false, previewType: 'sql',
  },
  markdown: {
    monaco: 'markdown', piston: null, display: 'Markdown',
    color: null, canRun: false, canPreview: false, previewType: 'none',
  },
  json: {
    monaco: 'json', piston: null, display: 'JSON',
    color: null, canRun: false, canPreview: false, previewType: 'none',
  },
  xml: {
    monaco: 'xml', piston: null, display: 'XML',
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