import { Menu, Sun, Moon, LogOut, DollarSign } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrency, setDateRange } from '@/store/slices/filterSlice';
import { Currency, DateRange } from '@/types/dashboard';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export function Header({ onOpenSidebar }: HeaderProps) {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { currency, dateRange } = useAppSelector((state) => state.filters);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-card/85 px-4 md:px-6 backdrop-blur-xl">
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 rounded-lg text-muted-foreground hover:bg-accent md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:block">
          <h1 className="text-base font-bold text-foreground">Enterprise FinTech Hub</h1>
          <p className="text-xs text-muted-foreground">Real-time Performance & Virtualized Transactions</p>
        </div>
      </div>

      {/* Right side global controls */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Currency Switcher */}
        <div className="flex items-center space-x-1 rounded-lg border bg-background p-1 text-xs font-medium shadow-sm">
          <DollarSign className="h-3.5 w-3.5 text-muted-foreground ml-1 hidden sm:inline" />
          {(['USD', 'EUR', 'INR'] as Currency[]).map((c) => (
            <button
              key={c}
              onClick={() => dispatch(setCurrency(c))}
              className={`px-2 py-1 rounded-md text-xs font-semibold transition-all ${
                currency === c
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Date Range Selector */}
        <select
          value={dateRange}
          onChange={(e) => dispatch(setDateRange(e.target.value as DateRange))}
          className="hidden md:block h-8 rounded-lg border bg-background px-2.5 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="ytd">Year to Date (YTD)</option>
        </select>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border bg-background text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-600" />}
        </button>

        {/* Logout */}
        <Button variant="ghost" size="sm" onClick={logout} className="text-xs">
          <LogOut className="h-4 w-4 mr-1.5" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
