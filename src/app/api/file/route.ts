import { type NextRequest } from 'next/server';
import { getFileContent } from '@/lib/github';
import { type ApiResponse } from '@/types/Api.types';

export const revalidate = 3600;

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (filePath === null || filePath.trim() === '') {
      return Response.json({ error: 'Missing required query param: path' }, { status: 400 });
    }

    // Basic path traversal guard
    if (filePath.includes('..')) {
      return Response.json({ error: 'Invalid path' }, { status: 400 });
    }

    const content = await getFileContent(filePath);
    const response: ApiResponse<string> = { data: content };
    return Response.json(response);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch file';
    return Response.json({ error: message }, { status: 500 });
  }
}