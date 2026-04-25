import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 flex-wrap">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                    <span key={`${item.label}-${index}`} className="flex items-center gap-1">
                        {index !== 0 && (
                            <ChevronRight
                                className="w-3 h-3 flex-shrink-0"
                                style={{ color: 'var(--text-muted)' }}
                            />
                        )}
                        {item.href !== undefined && !isLast ? (
                            <Link
                                href={item.href}
                                className="text-xs font-medium transition-colors duration-150 hover:underline underline-offset-2"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className="text-xs font-medium"
                                style={{ color: isLast ? 'var(--accent-1)' : 'var(--text-secondary)' }}
                                aria-current={isLast ? 'page' : undefined}
                            >
                                {item.label}
                            </span>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}