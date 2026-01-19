'use client';

import { useTodos } from '@/hooks/use-todos';

export function TodoBoard() {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) {
    return <div className="p-4">Loading todos...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error loading todos: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Todo Board</h2>
      <div className="space-y-2">
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{todo.title}</h3>
                  {todo.description && (
                    <p className="text-gray-600 mt-1">{todo.description}</p>
                  )}
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    todo.completed
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {todo.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No todos found. Create your first todo!</p>
        )}
      </div>
    </div>
  );
}
