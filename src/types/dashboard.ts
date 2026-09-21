export type Currency = 'USD' | 'EUR' | 'INR';

export type DateRange = '7d' | '30d' | '90d' | 'ytd';

export interface KpiMetric {
  id: string;
  title: string;
  value: number;
  change: number; // percentage change vs last month, e.g., +12.5
  trend: 'up' | 'down';
  format: 'currency' | 'number' | 'percentage';
}

export interface MonthlyRevenueData {
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface RegionalSalesData {
  region: 'Europe' | 'APAC' | 'LATAM' | 'MEA';
  sales: number;
  transactionsCount: number;
}

export interface UserSegmentData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export interface FilterState {
  currency: Currency;
  dateRange: DateRange;
  selectedRegion: string | 'all';
}
