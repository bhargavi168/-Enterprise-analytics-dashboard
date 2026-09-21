import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, TrendingUp, ShieldCheck, Eye, Sparkles } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice';
import { mockLoginApi } from '@/services/api';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';

export function LoginPage() {
  const [email, setEmail] = useState('admin@acme.com');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    dispatch(loginStart());

    try {
      const response = await mockLoginApi(email, password);
      dispatch(loginSuccess(response));
      showToast({
        type: 'success',
        title: `Welcome back, ${response.user.name}`,
        description: `Logged in as ${response.user.role.toUpperCase()}`,
      });
      navigate('/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setErrorMessage(message);
      dispatch(loginFailure(message));
      showToast({
        type: 'error',
        title: 'Authentication Failed',
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('123456');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4 relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

      <Card className="w-full max-w-md bg-card/90 backdrop-blur-2xl border-white/10 shadow-2xl z-10">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-xl shadow-indigo-500/30">
            <TrendingUp className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            ApexFin Analytics
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Enterprise FinTech Dashboard & Performance Portal
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Quick Demo Credentials Selection */}
          <div className="p-3 rounded-xl border bg-muted/30 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" /> Demo Quick Select:
              </span>
              <span className="font-mono text-[10px]">Pass: 123456</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('admin@acme.com')}
                className={`flex items-center justify-center space-x-1.5 p-2 rounded-lg border text-xs font-medium transition-all ${
                  email === 'admin@acme.com'
                    ? 'border-indigo-500 bg-indigo-500/15 text-indigo-400 font-semibold'
                    : 'bg-background/50 hover:bg-background text-muted-foreground'
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
                <span>Admin User</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('viewer@acme.com')}
                className={`flex items-center justify-center space-x-1.5 p-2 rounded-lg border text-xs font-medium transition-all ${
                  email === 'viewer@acme.com'
                    ? 'border-cyan-500 bg-cyan-500/15 text-cyan-400 font-semibold'
                    : 'bg-background/50 hover:bg-background text-muted-foreground'
                }`}
              >
                <Eye className="h-3.5 w-3.5 text-cyan-400" />
                <span>Viewer User</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@acme.com"
                icon={<Mail className="h-4 w-4" />}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-foreground">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<Lock className="h-4 w-4" />}
                required
              />
            </div>

            {errorMessage && (
              <div className="p-2.5 rounded-lg bg-destructive/15 border border-destructive/30 text-destructive text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <Button
              type="submit"
              variant="gradient"
              className="w-full h-11 text-sm font-semibold"
              isLoading={isLoading}
            >
              Sign In to Analytics Hub
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center border-t py-3 text-[11px] text-muted-foreground">
          Protected by Axios Bearer Interceptor & Redux RBAC
        </CardFooter>
      </Card>
    </div>
  );
}
