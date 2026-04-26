'use client';

import { useState, useCallback, useRef } from 'react';

/* ── Types ───────────────────────────────────────────────── */
interface SqlTable {
    columns: string[];
    values: (string | number | null)[][];
}

export interface SqlResult {
    rows: SqlTable[];
    error: string | null;
    timeMs: number;
}

type SqlState = 'idle' | 'loading' | 'running' | 'done' | 'error';

interface UseSqlRunnerReturn {
    state: SqlState;
    result: SqlResult | null;
    run: (sql: string) => Promise<void>;
    reset: () => void;
}

/* ── sql.js type shim (no @types/sql.js needed) ─────────── */
interface SqlJsStatic {
    Database: new (data?: ArrayBuffer | null) => SqlDatabase;
}

interface SqlDatabase {
    exec: (sql: string) => SqlTable[];
    close: () => void;
}

/* ── Singleton loader ────────────────────────────────────── */
let sqlJsPromise: Promise<SqlJsStatic> | null = null;

function loadSqlJs(): Promise<SqlJsStatic> {
    if (sqlJsPromise !== null) return sqlJsPromise;

    sqlJsPromise = new Promise((resolve, reject) => {
        /*
          Load sql.js from jsDelivr. We need the WASM file to be reachable —
          locateFile tells sql.js where to find sql-wasm.wasm relative to the JS.
          Using the same CDN version for both JS and WASM avoids mismatches.
        */
        const CDNBASE = 'https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/';

        const script = document.createElement('script');
        script.src = `${CDNBASE}sql-wasm.js`;
        script.async = true;

        script.onload = () => {
            const initSqlJs = (window as unknown as Record<string, unknown>)['initSqlJs'] as
                ((config: { locateFile: (f: string) => string }) => Promise<SqlJsStatic>) | undefined;

            if (initSqlJs === undefined) {
                reject(new Error('initSqlJs not found on window after script load'));
                return;
            }

            initSqlJs({
                locateFile: (file: string) => `${CDNBASE}${file}`,
            })
                .then(resolve)
                .catch(reject);
        };

        script.onerror = () => reject(new Error('Failed to load sql.js from CDN'));
        document.head.appendChild(script);
    });

    return sqlJsPromise;
}

/* ══════════════════════════════════════════════════════════
   HOOK
══════════════════════════════════════════════════════════ */
export function useSqlRunner(): UseSqlRunnerReturn {
    const [state, setState] = useState<SqlState>('idle');
    const [result, setResult] = useState<SqlResult | null>(null);
    const sqlJsRef = useRef<SqlJsStatic | null>(null);

    const run = useCallback(async (sql: string): Promise<void> => {
        setState('loading');
        setResult(null);

        try {
            // Load sql.js once, cache in ref
            if (sqlJsRef.current === null) {
                const SQL = await loadSqlJs();
                sqlJsRef.current = SQL;
            }

            setState('running');

            const SQL = sqlJsRef.current;
            const db = new SQL.Database();
            const t0 = performance.now();

            let rows: SqlTable[] = [];
            let error: string | null = null;

            try {
                rows = db.exec(sql);
            } catch (e) {
                error = e instanceof Error ? e.message : String(e);
            } finally {
                db.close();
            }

            const timeMs = performance.now() - t0;

            setResult({ rows, error, timeMs });
            setState('done');

        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Unknown error loading SQL engine';
            setResult({ rows: [], error: msg, timeMs: 0 });
            setState('error');
            // Reset promise so next run retries the load
            sqlJsPromise = null;
        }
    }, []);

    const reset = useCallback((): void => {
        setState('idle');
        setResult(null);
    }, []);

    return { state, result, run, reset };
}