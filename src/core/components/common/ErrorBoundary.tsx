import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Component, type ErrorInfo, type ReactNode } from 'react';

import { Button } from '@/core/components/ui/button';

export type ErrorBoundaryFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: (props: ErrorBoundaryFallbackProps) => ReactNode;
  /** Use for reporting (e.g. Sentry, LogRocket). Avoid logging sensitive `error.message` in production if errors may contain user data. */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

type ErrorBoundaryState = {
  error: Error | null;
};

/**
 * Catches JavaScript errors anywhere in the child tree and renders fallback UI.
 * Does not catch: async code, event handlers, SSR, or errors inside the boundary itself.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
    console.error('[ErrorBoundary]', error, errorInfo.componentStack);
  }

  resetErrorBoundary = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    const { error } = this.state;
    if (error) {
      const fallbackProps: ErrorBoundaryFallbackProps = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      };
      return this.props.fallback?.(fallbackProps) ?? <DefaultErrorFallback {...fallbackProps} />;
    }
    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetErrorBoundary }: ErrorBoundaryFallbackProps) {
  return (
    <div
      className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-6 p-6"
      role="alert"
    >
      <div className="border-border bg-card text-card-foreground max-w-md rounded-2xl border p-8 shadow-lg">
        <div className="text-destructive mb-4 flex items-center gap-3">
          <AlertTriangle className="size-8 shrink-0" aria-hidden />
          <h1 className="text-xl font-semibold tracking-tight">Something went wrong</h1>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">
          An unexpected error occurred. You can try again or return to the home page.
        </p>
        {import.meta.env.DEV ? (
          <pre className="bg-muted border-border mt-4 max-h-40 overflow-auto rounded-lg border p-3 text-left font-mono text-xs break-words whitespace-pre-wrap">
            {error.message}
            {error.stack ? `\n\n${error.stack}` : ''}
          </pre>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" variant="primary" onClick={resetErrorBoundary}>
            <RefreshCw className="size-4" aria-hidden />
            Try again
          </Button>
          <Button type="button" variant="outline" asChild>
            <a href="/">
              <Home className="size-4" aria-hidden />
              Go to home
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
