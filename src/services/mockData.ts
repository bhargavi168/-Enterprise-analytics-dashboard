import { faker } from '@faker-js/faker';
import { Transaction, Region, TransactionStatus } from '@/types/transaction';
import { MonthlyRevenueData, RegionalSalesData, UserSegmentData } from '@/types/dashboard';

// Set seed for consistent, deterministic generation
faker.seed(12345);

const REGIONS: Region[] = ['Europe', 'APAC', 'LATAM', 'MEA'];
const STATUS_WEIGHTS = [0.75, 0.18, 0.07]; // 75% Completed, 18% Pending, 7% Failed

function getRandomStatus(): TransactionStatus {
  const rand = faker.number.float({ min: 0, max: 1 });
  if (rand < STATUS_WEIGHTS[0]) return 'Completed';
  if (rand < STATUS_WEIGHTS[0] + STATUS_WEIGHTS[1]) return 'Pending';
  return 'Failed';
}

/**
 * Pre-generate 10,000 realistic fintech transaction records
 */
export function generateMockTransactions(count: number = 10000): Transaction[] {
  const transactions: Transaction[] = new Array(count);
  const startDate = new Date('2026-01-01T00:00:00Z');
  const endDate = new Date('2026-09-20T23:59:59Z');

  for (let i = 0; i < count; i++) {
    const region = REGIONS[i % REGIONS.length];
    const status = getRandomStatus();
    const amount = Number(faker.finance.amount({ min: 12, max: 8500, dec: 2 }));
    const randomDate = faker.date.between({ from: startDate, to: endDate });

    transactions[i] = {
      id: `TXN-${100000 + i}`,
      userEmail: faker.internet.email().toLowerCase(),
      userName: faker.person.fullName(),
      region,
      amount,
      status,
      date: randomDate.toISOString(),
      merchant: faker.company.name(),
    };
  }

  // Sort descending by date initially
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Monthly revenue trends (Jan - Oct 2026)
 */
export const MOCK_MONTHLY_REVENUE: MonthlyRevenueData[] = [
  { month: 'Jan', revenue: 78000, expenses: 42000, profit: 36000 },
  { month: 'Feb', revenue: 84500, expenses: 45000, profit: 39500 },
  { month: 'Mar', revenue: 92000, expenses: 48000, profit: 44000 },
  { month: 'Apr', revenue: 89000, expenses: 46000, profit: 43000 },
  { month: 'May', revenue: 104000, expenses: 52000, profit: 52000 },
  { month: 'Jun', revenue: 112000, expenses: 55000, profit: 57000 },
  { month: 'Jul', revenue: 108000, expenses: 54000, profit: 54000 },
  { month: 'Aug', revenue: 119000, expenses: 58000, profit: 61000 },
  { month: 'Sep', revenue: 124500, expenses: 60000, profit: 64500 },
  { month: 'Oct (Est)', revenue: 132000, expenses: 63000, profit: 69000 },
];

/**
 * Regional Sales breakdown
 */
export const MOCK_REGIONAL_SALES: RegionalSalesData[] = [
  { region: 'Europe', sales: 485000, transactionsCount: 3420 },
  { region: 'APAC', sales: 392000, transactionsCount: 2850 },
  { region: 'LATAM', sales: 215000, transactionsCount: 1460 },
  { region: 'MEA', sales: 132000, transactionsCount: 970 },
];

/**
 * User Segment percentages: New 42%, Returning 35%, Power 18%, Dormant 5%
 */
export const MOCK_USER_SEGMENTS: UserSegmentData[] = [
  { name: 'New Users', value: 4200, color: '#6366F1', percentage: 42 },
  { name: 'Returning', value: 3500, color: '#10B981', percentage: 35 },
  { name: 'Power Users', value: 1800, color: '#F59E0B', percentage: 18 },
  { name: 'Dormant', value: 500, color: '#EF4444', percentage: 5 },
];
