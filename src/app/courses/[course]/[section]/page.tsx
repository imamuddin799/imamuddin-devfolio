interface SectionPageProps {
  params: Promise<{ course: string; section: string }>;
}

// TODO Phase 1: List files in section
export default async function SectionPage({ params }: SectionPageProps) {
  const { course, section } = await params;

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold capitalize">{course} / {section}</h1>
      <p className="text-muted-foreground mt-2">Phase 1: File list goes here</p>
    </main>
  );
}
