export const ROUTES = {
  HOME: '/',
  COURSES: '/courses',
  COURSE: (courseId: string) => `/courses/${courseId}`,
  SECTION: (courseId: string, section: string) =>
    `/courses/${courseId}/${section}`,
  VIEWER: '/viewer',
  VIEWER_WITH_PATH: (filePath: string) =>
    `/viewer?path=${encodeURIComponent(filePath)}`,
} as const;
