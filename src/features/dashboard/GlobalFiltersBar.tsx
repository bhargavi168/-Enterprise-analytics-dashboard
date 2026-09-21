import { Calendar, Filter, RefreshCw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrency, setDateRange, setSelectedRegion, resetFilters } from '@/store/slices/filterSlice';
import { Currency, DateRange } from '@/types/dashboard';
import { Button } from '@/components/ui/Button';

export function GlobalFiltersBar() {
  const dispatch = useAppDispatch();
  const { currency, dateRange, selectedRegion } = useAppSelector((state) => state.filters);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border bg-card/60 backdrop-blur-md shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Filter className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-foreground">Global Analytics Scope</h3>
          <p className="text-[11px] text-muted-foreground">Updates KPIs and charts instantly via Redux state</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Currency selection */}
        <div className="flex items-center space-x-1 rounded-lg border bg-background p-1 text-xs font-medium">
          {(['USD', 'EUR', 'INR'] as Currency[]).map((c) => (
            <button
              key={c}
              onClick={() => dispatch(setCurrency(c))}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                currency === c
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Date range picker */}
        <div className="relative flex items-center">
          <Calendar className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <select
            value={dateRange}
            onChange={(e) => dispatch(setDateRange(e.target.value as DateRange))}
            className="h-8 pl-8 pr-3 rounded-lg border bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
            <option value="90d">90 Days</option>
            <option value="ytd">Year To Date</option>
          </select>
        </div>

        {/* Region filter */}
        <select
          value={selectedRegion}
          onChange={(e) => dispatch(setSelectedRegion(e.target.value))}
          className="h-8 px-3 rounded-lg border bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="all">All Regions</option>
          <option value="Europe">Europe</option>
          <option value="APAC">APAC</option>
          <option value="LATAM">LATAM</option>
          <option value="MEA">MEA</option>
        </select>

        {/* Reset button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => dispatch(resetFilters())}
          className="h-8 text-xs px-2.5"
          title="Reset to default scope"
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1" />
          Reset
        </Button>
      </div>
    </div>
  );
}
