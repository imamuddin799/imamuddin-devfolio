// TODO Phase 1: Implement sticky glass navbar with mobile menu
'use client';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
        <span className="font-bold text-lg">imamuddin.dev</span>
      </div>
    </nav>
  );
}
