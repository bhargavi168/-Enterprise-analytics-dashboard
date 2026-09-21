import { ArrowUpRight, ArrowDownRight, DollarSign, Users, Repeat, Activity } from 'lucide-react';
import { KpiMetric, Currency } from '@/types/dashboard';
import { Card, CardContent } from '@/components/ui/Card';
import { formatCurrency, formatCompactNumber } from '@/lib/utils';

interface KpiCardsProps {
  metrics: KpiMetric[];
  currency: Currency;
}

export function KpiCards({ metrics, currency }: KpiCardsProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'kpi-revenue':
        return <DollarSign className="h-5 w-5 text-indigo-500" />;
      case 'kpi-users':
        return <Users className="h-5 w-5 text-emerald-500" />;
      case 'kpi-transactions':
        return <Repeat className="h-5 w-5 text-purple-500" />;
      case 'kpi-conversion':
        return <Activity className="h-5 w-5 text-amber-500" />;
      default:
        return <Activity className="h-5 w-5 text-indigo-500" />;
    }
  };

  const formatMetricValue = (metric: KpiMetric) => {
    if (metric.format === 'currency') {
      return formatCurrency(metric.value, currency);
    }
    if (metric.format === 'percentage') {
      return `${metric.value.toFixed(1)}%`;
    }
    return formatCompactNumber(metric.value);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => {
        const isPositive = metric.change >= 0;
        return (
          <Card key={metric.id} className="relative overflow-hidden group hover:border-primary/50">
            <CardContent className="p-5 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {metric.title}
                </span>
                <div className="p-2 rounded-xl bg-muted/50 group-hover:scale-110 transition-transform">
                  {getIcon(metric.id)}
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-2xl font-black tracking-tight text-foreground">
                  {formatMetricValue(metric)}
                </span>
                <div
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                    isPositive
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight className="h-3.5 w-3.5 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="h-3.5 w-3.5 mr-0.5" />
                  )}
                  {isPositive ? `+${metric.change}%` : `${metric.change}%`}
                </div>
              </div>

              <p className="text-[11px] text-muted-foreground mt-2">
                +12.5% vs last month baseline
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
