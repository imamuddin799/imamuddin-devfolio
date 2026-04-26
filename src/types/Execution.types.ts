/* ═══════════════════════════════════════════════════════════
   EXECUTION TYPES — Piston API
   Previously Judge0.types.ts — renamed + reshaped for Piston.
   Status constants are preserved so TerminalOutput / RunButton
   don't need changes.
═══════════════════════════════════════════════════════════ */

export interface ExecutionRequest {
    sourceCode: string;
    language: string;   // Piston language name e.g. "java", "python"
    version: string;   // Piston version string e.g. "15.0.2"
    stdin?: string;
}

/* ── Piston raw API response ─────────────────────────────── */
export interface PistonRunResponse {
    language: string;
    version: string;
    run: {
        stdout: string;
        stderr: string;
        code: number;   // process exit code
        signal: string | null;
        output: string;   // stdout + stderr combined
    };
    compile?: {
        stdout: string;
        stderr: string;
        code: number;
        signal: string | null;
        output: string;
    };
}

/* ── Normalised result (used everywhere in the UI) ───────── */
export interface ExecutionResult {
    stdout: string | null;
    stderr: string | null;
    compile_output: string | null;
    message: string | null;
    status: ExecutionStatus;
    time: string;
    memory: number;
}

export interface ExecutionStatus {
    id: number;
    description: string;
}

/*
  Status ID mapping (mirrors Judge0 IDs so TerminalOutput/RunButton
  need zero changes — they only check id === 3 for success):

  3  → Accepted (exit code 0, no stderr)
  6  → Compilation Error (compile.code !== 0)
  11 → Runtime Error (exit code !== 0 or stderr present)
  13 → Internal Error (Piston returned an error field)
*/
export const PISTON_STATUS = {
    ACCEPTED: 3,
    COMPILATION_ERROR: 6,
    RUNTIME_ERROR: 11,
    INTERNAL_ERROR: 13,
} as const;

/* Keep old name exported so any file importing JUDGE0_STATUS still compiles */
export const JUDGE0_STATUS = PISTON_STATUS;