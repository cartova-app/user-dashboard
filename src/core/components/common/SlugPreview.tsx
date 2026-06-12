import { useEffect, useState } from 'react';
import { generateSlug } from '@/core/utils/generateSlug';

export function SlugPreview({ name }: { name: string }) {
  const [slugData, setSlugData] = useState<{ slug: string; usedFallback: boolean } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!name.trim()) {
      setSlugData(null);
      return;
    }

    setIsGenerating(true);
    const timeoutId = setTimeout(async () => {
      try {
        const data = await generateSlug(name);
        setSlugData(data);
      } catch (error) {
        console.error('Error generating slug:', error);
      } finally {
        setIsGenerating(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [name]);

  if (!name.trim() || !slugData) {
    return null;
  }

  return (
    <p className="text-sm text-muted-foreground">
      URL slug: <span className="font-mono text-foreground">{isGenerating ? '...' : slugData.slug}</span>
      {slugData.usedFallback && !isGenerating && (
        <span className="mt-1 block text-xs">
          A unique ID was generated because this name could not form a URL slug.
        </span>
      )}
    </p>
  );
}
