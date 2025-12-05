import { StatsCard } from './StatsCard';
import { TaskProgressChart } from './TaskProgressChart';
import { CalendarWidget } from './CalendarWidget';
import { TeamTable } from './TeamTable';
import { ActivityFeed } from './ActivityFeed';
import { CheckCircle2, Clock, ListTodo } from 'lucide-react';

export function Dashboard() {
  const stats = [
    {
      title: 'Total Tasks',
      value: '120',
      icon: ListTodo,
      progress: 67,
      change: '+12 from last week',
      color: 'blue' as const,
    },
    {
      title: 'Completed Tasks',
      value: '80',
      icon: CheckCircle2,
      progress: 80,
      change: '+8 from last week',
      color: 'green' as const,
    },
    {
      title: 'Pending Tasks',
      value: '40',
      icon: Clock,
      progress: 33,
      change: '4 overdue',
      color: 'orange' as const,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2">
          <TaskProgressChart />
        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-6">
          <CalendarWidget />
          <ActivityFeed />
        </div>
      </div>

      {/* Team Performance Section */}
      <TeamTable />
    </div>
  );
}
