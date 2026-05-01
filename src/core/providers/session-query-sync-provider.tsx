import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import authClient from '@/core/config/auth-client';

/**
 * Keeps React Query cache in sync with Better Auth session scope.
 * Refetches all queries whenever user or active organization changes.
 */
export default function SessionQuerySyncProvider() {
  const queryClient = useQueryClient();
  const { data: sessionData } = authClient.useSession();
  const prevFingerprintRef = useRef<string | null>(null);

  useEffect(() => {
    const session = sessionData?.session;
    const fingerprint = session
      ? `${session.userId}:${session.activeOrganizationId ?? ''}`
      : null;

    if (prevFingerprintRef.current === null) {
      prevFingerprintRef.current = fingerprint;
      return;
    }

    if (fingerprint !== prevFingerprintRef.current) {
      prevFingerprintRef.current = fingerprint;
      void queryClient.invalidateQueries();
      void queryClient.refetchQueries({ type: 'all' });
    }
  }, [queryClient, sessionData]);

  return null;
}
