import { listContents } from '@/lib/github';
import { COURSES } from '@/constants/COURSES';
import { type ApiResponse } from '@/types/Api.types';
import { type GitHubFile } from '@/types/GitHub.types';

export const revalidate = 3600; // ISR — revalidate every hour

export async function GET(): Promise<Response> {
  try {
    const items = await listContents('');
    const dirs = items.filter((i) => i.type === 'dir');

    // Only return folders that match our known courses
    const knownPaths = new Set(COURSES.map((c) => c.path));
    const courses = dirs.filter((d) => knownPaths.has(d.name));

    const response: ApiResponse<GitHubFile[]> = { data: courses };
    return Response.json(response);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch courses';
    return Response.json({ error: message }, { status: 500 });
  }
}