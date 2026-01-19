import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboard.service';

/**
 * Query keys for dashboard
 */
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
  userStats: () => [...dashboardKeys.all, 'user-stats'] as const,
  groupStats: () => [...dashboardKeys.all, 'group-stats'] as const,
};

/**
 * Hook to fetch dashboard stats
 */
export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: () => dashboardService.getDashboardStats(),
  });
}

/**
 * Hook to fetch user stats
 */
export function useUserStats() {
  return useQuery({
    queryKey: dashboardKeys.userStats(),
    queryFn: () => dashboardService.getUserStats(),
  });
}

/**
 * Hook to fetch group stats
 */
export function useGroupStats() {
  return useQuery({
    queryKey: dashboardKeys.groupStats(),
    queryFn: () => dashboardService.getGroupStats(),
  });
}
