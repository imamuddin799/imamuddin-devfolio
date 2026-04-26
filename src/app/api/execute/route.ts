import { type NextRequest } from 'next/server';
import { z, type ZodIssue } from 'zod';
import { type ExecutionResult, PISTON_STATUS } from '@/types/Execution.types';

/* ── Validation ───────────────────────────────────────────── */
const BodySchema = z.object({
  sourceCode: z.string().min(1, 'sourceCode is required'),
  language: z.string().min(1, 'language is required'),
  version: z.string().min(1, 'version is required'),
  stdin: z.string().optional().default(''),
});

/*
  Judge0 CE — community hosted, free, no API key required.
  Language IDs: https://ce.judge0.com/languages
  java=62, python=71, javascript=63, typescript=74
*/
const JUDGE0_CE = 'https://ce.judge0.com';

const PROCESSING = new Set([1, 2]); // In Queue, Processing

/* ── Language name → Judge0 CE language ID ───────────────── */
const LANGUAGE_IDS: Record<string, number> = {
  java: 62,
  python: 71,
  javascript: 63,
  typescript: 74,
};

/* ── Normalise Judge0 CE response → ExecutionResult ─────── */
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
  const statusId = raw.status.id;

  // Map Judge0 status IDs to our PISTON_STATUS constants
  let mappedId: number;
  if (statusId === 3) {
    mappedId = PISTON_STATUS.ACCEPTED;
  } else if (statusId === 6) {
    mappedId = PISTON_STATUS.COMPILATION_ERROR;
  } else if (statusId >= 7 && statusId <= 12) {
    mappedId = PISTON_STATUS.RUNTIME_ERROR;
  } else {
    mappedId = PISTON_STATUS.INTERNAL_ERROR;
  }

  return {
    stdout: raw.stdout,
    stderr: raw.stderr,
    compile_output: raw.compile_output,
    message: raw.message,
    status: { id: mappedId, description: raw.status.description },
    time: raw.time ?? '—',
    memory: raw.memory ?? 0,
  };
}

/* ── POST /api/execute ────────────────────────────────────── */
export async function POST(request: NextRequest): Promise<Response> {
  try {
    const raw = await request.json() as unknown;
    const parsed = BodySchema.safeParse(raw);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues.map((e: ZodIssue) => e.message).join(', ') },
        { status: 400 },
      );
    }

    const { sourceCode, language, stdin } = parsed.data;

    const languageId = LANGUAGE_IDS[language];
    if (languageId === undefined) {
      return Response.json(
        { error: `Unsupported language: ${language}` },
        { status: 400 },
      );
    }

    // Submit to Judge0 CE
    const submitRes = await fetch(
      `${JUDGE0_CE}/submissions?base64_encoded=false&wait=false`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_code: sourceCode,
          language_id: languageId,
          stdin,
        }),
      },
    );

    if (!submitRes.ok) {
      const body = await submitRes.text();
      return Response.json(
        { error: `Judge0 CE submit error (${submitRes.status}): ${body}` },
        { status: 502 },
      );
    }

    const { token } = await submitRes.json() as { token: string };

    // Poll until result is ready (max 10 attempts = 10s)
    for (let i = 0; i < 10; i++) {
      await new Promise<void>((r) => setTimeout(r, 1000));

      const resultRes = await fetch(
        `${JUDGE0_CE}/submissions/${token}?base64_encoded=false`,
        { headers: { 'Content-Type': 'application/json' } },
      );

      const result = await resultRes.json() as Judge0Result;

      if (!PROCESSING.has(result.status.id)) {
        return Response.json(normalise(result));
      }
    }

    return Response.json(
      { error: 'Execution timed out after 10s' },
      { status: 408 },
    );

  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown server error';
    return Response.json({ error: msg }, { status: 500 });
  }
}