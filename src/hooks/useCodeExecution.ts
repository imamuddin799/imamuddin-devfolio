'use client';

import { useState, useCallback } from 'react';
import { type ExecutionResult } from '@/types/Judge0.types';

type ExecutionState = 'idle' | 'running' | 'success' | 'error';

interface UseCodeExecutionReturn {
  result: ExecutionResult | null;
  state: ExecutionState;
  execute: (sourceCode: string, languageId: number, stdin?: string) => Promise<void>;
  reset: () => void;
}

export function useCodeExecution(): UseCodeExecutionReturn {
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [state, setState] = useState<ExecutionState>('idle');

  const execute = useCallback(async (
    sourceCode: string,
    languageId: number,
    stdin?: string
  ) => {
    setState('running');
    setResult(null);

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceCode, languageId, stdin }),
      });

      if (!response.ok) {
        throw new Error('Execution request failed');
      }

      const data = await response.json() as ExecutionResult;
      setResult(data);
      setState(data.status.id === 3 ? 'success' : 'error');
    } catch (error) {
      setState('error');
      console.error('Code execution error:', error);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setState('idle');
  }, []);

  return { result, state, execute, reset };
}
