import { type NextRequest } from 'next/server';
import { listContents } from '@/lib/github';
import { type ApiResponse } from '@/types/Api.types';
import { type GitHubFile } from '@/types/GitHub.types';

export async function GET(_request: NextRequest): Promise<Response> {
  try {
    const contents = await listContents('');
    const courses = contents.filter((item) => item.type === 'dir');

    const response: ApiResponse<GitHubFile[]> = { data: courses };
    return Response.json(response, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
