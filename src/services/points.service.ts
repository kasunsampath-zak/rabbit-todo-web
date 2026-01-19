import apiClient from '@/lib/api-client';
import type {
  TodoPoints,
  ApiResponse,
  CreatePointsRequest,
} from '@/types/api';

/**
 * Points Service - DI-ready API logic for Todo Points
 */
export class PointsService {
  /**
   * Get all points
   */
  async getAllPoints(): Promise<TodoPoints[]> {
    const response = await apiClient.get<ApiResponse<TodoPoints[]>>('/points');
    return response.data.data;
  }

  /**
   * Get points by todo ID
   */
  async getPointsByTodoId(todoId: string): Promise<TodoPoints[]> {
    const response = await apiClient.get<ApiResponse<TodoPoints[]>>(`/points/todo/${todoId}`);
    return response.data.data;
  }

  /**
   * Get points by ID
   */
  async getPointsById(id: string): Promise<TodoPoints> {
    const response = await apiClient.get<ApiResponse<TodoPoints>>(`/points/${id}`);
    return response.data.data;
  }

  /**
   * Create new points record
   */
  async createPoints(data: CreatePointsRequest): Promise<TodoPoints> {
    const response = await apiClient.post<ApiResponse<TodoPoints>>('/points', data);
    return response.data.data;
  }

  /**
   * Update points record
   */
  async updatePoints(id: string, data: Partial<CreatePointsRequest>): Promise<TodoPoints> {
    const response = await apiClient.put<ApiResponse<TodoPoints>>(`/points/${id}`, data);
    return response.data.data;
  }

  /**
   * Delete points record
   */
  async deletePoints(id: string): Promise<void> {
    await apiClient.delete(`/points/${id}`);
  }
}

// Singleton instance for DI
export const pointsService = new PointsService();
