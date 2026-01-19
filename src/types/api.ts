// API Response types matching Rust backend structures

// Enums for Status and Priority
export enum TodoStatus {
  Active = 'Active',
  InProgress = 'InProgress',
  Closed = 'Closed',
}

export enum TodoPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Critical = 'Critical',
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  status: TodoStatus;
  priority?: TodoPriority;
  groupId?: string;
  points?: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  email?: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}

export interface GroupMember {
  id: string;
  userId: string;
  groupId: string;
  role: 'admin' | 'member';
  user: User;
  joinedAt: string;
}

export interface TodoGroup {
  id: string;
  name: string;
  description?: string;
  color?: string;
  members?: GroupMember[];
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

// Stats interfaces
export interface UserStats {
  userId: string;
  totalPoints: number;
  activeTodos: number;
  inProgressTodos: number;
  closedTodos: number;
  totalTodos: number;
}

export interface GroupStats {
  groupId: string;
  activeTodos: number;
  inProgressTodos: number;
  closedTodos: number;
  totalTodos: number;
  totalMembers: number;
}

export interface DashboardStats {
  user: UserStats;
  groups: GroupStats[];
}

// Request types
export interface CreateTodoRequest {
  title: string;
  description?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  groupId?: string;
  points?: number;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  status?: TodoStatus;
  priority?: TodoPriority;
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
