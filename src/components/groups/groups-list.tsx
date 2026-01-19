'use client';

import { useGroups } from '@/hooks/use-groups';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, UserMinus } from 'lucide-react';

export function GroupsList() {
  const { data: groups, isLoading, error } = useGroups();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-32" />
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-gray-200 rounded w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error Loading Groups</CardTitle>
          <CardDescription>
            {error instanceof Error ? error.message : 'Failed to load groups'}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Groups</h2>
        <Button size="sm">
          <Users className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups && groups.length > 0 ? (
          groups.map((group) => (
            <Card
              key={group.id}
              className="hover:shadow-md transition-shadow"
              style={{ borderLeftColor: group.color, borderLeftWidth: '4px' }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                {group.description && (
                  <CardDescription>{group.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Members Section */}
                {group.members && group.members.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted-foreground">
                        Members ({group.members.length})
                      </span>
                    </div>
                    <div className="space-y-2">
                      {group.members.slice(0, 3).map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-xs font-medium">
                                {member.user.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium">{member.user.username}</p>
                              <p className="text-xs text-muted-foreground">
                                {member.user.points} points
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={member.role === 'admin' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {member.role}
                            </Badge>
                            {member.role !== 'admin' && (
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6"
                                title="Remove member"
                              >
                                <UserMinus className="h-3 w-3 text-destructive" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      {group.members.length > 3 && (
                        <Button variant="ghost" size="sm" className="w-full">
                          View all {group.members.length} members
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {/* No Members State */}
                {(!group.members || group.members.length === 0) && (
                  <div className="text-center py-4 text-sm text-muted-foreground">
                    No members yet
                  </div>
                )}

                <Button variant="outline" size="sm" className="w-full">
                  View Group Details
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <CardTitle className="mb-2">No groups found</CardTitle>
              <CardDescription>
                Create your first group to start collaborating!
              </CardDescription>
              <Button className="mt-4">
                <Users className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
