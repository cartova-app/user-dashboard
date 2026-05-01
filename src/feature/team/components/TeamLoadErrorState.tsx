import PageHeading from '@/core/components/common/PageHeading';
import { Button } from '@/core/components/ui/button';

type TeamLoadErrorStateProps = {
  onRetry: () => void;
};

export default function TeamLoadErrorState({ onRetry }: TeamLoadErrorStateProps) {
  return (
    <div className="space-y-8 text-start">
      <PageHeading heading="Team" description="Manage organization access, roles, and invitations." />
      <div className="min-h-80 rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
        <p className="font-medium text-destructive">Failed to load team data.</p>
        <Button onClick={onRetry} variant="outline" className="mt-4">
          Retry
        </Button>
      </div>
    </div>
  );
}
