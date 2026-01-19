'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDashboardStats } from '@/hooks/use-dashboard';
import { CheckCircle2, Clock, Users, Target } from 'lucide-react';

export function Dashboard() {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-24" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16" />
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
          <CardTitle className="text-destructive">Error Loading Dashboard</CardTitle>
          <CardDescription>
            {error instanceof Error ? error.message : 'Failed to load dashboard data'}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!stats) {
    return null;
  }

  const { user, groups } = stats;

  return (
    <div className="space-y-6">
      {/* User Stats Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Statistics</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.totalPoints}</div>
              <p className="text-xs text-muted-foreground">
                Gamification score
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.activeTodos}</div>
              <p className="text-xs text-muted-foreground">
                Not started yet
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.inProgressTodos}</div>
              <p className="text-xs text-muted-foreground">
                Currently working on
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.closedTodos}</div>
              <p className="text-xs text-muted-foreground">
                Tasks finished
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Group Stats Section */}
      {groups && groups.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Group Statistics</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <Card key={group.groupId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Group Stats</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardDescription>
                    {group.totalMembers} member{group.totalMembers !== 1 ? 's' : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active</span>
                    <Badge variant="info" className="bg-blue-500">
                      {group.activeTodos}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">In Progress</span>
                    <Badge variant="warning" className="bg-yellow-500">
                      {group.inProgressTodos}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Closed</span>
                    <Badge variant="success" className="bg-green-500">
                      {group.closedTodos}
                    </Badge>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-sm">Total</span>
                      <span>{group.totalTodos}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State for Groups */}
      {(!groups || groups.length === 0) && (
        <Card>
          <CardHeader>
            <CardTitle>No Group Statistics</CardTitle>
            <CardDescription>
              Join or create a group to see group statistics here
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
