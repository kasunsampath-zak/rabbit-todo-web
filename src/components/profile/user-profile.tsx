'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useUserStats } from '@/hooks/use-dashboard';
import { useAuth } from '@/components/auth/auth-provider';
import { Trophy, Target, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

export function UserProfile() {
  const { username } = useAuth();
  const { data: stats, isLoading, error } = useUserStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-32" />
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error Loading Profile</CardTitle>
          <CardDescription>
            {error instanceof Error ? error.message : 'Failed to load user profile'}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!stats) {
    return null;
  }

  const completionRate = stats.totalTodos > 0 
    ? Math.round((stats.closedTodos / stats.totalTodos) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl font-bold">
                {username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <CardTitle className="text-2xl">{username}</CardTitle>
              <CardDescription>User Profile</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Gamification Points */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <CardTitle>Gamification Points</CardTitle>
          </div>
          <CardDescription>
            Your total achievement score
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary">{stats.totalPoints}</div>
          <p className="text-sm text-muted-foreground mt-2">
            Earn +2 points for completing tasks
          </p>
        </CardContent>
      </Card>

      {/* Activity Stats */}
      <div>
        <h3 className="text-xl font-bold mb-4">Activity Statistics</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTodos}</div>
              <p className="text-xs text-muted-foreground">
                All time
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <Clock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTodos}</div>
              <p className="text-xs text-muted-foreground">
                Not started
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inProgressTodos}</div>
              <p className="text-xs text-muted-foreground">
                Working on
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.closedTodos}</div>
              <p className="text-xs text-muted-foreground">
                Finished
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <CardTitle>Performance</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Completion Rate</span>
              <span className="text-sm font-bold">{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.activeTodos}</div>
              <div className="text-xs text-muted-foreground">To Start</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.inProgressTodos}</div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.closedTodos}</div>
              <div className="text-xs text-muted-foreground">Done</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievement Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>
            Your milestones and accomplishments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {stats.closedTodos >= 1 && (
              <Badge variant="success" className="text-sm py-1 px-3">
                🎯 First Task
              </Badge>
            )}
            {stats.closedTodos >= 10 && (
              <Badge variant="success" className="text-sm py-1 px-3">
                🏆 10 Tasks
              </Badge>
            )}
            {stats.closedTodos >= 50 && (
              <Badge variant="success" className="text-sm py-1 px-3">
                🌟 50 Tasks
              </Badge>
            )}
            {stats.closedTodos >= 100 && (
              <Badge variant="success" className="text-sm py-1 px-3">
                💎 100 Tasks
              </Badge>
            )}
            {stats.totalPoints >= 100 && (
              <Badge variant="info" className="text-sm py-1 px-3 bg-blue-500">
                ⭐ 100+ Points
              </Badge>
            )}
            {stats.totalPoints >= 500 && (
              <Badge variant="info" className="text-sm py-1 px-3 bg-blue-500">
                🚀 500+ Points
              </Badge>
            )}
            {stats.closedTodos === 0 && stats.activeTodos === 0 && stats.inProgressTodos === 0 && (
              <div className="text-sm text-muted-foreground">
                Complete tasks to unlock achievements!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
