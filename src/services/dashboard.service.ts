import apiClient from '@/lib/api-client';
import type { ApiResponse, DashboardStats, UserStats, GroupStats } from '@/types/api';

/**
 * Dashboard Service - API logic for Dashboard data
 */
export class DashboardService {
  /**
   * Get dashboard stats for the current user
   */
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return response.data.data;
  }

  /**
   * Get user stats
   */
  async getUserStats(): Promise<UserStats> {
    const response = await apiClient.get<ApiResponse<UserStats>>('/dashboard/user-stats');
    return response.data.data;
  }

  /**
   * Get group stats
   */
  async getGroupStats(): Promise<GroupStats[]> {
    const response = await apiClient.get<ApiResponse<GroupStats[]>>('/dashboard/group-stats');
    return response.data.data;
  }
}

// Singleton instance for DI
export const dashboardService = new DashboardService();
