'use client';

import { useTodos, useUpdateTodo } from '@/hooks/use-todos';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TodoStatus, type Todo } from '@/types/api';
import { CheckCircle2, Clock, PlayCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const statusConfig = {
  [TodoStatus.Active]: {
    label: 'Active',
    icon: Clock,
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    iconColor: 'text-blue-500',
  },
  [TodoStatus.InProgress]: {
    label: 'In Progress',
    icon: PlayCircle,
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    iconColor: 'text-yellow-500',
  },
  [TodoStatus.Closed]: {
    label: 'Closed',
    icon: CheckCircle2,
    color: 'bg-green-100 text-green-800 border-green-300',
    iconColor: 'text-green-500',
  },
};

function TodoCard({ todo }: { todo: Todo }) {
  const updateTodo = useUpdateTodo();
  const toast = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: TodoStatus) => {
    if (isUpdating) return;

    setIsUpdating(true);
    const oldStatus = todo.status;
    const isClosing = newStatus === TodoStatus.Closed && oldStatus !== TodoStatus.Closed;
    const isReopening = oldStatus === TodoStatus.Closed && newStatus !== TodoStatus.Closed;

    try {
      await updateTodo.mutateAsync({
        id: todo.id,
        data: { status: newStatus },
      });

      // Show point feedback
      if (isClosing) {
        toast.success('Task completed! +2 points 🎉', 'Great job!');
      } else if (isReopening) {
        toast.warning('Task reopened', '-2 points have been deducted');
      } else {
        toast.success('Status updated');
      }
    } catch (error) {
      toast.error('Failed to update status', error instanceof Error ? error.message : undefined);
    } finally {
      setIsUpdating(false);
    }
  };

  const getNextStatus = (): TodoStatus | null => {
    switch (todo.status) {
      case TodoStatus.Active:
        return TodoStatus.InProgress;
      case TodoStatus.InProgress:
        return TodoStatus.Closed;
      case TodoStatus.Closed:
        return null;
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus();
  const config = statusConfig[todo.status];
  const Icon = config.icon;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base font-semibold">{todo.title}</CardTitle>
          <Icon className={`h-4 w-4 flex-shrink-0 ${config.iconColor}`} />
        </div>
        {todo.description && (
          <CardDescription className="text-sm">{todo.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        {todo.points && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Points:</span>
            <Badge variant="outline">{todo.points}</Badge>
          </div>
        )}
        {nextStatus && (
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => handleStatusChange(nextStatus)}
            disabled={isUpdating}
          >
            Move to {statusConfig[nextStatus].label}
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        )}
        {todo.status === TodoStatus.Closed && (
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => handleStatusChange(TodoStatus.Active)}
            disabled={isUpdating}
          >
            Reopen Task
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export function TodoBoard() {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) {
    return <div className="p-4">Loading todos...</div>;
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error Loading Todos</CardTitle>
          <CardDescription>
            {error instanceof Error ? error.message : 'Failed to load todos'}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Group todos by status
  const todosByStatus = {
    [TodoStatus.Active]: todos?.filter((t) => t.status === TodoStatus.Active) || [],
    [TodoStatus.InProgress]: todos?.filter((t) => t.status === TodoStatus.InProgress) || [],
    [TodoStatus.Closed]: todos?.filter((t) => t.status === TodoStatus.Closed) || [],
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Todo Board</h2>
        <div className="text-sm text-muted-foreground">
          {todos?.length || 0} total tasks
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(statusConfig).map(([status, config]) => {
          const Icon = config.icon;
          const statusTodos = todosByStatus[status as TodoStatus];

          return (
            <div key={status} className="space-y-3">
              <div className={`rounded-lg p-3 border-2 ${config.color}`}>
                <div className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${config.iconColor}`} />
                  <h3 className="font-semibold">{config.label}</h3>
                  <Badge variant="outline" className="ml-auto">
                    {statusTodos.length}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                {statusTodos.length > 0 ? (
                  statusTodos.map((todo) => (
                    <TodoCard key={todo.id} todo={todo} />
                  ))
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center text-sm text-muted-foreground">
                      No tasks in this column
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
