import { EXTENSION_MAP, LANGUAGE_MAP, type LanguageConfig } from '@/constants/LANGUAGES';

/**
 * Detect language from file extension
 */
export function detectLanguage(filename: string): string {
  const ext = `.${filename.split('.').pop()?.toLowerCase() ?? ''}`;
  return EXTENSION_MAP[ext] ?? 'plaintext';
}

/**
 * Get full language config from filename
 */
export function getLanguageConfig(filename: string): LanguageConfig | undefined {
  const lang = detectLanguage(filename);
  return LANGUAGE_MAP[lang];
}

/**
 * Check if a file can be executed via Judge0
 */
export function canExecute(filename: string): boolean {
  return getLanguageConfig(filename)?.canRun ?? false;
}

/**
 * Check if a file supports live preview
 */
export function canPreview(filename: string): boolean {
  return getLanguageConfig(filename)?.canPreview ?? false;
}

/**
 * Get preview type for a file
 */
export function getPreviewType(filename: string): 'iframe' | 'terminal' | 'sql' | 'none' {
  return getLanguageConfig(filename)?.previewType ?? 'none';
}
