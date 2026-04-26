import { type NextRequest } from 'next/server';
import { listContents } from '@/lib/github';
import { COURSES } from '@/constants/COURSES';
import { type ApiResponse } from '@/types/Api.types';
import { type GitHubFile } from '@/types/GitHub.types';

export const revalidate = 3600;

interface RouteParams {
  params: Promise<{ course: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteParams
): Promise<Response> {
  try {
    const { course } = await params;

    // Resolve the actual GitHub folder path from the course ID
    const courseMeta = COURSES.find((c) => c.id === course);
    const repoPath = courseMeta?.path ?? course;

    const items = await listContents(repoPath);

    const response: ApiResponse<GitHubFile[]> = { data: items };
    return Response.json(response);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch course';
    return Response.json({ error: message }, { status: 500 });
  }
}