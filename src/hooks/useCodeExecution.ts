'use client';

import { useState, useCallback } from 'react';
import { type ExecutionResult, PISTON_STATUS } from '@/types/Execution.types';

type ExecutionState = 'idle' | 'running' | 'success' | 'error';

interface UseCodeExecutionReturn {
  result: ExecutionResult | null;
  state: ExecutionState;
  errorMessage: string | null;
  execute: (sourceCode: string, language: string, version: string, stdin?: string) => Promise<void>;
  reset: () => void;
}

const JUDGE0_CE = 'https://ce.judge0.com';

const LANGUAGE_IDS: Record<string, number> = {
  java: 62,
  python: 71,
  javascript: 63,
  typescript: 74,
};

/* ── Base64 helpers ───────────────────────────────────────── */
function toBase64(str: string): string {
  // TextEncoder handles all Unicode including emoji
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary);
}

function fromBase64(str: string | null): string | null {
  if (str === null || str === '') return null;
  try {
    const binary = atob(str);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch {
    return str;
  }
}

/* ── Preprocess source per language ──────────────────────────
   Judge0 CE compiles Java as Main.java — public class must be Main.
   No preprocessing needed for Python, JS, TS.
──────────────────────────────────────────────────────────── */
function preprocessSource(language: string, source: string): string {
  if (language !== 'java') return source;

  const match = /public\s+class\s+(\w+)/.exec(source);
  if (match === null || match[1] === undefined || match[1] === 'Main') {
    return source;
  }
  const original = match[1];
  return source
    .replace(new RegExp(`public\\s+class\\s+${original}`, 'g'), 'public class Main')
    .replace(new RegExp(`new\\s+${original}\\s*\\(`, 'g'), 'new Main(');
}

/* ── Judge0 raw response ──────────────────────────────────── */
interface Judge0Result {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  status: { id: number; description: string };
  time: string | null;
  memory: number | null;
}

function normalise(raw: Judge0Result): ExecutionResult {
  const id = raw.status.id;
  let mappedId: number;
  if (id === 3) mappedId = PISTON_STATUS.ACCEPTED;
  else if (id === 6) mappedId = PISTON_STATUS.COMPILATION_ERROR;
  else if (id >= 7 && id <= 12) mappedId = PISTON_STATUS.RUNTIME_ERROR;
  else mappedId = PISTON_STATUS.INTERNAL_ERROR;

  return {
    stdout: fromBase64(raw.stdout),
    stderr: fromBase64(raw.stderr),
    compile_output: fromBase64(raw.compile_output),
    message: raw.message,
    status: { id: mappedId, description: raw.status.description },
    time: raw.time ?? '—',
    memory: raw.memory ?? 0,
  };
}

/* ══════════════════════════════════════════════════════════
   HOOK — calls Judge0 CE directly from the browser.
   Server-side requests are blocked by Judge0 CE (403).
   Browser requests work fine via CORS.
══════════════════════════════════════════════════════════ */
export function useCodeExecution(): UseCodeExecutionReturn {
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [state, setState] = useState<ExecutionState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const execute = useCallback(async (
    sourceCode: string,
    language: string,
    _version: string, // kept for API compat — Judge0 CE doesn't need it
    stdin?: string,
  ): Promise<void> => {
    setState('running');
    setResult(null);
    setErrorMessage(null);

    const languageId = LANGUAGE_IDS[language];
    if (languageId === undefined) {
      setErrorMessage(`Unsupported language: ${language}`);
      setState('error');
      return;
    }

    const finalSource = preprocessSource(language, sourceCode);

    try {
      const res = await fetch(
        `${JUDGE0_CE}/submissions?base64_encoded=true&wait=true`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source_code: toBase64(finalSource),
            language_id: languageId,
            stdin: toBase64(stdin ?? ''),
          }),
        },
      );

      if (!res.ok) {
        const body = await res.text();
        setErrorMessage(`Judge0 error (${res.status}): ${body}`);
        setState('error');
        return;
      }

      const raw = await res.json() as Judge0Result;
      const executionResult = normalise(raw);
      setResult(executionResult);
      setState(executionResult.status.id === PISTON_STATUS.ACCEPTED ? 'success' : 'error');

    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Network error';
      setErrorMessage(msg);
      setState('error');
    }
  }, []);

  const reset = useCallback((): void => {
    setResult(null);
    setState('idle');
    setErrorMessage(null);
  }, []);

  return { result, state, errorMessage, execute, reset };
}