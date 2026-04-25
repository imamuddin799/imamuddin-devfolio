export default function CoursesLoading() {
  return (
    <div className="min-h-screen p-8">
      <div className="h-8 w-48 bg-white/5 rounded animate-pulse mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-48 bg-white/5 rounded-2xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}
