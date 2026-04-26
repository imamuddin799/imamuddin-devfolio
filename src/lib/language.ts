import { EXTENSION_MAP, LANGUAGE_MAP, type LanguageConfig } from '@/constants/LANGUAGES';

/*
  Path segments that indicate a framework context.
  .java files inside these folders need special language IDs
  so the Run button is correctly hidden (they need Maven/Gradle).
*/
const PATH_OVERRIDES: Record<string, string> = {
  SpringBoot: 'springboot',
  Hibernate: 'springboot', // Hibernate also needs external jars
  AdvancedJava: 'java',     // pure javac is fine for servlets demo code
};

/**
 * Detect language from filename + optional full file path.
 * Pass `filePath` whenever available so framework .java files
 * (Spring Boot, Hibernate) are correctly identified as non-executable.
 */
export function detectLanguage(filename: string, filePath?: string): string {
  // Check path-based overrides first (only for .java files)
  if (filePath !== undefined && filename.endsWith('.java')) {
    const segments = filePath.split('/');
    for (const segment of segments) {
      const override = PATH_OVERRIDES[segment];
      if (override !== undefined) return override;
    }
  }

  const ext = `.${filename.split('.').pop()?.toLowerCase() ?? ''}`;
  return EXTENSION_MAP[ext] ?? 'plaintext';
}

/**
 * Get full language config from filename + optional path.
 */
export function getLanguageConfig(filename: string, filePath?: string): LanguageConfig | undefined {
  const lang = detectLanguage(filename, filePath);
  return LANGUAGE_MAP[lang];
}

/**
 * Check if a file can be executed.
 */
export function canExecute(filename: string, filePath?: string): boolean {
  return getLanguageConfig(filename, filePath)?.canRun ?? false;
}

/**
 * Check if a file supports live preview.
 */
export function canPreview(filename: string, filePath?: string): boolean {
  return getLanguageConfig(filename, filePath)?.canPreview ?? false;
}

/**
 * Get preview type for a file.
 */
export function getPreviewType(filename: string, filePath?: string): 'iframe' | 'terminal' | 'sql' | 'none' {
  return getLanguageConfig(filename, filePath)?.previewType ?? 'none';
}