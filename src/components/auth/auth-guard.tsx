'use client';

import { type ReactNode } from 'react';
import { useAuth } from './auth-provider';
import { LoginForm } from './login-form';

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <>{children}</>;
}
