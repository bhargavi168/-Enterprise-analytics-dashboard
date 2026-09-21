import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { KpiCards } from '../features/dashboard/KpiCards';
import { KpiMetric } from '../types/dashboard';

const mockMetrics: KpiMetric[] = [
  {
    id: 'kpi-revenue',
    title: 'Total Revenue',
    value: 124500,
    change: 12.5,
    trend: 'up',
    format: 'currency',
  },
  {
    id: 'kpi-users',
    title: 'Active Users',
    value: 12450,
    change: 8.2,
    trend: 'up',
    format: 'number',
  },
];

describe('KpiCards Component', () => {
  test('renders metric titles and formatted values', () => {
    render(<KpiCards metrics={mockMetrics} currency="USD" />);

    expect(screen.getByText('Total Revenue')).toBeInTheDocument();
    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('$124,500')).toBeInTheDocument();
    expect(screen.getByText('12.5K')).toBeInTheDocument();
    expect(screen.getByText('+12.5%')).toBeInTheDocument();
  });
});
