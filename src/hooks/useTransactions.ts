import { useEffect, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTransactions } from '@/store/slices/transactionSlice';
import { generateMockTransactions } from '@/services/mockData';
import { Transaction } from '@/types/transaction';
import { downloadCSV, formatCurrency } from '@/lib/utils';

// Singleton cache for 10k transactions to avoid unnecessary re-generation
let cachedTransactions: Transaction[] | null = null;

export function useTransactions() {
  const dispatch = useAppDispatch();
  const { transactions, filters } = useAppSelector((state) => state.transactions);
  const activeCurrency = useAppSelector((state) => state.filters.currency);

  // Initialize transactions if empty
  useEffect(() => {
    if (transactions.length === 0) {
      if (!cachedTransactions) {
        cachedTransactions = generateMockTransactions(10000);
      }
      dispatch(setTransactions(cachedTransactions));
    }
  }, [dispatch, transactions.length]);

  // Perform search, filter, and multi-column sort using useMemo
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Search query filter (Email, ID, Merchant, Region)
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.id.toLowerCase().includes(q) ||
          t.userEmail.toLowerCase().includes(q) ||
          t.userName.toLowerCase().includes(q) ||
          t.region.toLowerCase().includes(q) ||
          t.merchant.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (filters.statusFilter !== 'All') {
      result = result.filter((t) => t.status === filters.statusFilter);
    }

    // Region filter
    if (filters.regionFilter !== 'All') {
      result = result.filter((t) => t.region === filters.regionFilter);
    }

    // Multi-column Sorting
    result.sort((a, b) => {
      const { sortField, sortOrder } = filters;
      let cmp = 0;

      if (sortField === 'id') {
        cmp = a.id.localeCompare(b.id);
      } else if (sortField === 'amount') {
        cmp = a.amount - b.amount;
      } else if (sortField === 'date') {
        cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortField === 'userEmail') {
        cmp = a.userEmail.localeCompare(b.userEmail);
      }

      return sortOrder === 'asc' ? cmp : -cmp;
    });

    return result;
  }, [transactions, filters]);

  // CSV Export for Admin
  const exportCSV = useCallback(() => {
    const headers = ['Transaction ID', 'User Email', 'User Name', 'Region', 'Amount (USD)', 'Formatted Amount', 'Status', 'Date', 'Merchant'];
    const rows = filteredTransactions.map((t) => [
      t.id,
      t.userEmail,
      `"${t.userName}"`,
      t.region,
      t.amount.toFixed(2),
      `"${formatCurrency(t.amount, activeCurrency)}"`,
      t.status,
      t.date,
      `"${t.merchant}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadCSV(`transactions_export_${new Date().toISOString().slice(0, 10)}.csv`, csvContent);
  }, [filteredTransactions, activeCurrency]);

  return {
    transactions: filteredTransactions,
    totalCount: transactions.length,
    filteredCount: filteredTransactions.length,
    filters,
    exportCSV,
    activeCurrency,
  };
}
