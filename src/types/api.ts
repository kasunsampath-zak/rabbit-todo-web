// API Response types matching Rust backend structures

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  groupId?: string;
  points?: number;
  createdAt: string;
  updatedAt: string;
}

export interface TodoGroup {
  id: string;
  name: string;
  description?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodoPoints {
  id: string;
  todoId: string;
  points: number;
  estimatedDuration?: string; // Jira-style duration (e.g., "2h 30m", "1d 4h")
  actualDuration?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
}

// Request types
export interface CreateTodoRequest {
  title: string;
  description?: string;
  groupId?: string;
  points?: number;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  groupId?: string;
  points?: number;
}

export interface CreateGroupRequest {
  name: string;
  description?: string;
  color?: string;
}

export interface UpdateGroupRequest {
  name?: string;
  description?: string;
  color?: string;
}

export interface CreatePointsRequest {
  todoId: string;
  points: number;
  estimatedDuration?: string;
  actualDuration?: string;
}
