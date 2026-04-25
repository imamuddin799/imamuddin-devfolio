import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export default function EmptyState({
  title = 'Nothing here yet',
  description = 'Content will appear here once added to GitHub.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <FolderOpen className="size-12 text-muted-foreground/50" />
      <h3 className="font-semibold text-muted-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground/70 max-w-sm">{description}</p>
    </div>
  );
}
