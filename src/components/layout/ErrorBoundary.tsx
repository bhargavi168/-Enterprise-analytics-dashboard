import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
          <div className="p-4 rounded-full bg-destructive/10 text-destructive mb-4">
            <AlertTriangle className="h-10 w-10" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Something went wrong</h2>
          <p className="text-sm text-muted-foreground max-w-md mt-2 mb-6">
            An unexpected error occurred in the analytics rendering pipeline:
            <span className="block mt-1 font-mono text-xs bg-muted/60 p-2 rounded text-destructive">
              {this.state.error?.message || 'Unknown error'}
            </span>
          </p>
          <Button onClick={this.handleReset} variant="default">
            <RefreshCw className="mr-2 h-4 w-4" /> Reload Dashboard
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
