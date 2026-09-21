import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransactionFilterState, SortField, SortOrder, TransactionStatus, Region } from '@/types/transaction';

interface TransactionSliceState {
  transactions: Transaction[];
  filters: TransactionFilterState;
  isGenerating: boolean;
}

const initialState: TransactionSliceState = {
  transactions: [], // Loaded on demand / initialized with 10k rows
  filters: {
    searchQuery: '',
    statusFilter: 'All',
    regionFilter: 'All',
    sortField: 'date',
    sortOrder: 'desc',
    page: 1,
    pageSize: 50,
  },
  isGenerating: false,
};

export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
      state.filters.page = 1; // Reset to first page on search change
    },
    setStatusFilter: (state, action: PayloadAction<TransactionStatus | 'All'>) => {
      state.filters.statusFilter = action.payload;
      state.filters.page = 1;
    },
    setRegionFilter: (state, action: PayloadAction<Region | 'All'>) => {
      state.filters.regionFilter = action.payload;
      state.filters.page = 1;
    },
    setSort: (state, action: PayloadAction<{ field: SortField; order?: SortOrder }>) => {
      if (state.filters.sortField === action.payload.field) {
        state.filters.sortOrder = action.payload.order || (state.filters.sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        state.filters.sortField = action.payload.field;
        state.filters.sortOrder = action.payload.order || 'desc';
      }
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.filters.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.filters.pageSize = action.payload;
      state.filters.page = 1;
    },
    resetTransactionFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setTransactions,
  setSearchQuery,
  setStatusFilter,
  setRegionFilter,
  setSort,
  setPage,
  setPageSize,
  resetTransactionFilters,
} = transactionSlice.actions;

export default transactionSlice.reducer;
