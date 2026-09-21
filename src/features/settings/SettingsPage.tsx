import { ProfileForm } from './ProfileForm';
import { ThemeToggle } from './ThemeToggle';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';
import { Settings as SettingsIcon, ShieldCheck, UserCheck } from 'lucide-react';

export function SettingsPage() {
  const { user, isAdmin } = useAuth();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <SettingsIcon className="h-5 w-5 text-indigo-500" />
          Settings & Preferences
        </h2>
        <p className="text-xs text-muted-foreground">
          Manage user profile information, system color themes, and RBAC security credentials
        </p>
      </div>

      <ThemeToggle />

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-primary" /> User Profile Information
            </span>
            <Badge variant={isAdmin ? 'admin' : 'viewer'}>
              {user?.role?.toUpperCase()} MODE
            </Badge>
          </CardTitle>
          <CardDescription className="text-xs">
            React Hook Form + Zod schema validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>

      {/* RBAC Reference Guide */}
      <Card className="border-dashed bg-muted/20">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-indigo-500" />
            Role-Based Access Control (RBAC) Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs text-muted-foreground">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-foreground">Admin Role</span>
                <Badge variant="admin">FULL ACCESS</Badge>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-muted-foreground">
                <li>Export 10,000 transactions to CSV</li>
                <li>Edit & save profile settings</li>
                <li>Full access to executive filters & KPIs</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-foreground">Viewer Role</span>
                <Badge variant="viewer">READ ONLY</Badge>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-muted-foreground">
                <li>Read-only access to charts & table</li>
                <li>CSV Export button disabled with notice</li>
                <li>Profile editing fields locked</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
