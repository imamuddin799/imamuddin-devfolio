import { Octokit } from '@octokit/rest';
import { env } from './env';
import { type GitHubFile, type GitHubFileContent } from '@/types/GitHub.types';

// Singleton Octokit client (server-side only)
const octokit = new Octokit({ auth: env.GITHUB_TOKEN });

const OWNER = env.GITHUB_OWNER;
const REPO  = env.GITHUB_REPO;

/**
 * List files/folders at a given repo path
 */
export async function listContents(repoPath: string): Promise<GitHubFile[]> {
  const response = await octokit.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path: repoPath,
  });

  if (!Array.isArray(response.data)) {
    return [];
  }

  return response.data.map((item) => ({
    name: item.name,
    path: item.path,
    type: item.type as 'file' | 'dir',
    size: item.size ?? 0,
    url: item.url,
    download_url: item.download_url ?? null,
    sha: item.sha,
  }));
}

/**
 * Get raw content of a single file (decoded from base64)
 */
export async function getFileContent(repoPath: string): Promise<string> {
  const response = await octokit.repos.getContent({
    owner: OWNER,
    repo: REPO,
    path: repoPath,
  });

  const data = response.data as GitHubFileContent;

  if (data.encoding !== 'base64') {
    throw new Error(`Unexpected encoding: ${data.encoding}`);
  }

  return Buffer.from(data.content, 'base64').toString('utf-8');
}

/**
 * Check if a file exists in the repo
 */
export async function fileExists(repoPath: string): Promise<boolean> {
  try {
    await octokit.repos.getContent({ owner: OWNER, repo: REPO, path: repoPath });
    return true;
  } catch {
    return false;
  }
}
