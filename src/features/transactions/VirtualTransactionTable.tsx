import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ArrowUpDown, ArrowUp, ArrowDown, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Transaction, SortField } from '@/types/transaction';
import { Currency } from '@/types/dashboard';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSort } from '@/store/slices/transactionSlice';
import { EmptyState } from '@/components/common/EmptyState';

interface VirtualTransactionTableProps {
  transactions: Transaction[];
  activeCurrency: Currency;
}

export function VirtualTransactionTable({
  transactions,
  activeCurrency,
}: VirtualTransactionTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { sortField, sortOrder } = useAppSelector((state) => state.transactions.filters);

  // Configure TanStack Virtualizer for 60 FPS scrolling
  const rowVirtualizer = useVirtualizer({
    count: transactions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48, // row height in pixels
    overscan: 12, // render 12 extra rows buffer for seamless smooth scrolling
  });

  const handleSort = (field: SortField) => {
    dispatch(setSort({ field }));
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-3 w-3 ml-1 text-muted-foreground opacity-50" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="h-3 w-3 ml-1 text-primary" />
    ) : (
      <ArrowDown className="h-3 w-3 ml-1 text-primary" />
    );
  };

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'Completed':
        return (
          <Badge variant="success" className="text-[11px] gap-1">
            <CheckCircle2 className="h-3 w-3 text-emerald-500" /> Completed
          </Badge>
        );
      case 'Pending':
        return (
          <Badge variant="warning" className="text-[11px] gap-1">
            <Clock className="h-3 w-3 text-amber-500" /> Pending
          </Badge>
        );
      case 'Failed':
        return (
          <Badge variant="destructive" className="text-[11px] gap-1">
            <XCircle className="h-3 w-3 text-rose-400" /> Failed
          </Badge>
        );
    }
  };

  if (transactions.length === 0) {
    return <EmptyState title="No transactions found" description="Try broadening your search or clear filters." />;
  }

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden flex flex-col">
      {/* Table Header */}
      <div className="grid grid-cols-12 bg-muted/50 border-b px-4 py-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
        <div
          onClick={() => handleSort('id')}
          className="col-span-2 flex items-center cursor-pointer hover:text-foreground transition-colors"
        >
          <span>ID</span>
          {renderSortIcon('id')}
        </div>
        <div
          onClick={() => handleSort('userEmail')}
          className="col-span-3 flex items-center cursor-pointer hover:text-foreground transition-colors"
        >
          <span>User Email</span>
          {renderSortIcon('userEmail')}
        </div>
        <div className="col-span-2 hidden sm:block">Region</div>
        <div
          onClick={() => handleSort('amount')}
          className="col-span-2 flex items-center justify-end cursor-pointer hover:text-foreground transition-colors text-right"
        >
          <span>Amount</span>
          {renderSortIcon('amount')}
        </div>
        <div className="col-span-2 sm:col-span-1 text-center">Status</div>
        <div
          onClick={() => handleSort('date')}
          className="col-span-1 hidden lg:flex items-center justify-end cursor-pointer hover:text-foreground transition-colors text-right"
        >
          <span>Date</span>
          {renderSortIcon('date')}
        </div>
      </div>

      {/* TanStack Virtualized Scrollable Viewport */}
      <div
        ref={parentRef}
        className="overflow-auto max-h-[560px] w-full relative divide-y divide-border/40"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const txn = transactions[virtualRow.index];
            return (
              <div
                key={txn.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="grid grid-cols-12 items-center px-4 py-2 text-xs hover:bg-muted/40 transition-colors"
              >
                <div className="col-span-2 font-mono font-semibold text-primary truncate">
                  {txn.id}
                </div>
                <div className="col-span-3 truncate">
                  <span className="font-medium text-foreground block truncate">{txn.userName}</span>
                  <span className="text-[11px] text-muted-foreground block truncate">{txn.userEmail}</span>
                </div>
                <div className="col-span-2 hidden sm:block text-muted-foreground font-medium">
                  {txn.region}
                </div>
                <div className="col-span-2 font-mono font-bold text-foreground text-right pr-2">
                  {formatCurrency(txn.amount, activeCurrency)}
                </div>
                <div className="col-span-2 sm:col-span-1 text-center">
                  {getStatusBadge(txn.status)}
                </div>
                <div className="col-span-1 hidden lg:block text-right text-muted-foreground text-[11px] font-mono">
                  {formatDate(txn.date)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Virtual Status */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-t text-xs text-muted-foreground">
        <span>
          Rendering <strong className="text-foreground">{rowVirtualizer.getVirtualItems().length}</strong> visible DOM nodes out of <strong className="text-foreground">{transactions.length.toLocaleString()}</strong> rows
        </span>
        <span className="font-mono text-[11px]">Virtualizer: @tanstack/react-virtual (60 FPS)</span>
      </div>
    </div>
  );
}
