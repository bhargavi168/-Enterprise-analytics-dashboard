import { Search, Download, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setSearchQuery,
  setStatusFilter,
  setRegionFilter,
  resetTransactionFilters,
} from '@/store/slices/transactionSlice';
import { TransactionStatus, Region } from '@/types/transaction';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/Toast';

interface TransactionFiltersProps {
  totalCount: number;
  filteredCount: number;
  onExportCSV: () => void;
}

export function TransactionFilters({
  totalCount,
  filteredCount,
  onExportCSV,
}: TransactionFiltersProps) {
  const dispatch = useAppDispatch();
  const { searchQuery, statusFilter, regionFilter } = useAppSelector(
    (state) => state.transactions.filters
  );
  const { isAdmin } = useAuth();
  const { showToast } = useToast();

  const handleExportClick = () => {
    if (!isAdmin) {
      showToast({
        type: 'error',
        title: 'Permission Denied',
        description: 'CSV export requires Admin privileges.',
      });
      return;
    }
    onExportCSV();
    showToast({
      type: 'success',
      title: 'Export Started',
      description: `Downloading ${filteredCount.toLocaleString()} transaction records to CSV...`,
    });
  };

  return (
    <div className="flex flex-col space-y-3 p-4 rounded-xl border bg-card shadow-sm">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        {/* Search bar */}
        <div className="w-full md:w-80">
          <Input
            placeholder="Search email, ID, region..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            icon={<Search className="h-4 w-4" />}
            className="h-9 text-xs"
          />
        </div>

        {/* Filters dropdown & Live Badge & Export Button */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => dispatch(setStatusFilter(e.target.value as TransactionStatus | 'All'))}
            className="h-9 px-3 rounded-lg border bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>

          {/* Region Filter */}
          <select
            value={regionFilter}
            onChange={(e) => dispatch(setRegionFilter(e.target.value as Region | 'All'))}
            className="h-9 px-3 rounded-lg border bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="All">All Regions</option>
            <option value="Europe">Europe</option>
            <option value="APAC">APAC</option>
            <option value="LATAM">LATAM</option>
            <option value="MEA">MEA</option>
          </select>

          {/* Reset Filters */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch(resetTransactionFilters())}
            className="h-9 px-2.5 text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>

          {/* Live Virtualized Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold shadow-sm">
            <Sparkles className="h-3.5 w-3.5 mr-1.5 animate-pulse text-indigo-500" />
            <span>{filteredCount.toLocaleString()} / {totalCount.toLocaleString()} rows — live</span>
          </div>

          {/* CSV Export Button (Admin Only RBAC) */}
          {isAdmin ? (
            <Button
              variant="default"
              size="sm"
              onClick={handleExportClick}
              className="h-9 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Export CSV (Admin)
            </Button>
          ) : (
            <div title="CSV Export requires Admin privileges">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="h-9 text-xs font-medium opacity-60 cursor-not-allowed"
              >
                <ShieldAlert className="h-3.5 w-3.5 mr-1 text-amber-500" />
                Export CSV (Restricted)
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
