import { type NextRequest } from 'next/server';
import { executeCode } from '@/lib/judge0';
import { type ExecutionRequest, type ExecutionResult } from '@/types/Judge0.types';
import { type ApiResponse } from '@/types/Api.types';
import { z } from 'zod';

const ExecutionSchema = z.object({
  sourceCode: z.string().min(1),
  languageId: z.number().int().positive(),
  stdin: z.string().optional(),
});

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json() as ExecutionRequest;
    const parsed = ExecutionSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const result = await executeCode(parsed.data);
    const response: ApiResponse<ExecutionResult> = { data: result };

    return Response.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
