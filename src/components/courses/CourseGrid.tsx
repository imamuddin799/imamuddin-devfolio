import { type Course } from '@/types/Course.types';
import CourseCard from './CourseCard';

interface CourseGridProps {
    courses: Course[];
}

export default function CourseGrid({ courses }: CourseGridProps) {
    if (courses.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                    style={{
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--border-default)',
                    }}
                >
                    📂
                </div>
                <p className="text-lg font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    No courses yet
                </p>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Add folders to your GitHub repo to see them here.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {courses.map((course, index) => (
                <CourseCard
                    key={course.id}
                    course={course}
                    index={index}
                    snippetCount={0}
                    projectCount={0}
                />
            ))}
        </div>
    );
}