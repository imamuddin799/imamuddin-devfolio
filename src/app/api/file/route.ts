import { type NextRequest } from 'next/server';
import { getFileContent } from '@/lib/github';
import { type ApiResponse } from '@/types/Api.types';

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return Response.json({ error: 'Missing path parameter' }, { status: 400 });
    }

    const content = await getFileContent(filePath);
    const response: ApiResponse<string> = { data: content };

    return Response.json(response, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
