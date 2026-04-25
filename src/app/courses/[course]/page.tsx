interface CoursePageProps {
  params: Promise<{ course: string }>;
}

// TODO Phase 1: Fetch course detail from GitHub
export default async function CoursePage({ params }: CoursePageProps) {
  const { course } = await params;

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold capitalize">{course}</h1>
      <p className="text-muted-foreground mt-2">Phase 1: Tabs (Notes / Snippets / Projects) go here</p>
    </main>
  );
}
