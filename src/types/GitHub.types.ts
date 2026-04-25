export interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size: number;
  url: string;
  download_url: string | null;
  sha: string;
}

export interface GitHubFileContent {
  name: string;
  path: string;
  content: string;
  encoding: 'base64';
  size: number;
  sha: string;
}

export interface GitHubTree {
  sha: string;
  url: string;
  tree: GitHubTreeItem[];
}

export interface GitHubTreeItem {
  path: string;
  mode: string;
  type: 'blob' | 'tree';
  sha: string;
  size?: number;
  url: string;
}
