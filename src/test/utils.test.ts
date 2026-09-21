import { formatCurrency, formatCompactNumber, formatDate } from '../lib/utils';

describe('Utility Functions', () => {
  test('formatCurrency converts USD correctly', () => {
    expect(formatCurrency(100, 'USD')).toBe('$100');
    expect(formatCurrency(124.5, 'USD')).toBe('$124.50');
  });

  test('formatCurrency converts EUR correctly with exchange rate 0.92', () => {
    expect(formatCurrency(100, 'EUR')).toBe('€92');
  });

  test('formatCurrency converts INR correctly with exchange rate 83.5', () => {
    expect(formatCurrency(100, 'INR')).toBe('₹8,350');
  });

  test('formatCompactNumber formats 12400 to 12.4K', () => {
    expect(formatCompactNumber(12400)).toBe('12.4K');
  });

  test('formatDate converts ISO string to human readable format', () => {
    const formatted = formatDate('2026-05-15T10:00:00Z');
    expect(formatted).toContain('2026');
    expect(formatted).toContain('May');
  });
});
