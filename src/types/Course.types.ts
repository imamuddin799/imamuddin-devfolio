export interface Course {
  id: string;
  title: string;
  path: string;
  color: string;
  cssVar: string;
  icon: string;
  description: string;
  subcourses?: string[];
}

export interface CourseContent {
  notes: GitHubFile[];
  snippets: GitHubFile[];
  projects: ProjectTier;
}

export interface ProjectTier {
  beginner: Project[];
  intermediate: Project[];
  pro: Project[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Pro';
  path: string;
  files: GitHubFile[];
  readme?: string;
  learned?: string[];
  techUsed?: string[];
}

export interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size: number;
  url: string;
  language?: string;
}
