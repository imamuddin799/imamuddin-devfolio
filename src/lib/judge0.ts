import { type ExecutionRequest, type ExecutionResult, JUDGE0_STATUS } from '@/types/Judge0.types';

const API_URL = process.env.JUDGE0_API_URL ?? '';
const API_KEY  = process.env.JUDGE0_API_KEY ?? '';

const HEADERS = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Key': API_KEY,
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
};

/**
 * Submit code for execution and poll until result is ready
 */
export async function executeCode(request: ExecutionRequest): Promise<ExecutionResult> {
  // Submit
  const submitRes = await fetch(`${API_URL}/submissions?base64_encoded=false&wait=false`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      source_code: request.sourceCode,
      language_id: request.languageId,
      stdin: request.stdin ?? '',
    }),
  });

  if (!submitRes.ok) {
    throw new Error(`Judge0 submission failed: ${submitRes.statusText}`);
  }

  const { token } = await submitRes.json() as { token: string };

  // Poll for result (max 10 seconds)
  const MAX_ATTEMPTS = 10;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    await new Promise((r) => setTimeout(r, 1000));

    const resultRes = await fetch(
      `${API_URL}/submissions/${token}?base64_encoded=false`,
      { headers: HEADERS }
    );

    const result = await resultRes.json() as ExecutionResult;

    if (
      result.status.id !== JUDGE0_STATUS.IN_QUEUE &&
      result.status.id !== JUDGE0_STATUS.PROCESSING
    ) {
      return result;
    }
  }

  throw new Error('Execution timed out after 10 seconds');
}
