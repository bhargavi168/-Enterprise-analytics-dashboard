import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { UserSegmentData } from '@/types/dashboard';

interface UserSegmentsPieChartProps {
  data: UserSegmentData[];
}

export function UserSegmentsPieChart({ data }: UserSegmentsPieChartProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-base font-bold">User Segment Composition</CardTitle>
        <CardDescription className="text-xs">Active portfolio breakdown by user tier</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`pie-cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(15, 23, 42, 0.9)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(val: unknown, name: unknown) => [
                  `${val} users (${data.find((d) => d.name === name)?.percentage}%)`,
                  String(name || ''),
                ]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value: string) => (
                  <span className="text-xs text-foreground font-medium">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
