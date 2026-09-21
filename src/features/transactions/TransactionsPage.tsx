import { useTransactions } from '@/hooks/useTransactions';
import { TransactionFilters } from './TransactionFilters';
import { VirtualTransactionTable } from './VirtualTransactionTable';
import { Receipt, Zap } from 'lucide-react';

export function TransactionsPage() {
  const { transactions, totalCount, filteredCount, exportCSV, activeCurrency } = useTransactions();

  return (
    <div className="space-y-4">
      {/* Title & Info Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-2">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Receipt className="h-5 w-5 text-indigo-500" />
            Virtualized Transaction Ledger
          </h2>
          <p className="text-xs text-muted-foreground">
            High-performance data grid handling 10,000+ live transactions with zero layout thrashing
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg border">
          <Zap className="h-3.5 w-3.5 text-amber-400" />
          <span>Target: 60 FPS Scrolling @ 10,000 Records</span>
        </div>
      </div>

      {/* Filters Bar */}
      <TransactionFilters
        totalCount={totalCount}
        filteredCount={filteredCount}
        onExportCSV={exportCSV}
      />

      {/* Virtual Table */}
      <VirtualTransactionTable
        transactions={transactions}
        activeCurrency={activeCurrency}
      />
    </div>
  );
}
