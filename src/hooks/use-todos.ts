import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '@/services/todo.service';
import type { CreateTodoRequest, UpdateTodoRequest } from '@/types/api';

/**
 * Query keys for todos
 */
export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
  list: (filters?: unknown) => [...todoKeys.lists(), filters] as const,
  details: () => [...todoKeys.all, 'detail'] as const,
  detail: (id: string) => [...todoKeys.details(), id] as const,
  byGroup: (groupId: string) => [...todoKeys.all, 'group', groupId] as const,
};

/**
 * Hook to fetch all todos
 */
export function useTodos() {
  return useQuery({
    queryKey: todoKeys.lists(),
    queryFn: () => todoService.getTodos(),
  });
}

/**
 * Hook to fetch a single todo by ID
 */
export function useTodo(id: string) {
  return useQuery({
    queryKey: todoKeys.detail(id),
    queryFn: () => todoService.getTodoById(id),
    enabled: !!id,
  });
}

/**
 * Hook to fetch todos by group
 */
export function useTodosByGroup(groupId: string) {
  return useQuery({
    queryKey: todoKeys.byGroup(groupId),
    queryFn: () => todoService.getTodosByGroup(groupId),
    enabled: !!groupId,
  });
}

/**
 * Hook to create a new todo
 */
export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTodoRequest) => todoService.createTodo(data),
    onSuccess: () => {
      // Invalidate and refetch todos list
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
}

/**
 * Hook to update a todo
 */
export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodoRequest }) =>
      todoService.updateTodo(id, data),
    onSuccess: (updatedTodo) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
      queryClient.invalidateQueries({ queryKey: todoKeys.detail(updatedTodo.id) });
      if (updatedTodo.groupId) {
        queryClient.invalidateQueries({ queryKey: todoKeys.byGroup(updatedTodo.groupId) });
      }
    },
  });
}

/**
 * Hook to delete a todo
 */
export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => todoService.deleteTodo(id),
    onSuccess: () => {
      // Invalidate and refetch todos list
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });
}

/**
 * Hook to toggle todo completion
 */
export function useToggleTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => todoService.toggleTodoCompletion(id),
    onSuccess: (updatedTodo) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
      queryClient.invalidateQueries({ queryKey: todoKeys.detail(updatedTodo.id) });
      if (updatedTodo.groupId) {
        queryClient.invalidateQueries({ queryKey: todoKeys.byGroup(updatedTodo.groupId) });
      }
    },
  });
}
