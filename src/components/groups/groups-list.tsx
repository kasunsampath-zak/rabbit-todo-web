'use client';

import { useGroups } from '@/hooks/use-groups';

export function GroupsList() {
  const { data: groups, isLoading, error } = useGroups();

  if (isLoading) {
    return <div className="p-4">Loading groups...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error loading groups: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Groups</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups && groups.length > 0 ? (
          groups.map((group) => (
            <div
              key={group.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              style={{ borderLeftColor: group.color, borderLeftWidth: '4px' }}
            >
              <h3 className="font-semibold text-lg">{group.name}</h3>
              {group.description && (
                <p className="text-gray-600 mt-2 text-sm">{group.description}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No groups found. Create your first group!</p>
        )}
      </div>
    </div>
  );
}
