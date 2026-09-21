import * as React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Role } from '@/types/auth';

interface RoleGuardProps {
  allowedRoles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
  hideIfDenied?: boolean;
}

export function RoleGuard({ allowedRoles, children, fallback, hideIfDenied = false }: RoleGuardProps) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    if (hideIfDenied) return null;
    return (
      fallback || (
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-medium text-center">
          Admin permission required for this action
        </div>
      )
    );
  }

  return <>{children}</>;
}
