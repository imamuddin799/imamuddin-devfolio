'use client';

import { useState, useCallback } from 'react';
import { type ExecutionResult } from '@/types/Execution.types';

type ExecutionState = 'idle' | 'running' | 'success' | 'error';

interface UseCodeExecutionReturn {
  result: ExecutionResult | null;
  state: ExecutionState;
  errorMessage: string | null;
  execute: (sourceCode: string, language: string, version: string, stdin?: string) => Promise<void>;
  reset: () => void;
}

export function useCodeExecution(): UseCodeExecutionReturn {
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [state, setState] = useState<ExecutionState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const execute = useCallback(async (
    sourceCode: string,
    language: string,
    version: string,
    stdin?: string,
  ): Promise<void> => {
    setState('running');
    setResult(null);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceCode, language, version, stdin: stdin ?? '' }),
      });

      const data = await response.json() as ExecutionResult | { error: string };

      if (!response.ok) {
        const msg = 'error' in data ? data.error : `Request failed with status ${response.status}`;
        setErrorMessage(msg);
        setState('error');
        return;
      }

      const executionResult = data as ExecutionResult;
      setResult(executionResult);
      setState(executionResult.status.id === 3 ? 'success' : 'error');

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