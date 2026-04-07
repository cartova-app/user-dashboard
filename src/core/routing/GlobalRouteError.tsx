import { AlertTriangle, Home } from 'lucide-react';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';
import { Button } from '@/core/components/ui/button';
import NotFound from '@/core/pages/NotFound';

/**
 * Default route error UI for the whole app. Used on the pathless root so any route
 * without its own `errorElement` bubbles here.
 */
export function GlobalRouteError() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />;
  }

  if (isRouteErrorResponse(error) && error.status === 403) {
    return (
      <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-6">
        <div className="border-border bg-card max-w-md rounded-2xl border p-8 text-center shadow-lg">
          <h1 className="text-lg font-semibold">Access denied</h1>
          <p className="text-muted-foreground mt-2 text-sm">You do not have permission to view this resource.</p>
          <Button type="button" variant="primary" className="mt-6" asChild>
            <Link to="/">
              <Home className="size-4" aria-hidden />
              Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isRouteErrorResponse(error) && error.status === 400) {
    return (
      <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-6">
        <div className="border-border bg-card max-w-md rounded-2xl border p-8 text-center shadow-lg">
          <h1 className="text-lg font-semibold">Invalid request</h1>
          <p className="text-muted-foreground mt-2 text-sm">{error.statusText || 'This link is not valid.'}</p>
          <Button type="button" variant="primary" className="mt-6" asChild>
            <Link to="/">
              <Home className="size-4" aria-hidden />
              Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-6">
      <div className="border-border bg-card max-w-md rounded-2xl border p-8 text-center shadow-lg">
        <div className="mb-4 flex items-center justify-center gap-3">
          <AlertTriangle className="text-destructive size-8 shrink-0" aria-hidden />
          <h1 className="text-lg font-semibold">Something went wrong</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          {isRouteErrorResponse(error)
            ? `Request failed (${error.status}).`
            : error instanceof Error
              ? error.message
              : 'An unexpected error occurred.'}
        </p>
        <Button type="button" variant="primary" className="mt-6" asChild>
          <Link to="/">
            <Home className="size-4" aria-hidden />
            Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
