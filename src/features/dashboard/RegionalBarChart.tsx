import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Currency } from '@/types/dashboard';
import { formatCurrency } from '@/lib/utils';

interface RegionalBarChartProps {
  data: Array<{ region: string; sales: number; transactionsCount: number }>;
  currency: Currency;
}

const REGION_COLORS = ['#8B5CF6', '#3B82F6', '#EC4899', '#F59E0B'];

export function RegionalBarChart({ data, currency }: RegionalBarChartProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-base font-bold">Regional Sales Breakdown</CardTitle>
        <CardDescription className="text-xs">Europe, APAC, LATAM, and MEA revenue distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="region" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#94A3B8"
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => formatCurrency(val, currency).split('.')[0]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(val: unknown) => [
                  formatCurrency(Number(val || 0), currency),
                  'Sales',
                ]}
              />
              <Bar dataKey="sales" radius={[6, 6, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={REGION_COLORS[index % REGION_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
