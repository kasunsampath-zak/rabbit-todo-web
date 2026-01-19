import apiClient from '@/lib/api-client';
import type {
  Todo,
  ApiResponse,
  PaginatedResponse,
  CreateTodoRequest,
  UpdateTodoRequest,
} from '@/types/api';

/**
 * Todo Service - DI-ready API logic for Todos
 */
export class TodoService {
  /**
   * Get all todos
   */
  async getTodos(): Promise<Todo[]> {
    const response = await apiClient.get<ApiResponse<Todo[]>>('/todos');
    return response.data.data;
  }

  /**
   * Get paginated todos
   */
  async getPaginatedTodos(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Todo>> {
    const response = await apiClient.get<PaginatedResponse<Todo>>('/todos', {
      params: { page, pageSize },
    });
    return response.data;
  }

  /**
   * Get todo by ID
   */
  async getTodoById(id: string): Promise<Todo> {
    const response = await apiClient.get<ApiResponse<Todo>>(`/todos/${id}`);
    return response.data.data;
  }

  /**
   * Get todos by group
   */
  async getTodosByGroup(groupId: string): Promise<Todo[]> {
    const response = await apiClient.get<ApiResponse<Todo[]>>(`/todos/group/${groupId}`);
    return response.data.data;
  }

  /**
   * Create a new todo
   */
  async createTodo(data: CreateTodoRequest): Promise<Todo> {
    const response = await apiClient.post<ApiResponse<Todo>>('/todos', data);
    return response.data.data;
  }

  /**
   * Update a todo
   */
  async updateTodo(id: string, data: UpdateTodoRequest): Promise<Todo> {
    const response = await apiClient.put<ApiResponse<Todo>>(`/todos/${id}`, data);
    return response.data.data;
  }

  /**
   * Delete a todo
   */
  async deleteTodo(id: string): Promise<void> {
    await apiClient.delete(`/todos/${id}`);
  }

  /**
   * Toggle todo completion status
   */
  async toggleTodoCompletion(id: string): Promise<Todo> {
    const todo = await this.getTodoById(id);
    return this.updateTodo(id, { completed: !todo.completed });
  }
}

// Singleton instance for DI
export const todoService = new TodoService();
