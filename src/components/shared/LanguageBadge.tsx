import { detectLanguage } from '@/lib/language';
import { LANGUAGE_MAP } from '@/constants/LANGUAGES';
import { Badge } from '@/components/ui/badge';

interface LanguageBadgeProps {
  filename: string;
}

export default function LanguageBadge({ filename }: LanguageBadgeProps) {
  const lang = detectLanguage(filename);
  const config = LANGUAGE_MAP[lang];
  const display = config?.display ?? lang;

  return (
    <Badge variant="outline" className="font-mono text-xs">
      {display}
    </Badge>
  );
}
