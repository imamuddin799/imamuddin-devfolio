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
