import { useAuth } from '@/hooks/useAuth';
import { useDashboardData } from '@/hooks/useDashboardData';
import { KpiCards } from './KpiCards';
import { RevenueAreaChart } from './RevenueAreaChart';
import { RegionalBarChart } from './RegionalBarChart';
import { UserSegmentsPieChart } from './UserSegmentsPieChart';
import { GlobalFiltersBar } from './GlobalFiltersBar';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DashboardPage() {
  const { user } = useAuth();
  const { kpiMetrics, monthlyRevenueData, regionalSalesData, userSegmentsData, currency } =
    useDashboardData();

  return (
    <div className="space-y-6">
      {/* Header Welcome banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900/40 border border-indigo-500/20 backdrop-blur-md">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-black tracking-tight text-foreground">
              Welcome back, {user?.name.split(' ')[0]} 👋
            </h2>
            <Badge variant={user?.role === 'admin' ? 'admin' : 'viewer'}>
              {user?.role?.toUpperCase()} MODE
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground max-w-xl">
            Here is your live enterprise executive overview. All figures dynamically react to active currency rates ({currency}) and date range selectors.
          </p>
        </div>

        <Link
          to="/transactions"
          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 shrink-0 self-start md:self-auto"
        >
          <Sparkles className="h-4 w-4 mr-2" /> View 10,000 Live Rows
          <ArrowRight className="h-4 w-4 ml-1.5" />
        </Link>
      </div>

      {/* Global Filter Bar */}
      <GlobalFiltersBar />

      {/* 4 KPI Cards */}
      <KpiCards metrics={kpiMetrics} currency={currency} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueAreaChart data={monthlyRevenueData} currency={currency} />
        <RegionalBarChart data={regionalSalesData} currency={currency} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <UserSegmentsPieChart data={userSegmentsData} />

        {/* Quick Insights Card */}
        <div className="col-span-1 lg:col-span-2 rounded-xl border bg-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-foreground">FinTech Operations Summary</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-4">
              Real-time telemetry and state distribution metrics
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-muted/40 border">
                <span className="text-[11px] font-semibold text-muted-foreground block">System Uptime</span>
                <span className="text-lg font-bold text-emerald-500">99.98%</span>
                <span className="text-[10px] text-muted-foreground block mt-0.5">SLA Compliant</span>
              </div>
              <div className="p-4 rounded-xl bg-muted/40 border">
                <span className="text-[11px] font-semibold text-muted-foreground block">API Latency</span>
                <span className="text-lg font-bold text-indigo-500">24ms</span>
                <span className="text-[10px] text-muted-foreground block mt-0.5">Optimal 60 FPS</span>
              </div>
              <div className="p-4 rounded-xl bg-muted/40 border">
                <span className="text-[11px] font-semibold text-muted-foreground block">Virtual Table Rows</span>
                <span className="text-lg font-bold text-purple-500">10,000</span>
                <span className="text-[10px] text-muted-foreground block mt-0.5">TanStack Virtual</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
            <span>Last sync: Just now</span>
            <span className="font-mono text-[10px]">Data engine: @faker-js/faker + Redux Toolkit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
