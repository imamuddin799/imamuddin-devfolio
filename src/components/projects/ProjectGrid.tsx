import { type Project, type ProjectTier } from '@/types/Course.types';
import ProjectCard from './ProjectCard';
import DifficultyBadge from './DifficultyBadge';
import EmptyState from '@/components/shared/EmptyState';

interface TierSectionProps {
    difficulty: Project['difficulty'];
    projects: Project[];
    courseColor: string;
    startIndex: number;
}

function TierSection({ difficulty, projects, courseColor, startIndex }: TierSectionProps) {
    if (projects.length === 0) return null;

    return (
        <section>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-4">
                <DifficultyBadge difficulty={difficulty} size="md" />
                <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} />
                <span className="text-xs tabular-nums" style={{ color: 'var(--text-muted)' }}>
                    {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                </span>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {projects.map((project, i) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        courseColor={courseColor}
                        index={startIndex + i}
                    />
                ))}
            </div>
        </section>
    );
}

interface ProjectGridProps {
    tiers: ProjectTier;
    courseColor: string;
}

export default function ProjectGrid({ tiers, courseColor }: ProjectGridProps) {
    const total = tiers.beginner.length + tiers.intermediate.length + tiers.pro.length;

    if (total === 0) {
        return (
            <EmptyState
                title="No projects yet"
                description="Add project folders inside Beginner, Intermediate or Pro in your GitHub repo."
            />
        );
    }

    return (
        <div className="flex flex-col gap-10">
            <TierSection
                difficulty="Beginner"
                projects={tiers.beginner}
                courseColor={courseColor}
                startIndex={0}
            />
            <TierSection
                difficulty="Intermediate"
                projects={tiers.intermediate}
                courseColor={courseColor}
                startIndex={tiers.beginner.length}
            />
            <TierSection
                difficulty="Pro"
                projects={tiers.pro}
                courseColor={courseColor}
                startIndex={tiers.beginner.length + tiers.intermediate.length}
            />
        </div>
    );
}