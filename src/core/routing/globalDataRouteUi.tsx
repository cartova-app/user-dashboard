import { GlobalRouteError } from '@/core/routing/GlobalRouteError';
import { GlobalRoutePending } from '@/core/routing/GlobalRoutePending';

/**
 * Reuse for any route that defines a `loader`. React Router shows `hydrateFallbackElement`
 * per matching route (not inherited from a parent), so routes with loaders should reference
 * these elements instead of duplicating components.
 *
 * `errorElement` is optional on each branch because errors bubble to the pathless root layout;
 * include it only when you need a branch-specific error UI.
 */
export const globalLoaderPendingElement = <GlobalRoutePending />;

export const globalRouteErrorElement = <GlobalRouteError />;
