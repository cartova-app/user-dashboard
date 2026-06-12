import { generateSlug } from '@/core/utils/generateSlug';

export async function SlugPreview({ name }: { name: string }) {
  if (!name.trim()) {
    return null;
  }

  const { slug, usedFallback } = await generateSlug(name);

  return (
    <p className="text-sm text-muted-foreground">
      URL slug: <span className="font-mono text-foreground">{slug}</span>
      {usedFallback && (
        <span className="mt-1 block text-xs">
          A unique ID was generated because this name could not form a URL slug.
        </span>
      )}
    </p>
  );
}
