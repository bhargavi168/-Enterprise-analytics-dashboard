import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ label = 'Loading analytics data...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] w-full space-y-3">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <Loader2 className="h-6 w-6 text-primary absolute inset-0 m-auto animate-pulse" />
      </div>
      <p className="text-sm font-medium text-muted-foreground animate-pulse">{label}</p>
    </div>
  );
}
