import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border bg-card">
      <div>
        <h4 className="text-sm font-semibold text-foreground">Appearance Theme</h4>
        <p className="text-xs text-muted-foreground">Select dark or light color scheme (persisted to localStorage)</p>
      </div>

      <div className="flex items-center space-x-1 p-1 rounded-xl border bg-muted/40">
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            theme === 'light'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Sun className="h-4 w-4 text-amber-500" />
          <span>Light</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            theme === 'dark'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Moon className="h-4 w-4 text-indigo-400" />
          <span>Dark</span>
        </button>
      </div>
    </div>
  );
}
