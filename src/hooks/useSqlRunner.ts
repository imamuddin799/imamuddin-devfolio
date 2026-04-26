'use client';

import { useState, useCallback, useRef } from 'react';

export interface SqlRow {
    columns: string[];
    values: (string | number | null)[][];
}

export interface SqlRunnerResult {
    rows: SqlRow[];
    error: string | null;
    timeMs: number;
}

type SqlState = 'idle' | 'loading' | 'running' | 'done' | 'error';

interface UseSqlRunnerReturn {
    state: SqlState;
    result: SqlRunnerResult | null;
    run: (sql: string) => Promise<void>;
    reset: () => void;
}

export function useSqlRunner(): UseSqlRunnerReturn {
    const [state, setState] = useState<SqlState>('idle');
    const [result, setResult] = useState<SqlRunnerResult | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dbRef = useRef<any>(null);

    const initDb = useCallback(async () => {
        if (dbRef.current !== null) return;

        setState('loading');

        // Dynamic import — sql.js accesses window, must be client-only
        const initSqlJs = (await import('sql.js')).default;
        const SQL = await initSqlJs({
            // WASM file served from public/
            locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/sql.js@1.12.0/dist/${file}`,
        });
        dbRef.current = new SQL.Database();
    }, []);

    const run = useCallback(async (sql: string) => {
        try {
            await initDb();
            setState('running');
            setResult(null);

            const t0 = performance.now();
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            const raw = dbRef.current.exec(sql) as SqlRow[];
            const timeMs = performance.now() - t0;

            setResult({ rows: raw, error: null, timeMs });
            setState('done');
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Unknown SQL error';
            setResult({ rows: [], error: msg, timeMs: 0 });
            setState('error');
        }
    }, [initDb]);

    const reset = useCallback(() => {
        setResult(null);
        setState('idle');
        dbRef.current = null; // fresh DB on next run
    }, []);

    return { state, result, run, reset };
}