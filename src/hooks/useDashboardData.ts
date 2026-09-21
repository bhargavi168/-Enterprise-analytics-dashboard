import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { MOCK_MONTHLY_REVENUE, MOCK_REGIONAL_SALES, MOCK_USER_SEGMENTS } from '@/services/mockData';
import { KpiMetric } from '@/types/dashboard';
import { CURRENCY_RATES } from '@/lib/utils';

export function useDashboardData() {
  const { currency, dateRange } = useAppSelector((state) => state.filters);
  const rate = CURRENCY_RATES[currency]?.rate || 1.0;

  // Recalculate KPI metrics using useMemo
  const kpiMetrics: KpiMetric[] = useMemo(() => {
    // Multipliers based on date range for dynamic updates
    let rangeMultiplier = 1.0;
    if (dateRange === '7d') rangeMultiplier = 0.25;
    else if (dateRange === '90d') rangeMultiplier = 2.8;
    else if (dateRange === 'ytd') rangeMultiplier = 3.5;

    const baseRevenue = 124500 * rangeMultiplier;
    const baseActiveUsers = Math.round(12450 * (rangeMultiplier > 1 ? Math.sqrt(rangeMultiplier) : rangeMultiplier));
    const baseTransactions = Math.round(8230 * rangeMultiplier);
    const baseConversion = 4.2;

    return [
      {
        id: 'kpi-revenue',
        title: 'Total Revenue',
        value: baseRevenue * rate,
        change: 12.5,
        trend: 'up',
        format: 'currency',
      },
      {
        id: 'kpi-users',
        title: 'Active Users',
        value: baseActiveUsers,
        change: 8.2,
        trend: 'up',
        format: 'number',
      },
      {
        id: 'kpi-transactions',
        title: 'Transactions',
        value: baseTransactions,
        change: 15.4,
        trend: 'up',
        format: 'number',
      },
      {
        id: 'kpi-conversion',
        title: 'Conversion Rate',
        value: baseConversion,
        change: -1.2,
        trend: 'down',
        format: 'percentage',
      },
    ];
  }, [currency, dateRange, rate]);

  // Recalculate Monthly Revenue chart data using useMemo
  const monthlyRevenueData = useMemo(() => {
    return MOCK_MONTHLY_REVENUE.map((item) => ({
      month: item.month,
      revenue: Math.round(item.revenue * rate),
      expenses: Math.round(item.expenses * rate),
      profit: Math.round(item.profit * rate),
    }));
  }, [rate]);

  // Recalculate Regional Sales chart data using useMemo
  const regionalSalesData = useMemo(() => {
    return MOCK_REGIONAL_SALES.map((item) => ({
      region: item.region,
      sales: Math.round(item.sales * rate),
      transactionsCount: item.transactionsCount,
    }));
  }, [rate]);

  // User segments data
  const userSegmentsData = useMemo(() => {
    return MOCK_USER_SEGMENTS;
  }, []);

  return {
    kpiMetrics,
    monthlyRevenueData,
    regionalSalesData,
    userSegmentsData,
    currency,
    dateRange,
  };
}
