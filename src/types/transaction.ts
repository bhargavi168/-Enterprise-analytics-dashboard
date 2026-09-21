export type TransactionStatus = 'Completed' | 'Pending' | 'Failed';

export type Region = 'Europe' | 'APAC' | 'LATAM' | 'MEA';

export interface Transaction {
  id: string;
  userEmail: string;
  userName: string;
  region: Region;
  amount: number; // raw amount in USD
  status: TransactionStatus;
  date: string; // ISO date string
  merchant: string;
}

export type SortField = 'id' | 'amount' | 'date' | 'userEmail';
export type SortOrder = 'asc' | 'desc';

export interface TransactionFilterState {
  searchQuery: string;
  statusFilter: TransactionStatus | 'All';
  regionFilter: Region | 'All';
  sortField: SortField;
  sortOrder: SortOrder;
  page: number;
  pageSize: number;
}
