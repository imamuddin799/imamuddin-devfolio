'use client';

import { useState, useEffect, useCallback } from 'react';
import { type GitHubFile } from '@/types/GitHub.types';
import { type ApiResponse } from '@/types/Api.types';

type FetchState = 'idle' | 'loading' | 'done' | 'error';

interface UseGitHubFilesReturn {
    files: GitHubFile[];
    state: FetchState;
    error: string | null;
    refetch: () => void;
}

export function useGitHubFiles(apiPath: string): UseGitHubFilesReturn {
    const [files, setFiles] = useState<GitHubFile[]>([]);
    const [state, setState] = useState<FetchState>('idle');
    const [error, setError] = useState<string | null>(null);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        if (apiPath === '') return;

        let cancelled = false;
        setState('loading');
        setError(null);

        void (async () => {
            try {
                const res = await fetch(apiPath);
                const json = await res.json() as ApiResponse<GitHubFile[]>;

                if (cancelled) return;

                if (json.error !== undefined) {
                    setError(json.error);
                    setState('error');
                } else {
                    setFiles(json.data);
                    setState('done');
                }
            } catch (err) {
                if (cancelled) return;
                setError(err instanceof Error ? err.message : 'Fetch failed');
                setState('error');
            }
        })();

        return () => { cancelled = true; };
    }, [apiPath, tick]);

    const refetch = useCallback(() => setTick((t) => t + 1), []);

    return { files, state, error, refetch };
}

/* ── Single file content ─────────────────────────────────── */
interface UseGitHubFileReturn {
    content: string | null;
    state: FetchState;
    error: string | null;
}

export function useGitHubFile(filePath: string): UseGitHubFileReturn {
    const [content, setContent] = useState<string | null>(null);
    const [state, setState] = useState<FetchState>('idle');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (filePath === '') return;

        let cancelled = false;
        setState('loading');
        setError(null);

        void (async () => {
            try {
                const res = await fetch(`/api/file?path=${encodeURIComponent(filePath)}`);
                const json = await res.json() as ApiResponse<string>;

                if (cancelled) return;

                if (json.error !== undefined) {
                    setError(json.error);
                    setState('error');
                } else {
                    setContent(json.data);
                    setState('done');
                }
            } catch (err) {
                if (cancelled) return;
                setError(err instanceof Error ? err.message : 'Fetch failed');
                setState('error');
            }
        })();

        return () => { cancelled = true; };
    }, [filePath]);

    return { content, state, error };
}