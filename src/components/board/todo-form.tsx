'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCreateTodo } from '@/hooks/use-todos';
import { useToast } from '@/hooks/use-toast';
import { useJiraDuration } from '@/hooks/use-jira-duration';
import { TodoStatus, TodoPriority, type CreateTodoRequest } from '@/types/api';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  groupId?: string;
  onSuccess?: () => void;
}

export function TodoForm({ groupId, onSuccess }: TodoFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TodoPriority>(TodoPriority.Medium);
  const [estimatedDuration, setEstimatedDuration] = useState('');
  
  const createTodo = useCreateTodo();
  const toast = useToast();
  const duration = useJiraDuration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    // Validate duration if provided
    if (estimatedDuration && !duration.isValid(estimatedDuration)) {
      toast.error('Invalid duration format', 'Use format like "2h 30m" or "1d 4h"');
      return;
    }

    const todoData: CreateTodoRequest = {
      title: title.trim(),
      description: description.trim() || undefined,
      status: TodoStatus.Active,
      priority,
      groupId: groupId || undefined,
    };

    try {
      await createTodo.mutateAsync(todoData);
      toast.success('Todo created successfully! 🎉');
      
      // Reset form
      setTitle('');
      setDescription('');
      setPriority(TodoPriority.Medium);
      setEstimatedDuration('');
      setIsOpen(false);
      
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to create todo', error instanceof Error ? error.message : undefined);
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="w-full">
        <Plus className="h-4 w-4 mr-2" />
        Create New Todo
      </Button>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Todo</CardTitle>
        <CardDescription>
          Add a new task to your todo list
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter task description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TodoPriority)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value={TodoPriority.Low}>Low</option>
              <option value={TodoPriority.Medium}>Medium</option>
              <option value={TodoPriority.High}>High</option>
              <option value={TodoPriority.Critical}>Critical</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Estimated Duration (optional)</Label>
            <Input
              id="duration"
              placeholder="e.g., 2h 30m or 1d 4h"
              value={estimatedDuration}
              onChange={(e) => setEstimatedDuration(e.target.value)}
            />
            {estimatedDuration && duration.isValid(estimatedDuration) && (
              <p className="text-xs text-muted-foreground">
                = {duration.toHumanReadable(estimatedDuration)}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={createTodo.isPending}>
              {createTodo.isPending ? 'Creating...' : 'Create Todo'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                setTitle('');
                setDescription('');
                setPriority(TodoPriority.Medium);
                setEstimatedDuration('');
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
