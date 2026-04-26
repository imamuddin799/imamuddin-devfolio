export interface PistonRuntime {
  language: string;
  version: string;
}

export interface LanguageConfig {
  monaco: string;
  piston: PistonRuntime | null;
  display: string;
  color: string | null;
  canRun: boolean;
  canPreview: boolean;
  previewType: 'iframe' | 'terminal' | 'sql' | 'none';
  runNote?: string;
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
    /*
      Judge0 CE language 74 (ts-node) misinterprets generics and JSX
      as malformed regex/syntax. Mark as read-only to avoid confusing errors.
    */
    monaco: 'typescript', piston: null, display: 'TypeScript',
    color: '--color-js', canRun: false, canPreview: false, previewType: 'none',
    runNote: 'TypeScript execution not supported in this environment',
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
  springboot: {
    /*
      Spring Boot requires Maven + Spring jars — not available in Judge0 CE's
      plain javac environment. Display as read-only Java syntax.
    */
    monaco: 'java', piston: null, display: 'Spring Boot',
    color: '--color-spring', canRun: false, canPreview: false, previewType: 'none',
    runNote: 'Spring Boot requires a full Maven build environment',
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