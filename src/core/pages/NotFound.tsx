import { FileQuestion, Home, Undo2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/core/components/ui/button';

type NotFoundProps = {
  /**
   * Use `embedded` under a layout (sidebar + outlet) so the 404 fills the main column.
   * Use `fullscreen` for unknown top-level URLs (no app chrome).
   */
  variant?: 'fullscreen' | 'embedded';
};

export default function NotFound({ variant = 'fullscreen' }: NotFoundProps) {
  const navigate = useNavigate();
  const isFullscreen = variant === 'fullscreen';

  return (
    <div
      className={
        isFullscreen
          ? 'bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-6'
          : 'text-foreground flex min-h-[50vh] w-full flex-col items-center justify-center p-6'
      }
    >
      <div className="border-border bg-card text-card-foreground max-w-md rounded-2xl border p-8 text-center shadow-lg">
        <p className="text-muted-foreground mb-2 text-sm font-medium tabular-nums">404</p>
        <div className="text-foreground mb-4 flex items-center justify-center gap-3">
          <FileQuestion className="size-8 shrink-0" aria-hidden />
          <h1 className="text-xl font-semibold tracking-tight">Page not found</h1>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          This URL does not match any page. Check the address or go back to a known area of the app.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            <Undo2 className="size-4" aria-hidden />
            Go back
          </Button>
          <Button type="button" variant="primary" asChild>
            <Link to="/">
              <Home className="size-4" aria-hidden />
              Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
