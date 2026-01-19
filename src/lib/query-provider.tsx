'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

// Query configuration constants
const STALE_TIME_MS = 60 * 1000; // 1 minute
const GC_TIME_MS = 5 * 60 * 1000; // 5 minutes
const DEFAULT_RETRY_COUNT = 1;

/**
 * TanStack Query Provider Component
 * Wraps the app with QueryClientProvider
 */
export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Default options for all queries
            staleTime: STALE_TIME_MS,
            gcTime: GC_TIME_MS, // formerly cacheTime
            retry: DEFAULT_RETRY_COUNT,
            refetchOnWindowFocus: false,
          },
          mutations: {
            // Default options for all mutations
            retry: DEFAULT_RETRY_COUNT,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
