import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pointsService } from '@/services/points.service';
import type { CreatePointsRequest } from '@/types/api';

/**
 * Query keys for points
 */
export const pointsKeys = {
  all: ['points'] as const,
  lists: () => [...pointsKeys.all, 'list'] as const,
  list: (filters?: unknown) => [...pointsKeys.lists(), filters] as const,
  details: () => [...pointsKeys.all, 'detail'] as const,
  detail: (id: string) => [...pointsKeys.details(), id] as const,
  byTodo: (todoId: string) => [...pointsKeys.all, 'todo', todoId] as const,
};

/**
 * Hook to fetch all points
 */
export function useAllPoints() {
  return useQuery({
    queryKey: pointsKeys.lists(),
    queryFn: () => pointsService.getAllPoints(),
  });
}

/**
 * Hook to fetch points by todo ID
 */
export function usePointsByTodo(todoId: string) {
  return useQuery({
    queryKey: pointsKeys.byTodo(todoId),
    queryFn: () => pointsService.getPointsByTodoId(todoId),
    enabled: !!todoId,
  });
}

/**
 * Hook to fetch a single points record by ID
 */
export function usePoints(id: string) {
  return useQuery({
    queryKey: pointsKeys.detail(id),
    queryFn: () => pointsService.getPointsById(id),
    enabled: !!id,
  });
}

/**
 * Hook to create a new points record
 */
export function useCreatePoints() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePointsRequest) => pointsService.createPoints(data),
    onSuccess: (newPoints) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: pointsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: pointsKeys.byTodo(newPoints.todoId) });
    },
  });
}

/**
 * Hook to update a points record
 */
export function useUpdatePoints() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreatePointsRequest> }) =>
      pointsService.updatePoints(id, data),
    onSuccess: (updatedPoints) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: pointsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: pointsKeys.detail(updatedPoints.id) });
      queryClient.invalidateQueries({ queryKey: pointsKeys.byTodo(updatedPoints.todoId) });
    },
  });
}

/**
 * Hook to delete a points record
 */
export function useDeletePoints() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => pointsService.deletePoints(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: pointsKeys.lists() });
    },
  });
}
