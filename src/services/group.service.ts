import apiClient from '@/lib/api-client';
import type {
  TodoGroup,
  ApiResponse,
  CreateGroupRequest,
  UpdateGroupRequest,
} from '@/types/api';

/**
 * Group Service - DI-ready API logic for Todo Groups
 */
export class GroupService {
  /**
   * Get all groups
   */
  async getGroups(): Promise<TodoGroup[]> {
    const response = await apiClient.get<ApiResponse<TodoGroup[]>>('/groups');
    return response.data.data;
  }

  /**
   * Get group by ID
   */
  async getGroupById(id: string): Promise<TodoGroup> {
    const response = await apiClient.get<ApiResponse<TodoGroup>>(`/groups/${id}`);
    return response.data.data;
  }

  /**
   * Create a new group
   */
  async createGroup(data: CreateGroupRequest): Promise<TodoGroup> {
    const response = await apiClient.post<ApiResponse<TodoGroup>>('/groups', data);
    return response.data.data;
  }

  /**
   * Update a group
   */
  async updateGroup(id: string, data: UpdateGroupRequest): Promise<TodoGroup> {
    const response = await apiClient.put<ApiResponse<TodoGroup>>(`/groups/${id}`, data);
    return response.data.data;
  }

  /**
   * Delete a group
   */
  async deleteGroup(id: string): Promise<void> {
    await apiClient.delete(`/groups/${id}`);
  }
}

// Singleton instance for DI
export const groupService = new GroupService();
