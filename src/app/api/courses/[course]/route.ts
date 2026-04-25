import { type NextRequest } from 'next/server';
import { listContents } from '@/lib/github';
import { type ApiResponse } from '@/types/Api.types';
import { type GitHubFile } from '@/types/GitHub.types';

interface RouteParams {
  params: Promise<{ course: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams): Promise<Response> {
  try {
    const { course } = await params;
    const contents = await listContents(course);

    const response: ApiResponse<GitHubFile[]> = { data: contents };
    return Response.json(response, {
      headers: { 'Cache-Control': 's-maxage=3600, stale-while-revalidate' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}
